/* Your code starts here */
    var story = [
    'Our story begins just like any other; with a hero. Our hero is a ',
    'Every afternoon is time to be spent at the',
    'On a particularly ',
    'Our hero could be seen lazy by the'
    ];

    //profiles for windows
    var background = {
        name: 'background',
        w:900,
        h:700,
        l:10,
        t:10,
        position: 0
    };

        //profiles for windows
    var hero = {
        name: 'hero',
        w:50,
        h:50,
        l:100,
        t:400,
        position: 4
    };

    var object = {
        name: 'object',
        w:200,
        h:200,
        l:500,
        t:400,
        position: 1
    };


    var friend = {
        name: 'friend',
        w:25,
        h:25,
        l:100,
        t:400,
        position: 3
    };

    var villian = {
        name: 'villian',
        w:35,
        h:35,
        l:100,
        t:400,
        position: 2
    };


var app = {};
app.init = function() {
    console.log('Your code starts here!');
    // deploy hash listener
    hashRouter();
    // Refresh hash
    location.hash = "";
    location.hash = '#home';

};

// HASH hashRouter
var hashRouter = function(){
    $(window).off('hashchange').on('hashchange', function() {
        console.log('hash is currently: ' + location.hash);
        
        if(location.hash == '#home'){
            renderHome();
        }else if(location.hash == '#story') {
            renderStory();
        }

        attachEvents();
    });
};

/*
EVENTS / BUTTONS ETC
*/
var attachEvents = function() {
    $('.btnStart').off('click').on('click', function() {
        localStorage['story_counter'] = 0;
        location.hash = '#story';

    });

    $('.btnHome').off().on('click', function() {
        location.hash = '#home';
    });
};

    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

var speech = function() {
    console.log('HEY LOOK AT ME IM IN SPEECH');
    // var recognition = new webkitSpeechRecognition();
    // recognition.continuous = true;
    // recognition.interimResults = true;

    // recognition.start();

    recognition.onresult = function (event) {
        var interim = '';

        for(var i = event.resultIndex; i < event.results.length; i++){
            if(event.results[i].isFinal) {
                insertSpeech(event.results[i][0].transcript, true);
            }else{
                insertSpeech(event.results[i][0].transcript, false);
                interim += event.results[i][0].transcript + '\u200B';
            }
        }
    };

    var insertSpeech = function(text, final) {
        console.log('WOW IMMA INSERT THE SPEECH');
        // console.log(text);
        var storyPart = localStorage['story_counter'];

        //comapre the text input to our string for that part of the story
        //so we can extract the part that we want... ie what comes after our sentence
        // **** at some point you should actually match them up to make sure they are saying the right thing
        // ***** then maybe an alert comes up and asks you if u wanna change accent / lang or something
        
        //turn the current line of the story into an array
        var storytxt = story[storyPart].split(' ');

        //split the users speech input into an array
        var _text = text.split(' ');

        //slice the beginning of the user input i.e. our part of the story out of their input
        _text = _text.slice((storytxt.length-1));

        // now we need to turn it bak into a string with space and shit
        var speechIpt = _text.join(' ');
        $('#speechInput').val(speechIpt);
        if(final != true){

            console.log('STILL INTERIM');
            console.log(speechIpt);
            //input the text into the html
            // $('#speechInput').val(speechIpt);

        }else{
            //input the text into the html
            // $('#speechInput').val(speechIpt);
            recognition.stop();

            recognition.onend = function() {
                console.log('GOING TO NEXT PAGE');
                console.log(speechIpt);

                //call func that pulls from google etc
                renderVisuals(speechIpt);

                //change localStorage counter ++ so we know we on next line
                localStorage['story_counter']++;

                // recognition.stop();
                //re-render stry page
                window.setTimeout(renderStory(), 3000);
                // renderStory();
            };



        }
    };

};

var renderVisuals = function(speechInput) {
    var profileInfo = {};
    console.log('Recieved Speech input ' + speechInput + ' sending to server now');
    
    $.post('/visual',{
        data: speechInput
    }, function(results){
        console.log('recived from server');
        console.log(results);
        //then we would call the render pop up function to display the image
        //as I don't have profiles atm just using default to test
        
        if(localStorage['story_counter'] == 1) {
            pofileInfo = hero;
                    console.log('Here is the current profile');
        console.log(profileInfo);
        renderPopup(results, profileInfo);
        }else if (localStorage['story_counter'] == 3){
            profileInfo = background;
                    console.log('Here is the current profile');
        console.log(profileInfo);
        renderPopup(results, profileInfo);
        }else if (localStorage['story_counter'] == 4){
            profileInfo = background;
                    console.log('Here is the current profile');
        console.log(profileInfo);
        renderPopup(results, profileInfo);
        }else if(localStorage['story_counter'] == 5) {
            profileInfo = object; 
                    console.log('Here is the current profile');
        console.log(profileInfo);
        renderPopup(results, profileInfo);
        }else {
                        profileInfo = object; 
                    console.log('Here is the current profile');
        console.log(profileInfo);
        renderPopup(results, profileInfo);
        }
        // console.log('Here is the current profile');
        // console.log(profileInfo);
        // renderPopup(results, profileInfo);
    });
};

var windows = [];
var windowsObj = {};

//renderPopup 
// image to insert // location // size // placement
var renderPopup = function(visual, profileInfo) {
    // var profile = this.profile;
    console.log('IM GONNA RENDER A POP-UP!');
    console.log(visual);
    console.log(visual.images[0]['url']);
    console.log(profileInfo);
//create pop up window with profiles specifics... 
//compile template html in pop up window with image as background
    var tplToCompile = $('#tpl_pop').html();
    var compiled = _.template(tplToCompile, {
        img: visual.images[0]['url']
    });

    var windowProfile = 'width='+ profileInfo.w +',height='+ profileInfo.h+',left ='+ profileInfo.l +',top ='+profileInfo.t;
    // var windowProfile = 'width=100,height=100,left =100,top =100';
    // windows[localStorage['story_counter']] = window.open('', localStorage['story_counter'] , 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0' + windowProfile);
    // $(windows[localStorage['story_counter']].document.body).html(compiled);
 
   
    
    // $('head', opener.document).append('<link rel="stylesheet" href="css/style.css">');
    // windowsObj[profile.name].$('head').append('<link rel="stylesheet" href="css/style.css">');
    console.log(windowsObj);
    
    // if(windowsObj[profile.name].length !=0 ){
        windowsObj[profileInfo.name] = window.open('', windowsObj[profileInfo.name] , 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,' + windowProfile);
        console.log(windowsObj);
        $(windowsObj[profileInfo.name].document.body).html(compiled);
    // }else {
    //  $(windowsObj[profileInfo.name].document.body).html(compiled);
    // }
};


/*
PAGE RENDERERS
*/
var renderHome = function() {
    var tplToCompile = $('#tpl_home').html();
    var compiled = _.template(tplToCompile, {
        data: 'test'
    });
    $('#view').html(compiled);
    attachEvents();
};

var renderStory = function() {

    //get the counter to indicate which line of the story we are up to
    var storyPart = localStorage['story_counter'];
    var tplToCompile = $('#tpl_story').html();
    var compiled = _.template(tplToCompile, {
        line: story[storyPart]
    });
    $('#view').html(compiled);
    // if(storyPart == 0){
        recognition.start();
    // };
    speech();
};



app.init();