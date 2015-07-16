//WHERE I LEFT OFF
// BEGINNING TO START LOCAL STORAGE METHOD OF CREATING NEW TEMPLATE
// FINISH OFF
// btnCreate / btnNew Line / renderCreate
//then need to do html equivilents
//finally submit button + app.js and post to parse

var deafultStory = {
    title: 'untitled',
    story : [' ', ' ', ' ' ],
    placeholders: ['i.e Once apon a time there was a mean', 'i.e. They lived ', 'i.e. Everyday they go to the']
};

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
        }// eventually add in the pages for story play
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

        //UNCOMMENT FOR METHOD THAT ADDS DEFAULT TO DB
        //THEN JUST UPDATES IT
        //snd default story object to server
        // $.post('/story', {
        //     title : deafultStory.title,
        //     story : deafultStory.story
        // }, function(result){
        //     // console.log(result);
        //     // console.log(result.storyId);
        //     // add length of story & story id to localStorage
        //     localStorage['story_id'] = result.objectId;
        //     localStorage['numOfLines'] = deafultStory.story.length;
            
        //     console.log('Story Id has been added to local storage');
        //     console.log(result.objectId);
        //     // add story id to local storage... 
        //     // and possibly the whole story object?
        //     location.hash = '#create';
        // });
    });

    $('.btnBrowse').off('click').on('click', function() {
        console.log('BROWSE PAGE BUTTON!');
        location.hash = '#browse';
        //get all stories from database
    });
    //CREATE PAGE
    $('.btnSize').off('click').on('click', function() {

    });

    $('.btnPosition').off('click').on('click', function() {

    });

    $('.btnNewLine').off('click').on('click', function() {
        console.log('NEW LINE BUTTON!');
        // add a new point to the array so another input line comes up
//THIS IS FOR THE DEAFULT STORY ALREADY BEING IN PARSE 
        //get current vals from inputs if applicable 

        // //current number of story lines
        // var current_story_length = localStorage['numOfLines'];
        // var story = [];
        // //add all current input fields vals on the page to the story array
        // for(var i = 0; i < current_story_length; i++ ){
        //     story[i] = $('.' + i ).val();
        // }

        // var _story = story.push('  ');
        // localStorage['numOfLines'] = _story.length;

        // console.log(story);

        // // then post to parse / update that particular story object
        // // DO NEXT *********************************
        // $.post('/storyUpdate', {
        //     id: localStorage['story_id'],
        //     title: $('#iptTitle').val(),
        //     story: _story
        // }, function(err,result){
        //     if(err){
        //         console.log(err);
        //     }else {
        //         console.log(result);
        //     }
        // });


        // reload create page
        //location.reload();

//THIS IS FOR THE LOCAL STORAGE METHOD
        //CAN YOU ADD IT TO LOCAL AS THEY TYPE????

        //grab the current val inputs and but in as lines in story array
        //increase the length val by one
        //increase story array by one
        //save title value too
        localStorage['title'] = $('#iptTitle').val();
        var length = localStorage['story_length'];
        var _story = [];
        for(var i = 0; i < length; i++) {
            _story[i] = $('.'+ i ).val();
        }
        var story = _story.push(' ');
        localStorage['story'] = JSON.stringify(_story);
        localStorage['story_length'] = _story.length;
        // console.log('change has been made to story');
        // console.log(localStorage['story']);
        // location.reload();
        console.log('story array');
        console.log(_story);
        renderCreate();
        // location.reload();

    });

    $('.btnEventProfile').off('click').on('click', function() {
        var modal= document.getElementById('modal');
        var shade= document.getElementById('shade');
        modal.style.display=shade.style.display= 'block';

    });

    $('.btnSaveProfileCreator').off('click').on('click', function() {
        var modal= document.getElementById('modal');
        var shade= document.getElementById('shade');
        modal.style.display=shade.style.display= 'none';
        console.log("SAVED BUTTON PRESSED");
    });

    $('.btnCloseProfileCreator').off('click').on('click', function() {
        var modal= document.getElementById('modal');
        var shade= document.getElementById('shade');
        modal.style.display=shade.style.display= 'none';
    });

    $('#btnCreateSubmit').off('click').on('click', function() {
        console.log('CREATE MY TEMPLATE BUTTON!');
        // send story to parse
        // also make array of trigger words
        var length = localStorage['story_length'];
        var title = $('#iptTitle').val();
        // var story = JSON.parse(localStorage["story"]);
        var _story = [];
        for(var i = 0; i < length; i++){
            _story[i] = $('.'+ i ).val();
        }

    });

    //BROWSER
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

//attempting to make render create something that needs an object passed 
//to it. If it's brand new then the story object is default
//if it is update the story you are editing will be passed through
//********************THIS WAY WORKS!!! vvvvvvvvv
// var renderCreate = function() {
//     var tplToCompile = $('#tpl_create').html();
//     // get localstorage data of story id
//     // console.log('RENDER CREATE FUNC - CURRENT STORY ID SAVED IN LOCAL IS');
//     // console.log(localStorage['story']);
    
//     var current_story = localStorage['story_id'];
//     // get story from app.js / parse using the id as the key
//     $.get('/getstory', {
//         objectId: current_story
//     }, function(results){
//         // console.log('reults from recieved result from server side');
//         // console.log(results.data);
//         // console.log(results.data.title);
//         // console.log(results.data.story_content);

//          // add current length of story array to local storage
//         var current_story_length = results.data.story_content.length;
//         localStorage['numOfLines'] = current_story_length;
//         // localStorage['length'] = current_story_length;
//         console.log("current length of story"+localStorage['numOfLines']);

//         //compile results grabbed from parse into the html
//         var compiled = _.template(tplToCompile, {
//             story_title: results.data.title ,
//             story: results.data.story_content,
//             id: results.data.objectId
//         });

       

//         $('#view').html(compiled);
//         console.log("CREATE PAGE RENDERED");
//         attachEvents();
//     });


// };

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

     var tplToCompile = $('#tpl_browse').html();
     var compiled = _.template(tplToCompile, {
        data: {
            title: 'untitled',
            objectID: 001
        }
     });
     $('#view').html(compiled);
     console.log('BROWSE PAGE RENDERED');
     attachEvents();

};

var renderUpdate = function() {
    //call some router that grabs one story

    var tplToCompile = $('#tpl_create').html();
    var compiled = _.template(tplToCompile, {
        data: 'test'
    });
    $('#view').html(compiled);
};

app.init();