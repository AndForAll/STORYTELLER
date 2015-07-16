/*****************************************************************
ALL THE CODE BELOW FOR THE INTERFACE
CODE FOR THE ACTUAL STORY PLAYER IS LOCATED AT THE BOTTOM OF THIS DOCUMENT
*/

//GLOBAL VARIABLES
var defaultLine = {
    line_content: ' ',
    trigger: ' ',
    story_var: 'BLANK',
    profile: {
        name: ' ',
        x: 0,
        y: 0,
        z: 0,
        w: 100,
        h: 100,
        restrict: false,
        type: 'image'
    }
};

var deafultStory = {
    title: 'untitled',
    story : [defaultLine, defaultLine, defaultLine, defaultLine ],
    placeholders: ['i.e Once apon a time there was a mean', 'i.e. They lived ', 'i.e. Everyday they go to the']
};

//APPLICATION INFO & START
var app = {};
app.init = function() {
    console.log('Your code starts here!');
    // deploy hash listener
    hashRouter();
    // Refresh hash
    location.hash = " ";
    location.hash = '#home';
    // location.reload();
};

// HASH hashRouter
var hashRouter = function(){
    $(window).off('hashchange').on('hashchange', function() {
        console.log('hash is currently: ' + location.hash);
        if(location.hash == '#home'){
            renderHome();
        }else if(location.hash == '#create'){
            renderCreate();
        }else if(location.hash == '#browse'){
            renderBrowse();
        }else if(location.hash == '#update'){
            renderUpdate();
        }else if(location.hash == '#playStry'){
            renderPlay();
        }
        attachEvents();
    });
};


/*
EVENTS / BUTTONS ETC
*/
var attachEvents = function() {
    //FOOTER
    $('.btnCreate').off('click').on('click', function() {
        console.log('CREATE PAGE BUTTON!');

        //CODE FOR LOCAL STORAGE METHOD
        localStorage['title'] = deafultStory.title;
        // localStorage['story'] = deafultStory.story;
        localStorage["story"] = JSON.stringify(deafultStory.story);
        localStorage['story_length'] = deafultStory.story.length;

        console.log('create button story pulled from local');
        // console.log(localStorage['story']);
        console.log(JSON.parse(localStorage["story"]));
        location.hash = '#create'
    });

    $('.btnBrowse').off('click').on('click', function() {
        console.log('BROWSE PAGE BUTTON!');
        location.hash = '#browse';
        //get all stories from database
    });

    //CREATE PAGE
    $('.btnNewLine').off('click').on('click', function() {
        console.log('NEW LINE BUTTON!');

        ///get the amount of lines in the story
        var length = localStorage['story_length'];

        // grab story from local storage so we have profiles etc
        var story = JSON.parse(localStorage["story"]);
        console.log('story from local storage');
        console.log(story);

        //pull the input for title and add to the array
        story.title = $('#iptTitle').val();
        localStorage['title'] = story.title;

        //pull lines from input fields and add to story object
        for(var i = 0; i < length; i++){
            story[i].line_content = $('.'+ i ).val();
            story[i].story_var = $('.var'+i).val();
        }


        var _story = story.push(defaultLine);
        localStorage['story'] = JSON.stringify(story);
        localStorage['story_length'] = story.length;
        // console.log('change has been made to story');
        // console.log(localStorage['story']);
        // location.reload();
        console.log('story array');
        console.log(story);
        renderCreate();
        // location.reload();
    });

    $('.btnEventProfile').off('click').on('click', function() {
        console.log('click');
        //save which "line" number we are adding the event to in local storage
        // localStorage['access_line'] = $('.btnEventProfile').val();
        // console.log($('.btnEventProfile').val());
        // console.log("the line you are about to edit is: " + localStorage['access_line']);
        console.log(this.name);

        localStorage['access_line'] = this.name;

        var modal= document.getElementById('modal');
        var shade= document.getElementById('shade');
        modal.style.display=shade.style.display= 'block';

    });

    $('.btnSaveProfileCreator').off('click').on('click', function() {
        //grab story object that is saved in local
        var story = JSON.parse(localStorage["story"]);
        var line = localStorage['access_line'];

        var _profile = {
                name: $('#name').val(),
                x: $('#pos-x').val(),
                y: $('#pos-y').val(),
                z: $('#pos-z').val(),
                w: $('#width').val(),
                h: $('#height').val(),
                restrict: $('#restrict').val(),
                type: 'image'
        };

        //grab the line we are accessing from local storage
        story[line].profile = _profile;
        console.log('profile temp');
        console.log(_profile);
        console.log('profile in story');
        console.log(story[line]);

        localStorage["story"] = JSON.stringify(story);

        var modal= document.getElementById('modal');
        var shade= document.getElementById('shade');
        modal.style.display=shade.style.display= 'none';
        console.log("SAVED BUTTON PRESSED");
        console.log(JSON.parse(localStorage["story"]));
    });

    $('.btnCloseProfileCreator').off('click').on('click', function() {
        var modal= document.getElementById('modal');
        var shade= document.getElementById('shade');
        modal.style.display=shade.style.display= 'none';
    });

    $('#btnCreateSubmit').off('click').on('click', function() {
        console.log('CREATE MY TEMPLATE BUTTON!');

        //get the amount of lines in the story
        var length = localStorage['story_length'];
        localStorage['title'] = $('#iptTitle').val();

        // grab story from local storage so we have profiles etc
        var story = JSON.parse(localStorage["story"]);
        console.log('story from local storage');
        console.log(story);

        //pull lines from input fields and add to story object
        for(var i = 0; i < length; i++){
            story[i].line_content = $('.'+ i ).val();
            story[i].story_var = $('.var'+i).val();
        }
        console.log('THE WHOLE THING:');
        console.log(story);

        //figure out trigger words and add them to story
        // as well as send an array of just trigger words
        var triggers = [];
        for(var line in story){
          var trigger = story[line].line_content.split(" ").pop();
          story[line].trigger = trigger;
          triggers.push(trigger);
        }

        //snd story object to server side
        $.post('/story', {
            data : JSON.stringify(story),
            triggers : triggers,
            title : $('#iptTitle').val()
        }, function(result){
            console.log(result);
            location.hash = '#browse';
        });

    });

    //BROWSE
    $('.btnStartStory').off('click').on('click', function() {
        //get the id for the template
        var storyId = this.name;
        //save ID to storage
        localStorage['selectedStry'] = storyId;
        //start counter in localStorage so we know to START
        localStorage['stryCounter'] = 0;
        //change has to playStry
        location.hash = "#playStry";
    });

    $('.btnDelete').off('click').on('click', function() {
        console.log('DELETE :( BUTTON!');
        //get the id for the template then go to parse and delete it

    });
    $('.btnUpdate').off('click').on('click', function() {
        console.log('UPDATE BUTTON!');
        //open up update page

    });
};

/*
PAGE RENDERERS
*/

var renderHome = function() {
    var tplToCompile = $('#tpl_home').html();
    var compiled = _.template(tplToCompile,{
        data: 'test'
    });
    $('#view').html(compiled);
    console.log('HOME PAGE RENDERED');
    attachEvents();
};

//POSSIBILITY TO JUST DO IT ALL IN LOCAL STORAGE.....
//attempt at create page with using local storage up to the point of submission
var renderCreate = function() {
    var tplToCompile = $('#tpl_create').html();
        var compiled = _.template(tplToCompile, {

            title: localStorage['title'],
            story: JSON.parse(localStorage["story"]),
            length: localStorage['story_length']

        });
     $('#view').html(compiled);
     console.log("CREATE PAGE RENDERED");
     console.log(JSON.parse(localStorage["story"]));
     attachEvents();
};


var renderBrowse = function() {
    //get all story templates from database
    $.get('/stories', {
      request: 'grab all stories for browse page'
    }, function(results) {
      console.log(results.status);
      console.log(results.data);
      // console.log('finding out if parsing story content works');
      // console.log(results.data.results);
      // console.log(results.data.results[0].story_content);
      // console.log(JSON.parse(results.data.results[0].story_content.story));
      var stories = results.data.results;
      console.log(stories);

      //now compile the html with the results
      var tplToCompile = $('#tpl_browse').html();
      var compiled = _.template(tplToCompile, {
          data: stories
      });
      $('#view').html(compiled);
      console.log('BROWSE PAGE RENDERED');
      attachEvents();
    });
};

var renderUpdate = function() {
    //call some router that grabs one story

    var tplToCompile = $('#tpl_create').html();
    var compiled = _.template(tplToCompile, {
        data: 'test'
    });
    $('#view').html(compiled);
};
/*
****************************************************************
where we at:
this method mostly works... we are able to show the info in console
Annyang is also responding to commands
ISSUE!!!!! ANNYANG WILL NOT TAKE VARIBLES ONLY EXACT STRINGS??
*/
//ATTEMPT TWO AT STORY
var Story_Teller = function(story_content) {
    // console.log(story_content);
    this.title = story_content.title;
    this.id = story_content.objectId;
    this.story = story_content.story_content;
};

Story_Teller.prototype.displayInfo = function() {
  console.log('This story is titled' + this.title);
  console.log('This is the outline of the story');
  for(line in this.story){
    console.log(this.story[line].line_content);
  }
};

Story_Teller.prototype.renderText = function() {
  var currentLine = localStorage['stryCounter'];

  var tplToCompile = $('#tpl_story_read').html();
  var compiled = _.template(tplToCompile, {
    title: this.title,
    data: this.story[currentLine]
  });
  $('#view').html(compiled);

  this.attachAnnyang();

};

Story_Teller.prototype.renderVisual = function(term) {
    console.log(term);
    localStorage['stryCounter']++;
}

Story_Teller.prototype.attachAnnyang = function() {
  console.log('Annyang');
  var string = 'time';
  if(annyang) {
    var commands = {
      'this is a test *term' : this.renderVisual,
      'display' : this.displayInfo,
       string : this.renderVIsual
    };
  };

  annyang.addCommands(commands);
  annyang.debug();
  annyang.start();

};

var renderPlay = function() {
  console.log('RENDER PLAY ');
  //get selected stroy that is gonna play from localStorage
  var stry_id = localStorage['selectedStry'];
  var stry;

  $.get('/getstory', {
    id: stry_id
  }, function(result) {
      // console.log(result);
      console.log('from getstory method');
      console.log(result['data']);
      //assign story info to variable
      stry = result['data'];
      console.log('saved as var');
      console.log(stry);
      var currentStory = new Story_Teller(stry);
      renderGetShitGoing(currentStory);
  });
};

var renderGetShitGoing = function(currentStory) {
  console.log('GET SHIT GOING');
    currentStory.displayInfo();
    currentStory.renderText();
};

app.init();
