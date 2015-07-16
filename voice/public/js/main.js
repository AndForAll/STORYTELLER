/* Your code starts here */

var app = {};
app.init = function() {
    console.log('Your code starts here!');
    // deploy hash listener
    hashRouter();
    // Refresh hash
    location.hash = " ";
    location.hash = '#slide' + slideNum;
    // check if user exists in localStorage
    // if (localStorage['user']) {
    //     location.hash = '#answer';
    // } else {
    //     // render first page
    //     location.hash = '#question';
    // }

};
var slideNum = 1;
if (annyang) {

    // define the functions our commands will run.
    var hello = function() {
      $("#hello").slideDown("slow");
      scrollTo("#section_hello");
    };

    // var showFlickr = function(tag) {
    //   $('#flickrGallery').show();
    //   $('#flickrLoader p').text('Searching for '+tag).fadeIn('fast');
    //   var url = '//api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a828a6571bb4f0ff8890f7a386d61975&sort=interestingness-desc&per_page=9&format=json&callback=jsonFlickrApi&tags='+tag;
    //   $.ajax({
    //     type: 'GET',
    //     url: url,
    //     async: false,
    //     jsonpCallback: 'jsonFlickrApi',
    //     contentType: "application/json",
    //     dataType: 'jsonp'
    //   });
    //   scrollTo("#section_image_search");
    // };

    // var jsonFlickrApi = function(results) {
    //   $('#flickrLoader p').fadeOut('slow');
    //   var photos = results.photos.photo;
    //   $.each(photos, function(index, photo) {
    //     $(document.createElement("img"))
    //       .attr({ src: '//farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_s.jpg' })
    //       .addClass("flickrGallery")
    //       .appendTo(flickrGallery);
    //   });
    // };

  

    var changeColor = function(tag){
$('#slide1').css("color", tag);
console.log("the color you said was " + tag);


    };

        var bigFont = function(){
$('#slide1').css("font-size", 100);
console.log("screaming");


    };

            var littleFont = function(){
$('#slide1').css("font-size", 10);
console.log("screaming");


    };

       var changeBack = function(tag){
$('body').css("background", tag);
console.log("the color you said was " + tag);


    };


var windowObjectReference;
var strWindowFeatures = "menubar=yes";

    var getStarted = function() {
      // window.location.href = 'https://github.com/TalAter/annyang';
      
    console.log("IN THE FUNCTION");
      windowObjectReference = window.open("https://www.google.com/", "google search", strWindowFeatures);
    }
     
     var searchCats = function() {
      // window.location.href = 'https://github.com/TalAter/annyang';
      
console.log("IN THE FUNCTION");
      windowObjectReference = window.open("https://www.google.com/search?q=cats&biw=1055&bih=830&source=lnms&tbm=isch&sa=X&ei=ESD1VK-tII7msASj7IDgCQ&ved=0CAYQ_AUoAQ&dpr=1", "google search", strWindowFeatures);
    }

      var googleSearch = function(tag) {
      // window.location.href = 'https://github.com/TalAter/annyang';
      console.log("you searched for" + tag);
      windowObjectReference = window.open("https://www.google.com/search?q=" + tag + "&biw=1055&bih=830&source=lnms&tbm=isch&sa=X&ei=ESD1VK-tII7msASj7IDgCQ&ved=0CAYQ_AUoAQ&dpr=1", "google search", strWindowFeatures);
    }

    var nextSlide = function(){
     slideNum = slideNum +1;
     location.hash = '#slide' + slideNum;
    }

    var sendWord = function(tag){
        console.log('sending word');
        $.post('/answer', {
        word: tag
        }, function(results){
            console.log(results);
            console.log('URL SHIT' + results.images[0].url);
            var imageURL = results.images[0].url;
            windowObjectReference = window.open(imageURL, "google search", strWindowFeatures);
        });
    }

       var setting = function(tag){
        console.log('sending word');
        $.post('/answer', {
        word: tag
        }, function(results){
            console.log(results);
            console.log('URL SHIT' + results.images[0].url);
            var imageURL = results.images[0].url;
            $('body').css("background-image", "url(" +imageURL+")");
            
        });
    }

     var charOne = function(tag){
        console.log('sending word');
        $.post('/answer', {
        word: tag
        }, function(results){
            console.log(results);
            console.log('URL SHIT' + results.images[0].url);
            var imageURL = results.images[0].url;

            windowObjectReference = window.open(imageURL, "character one", 'width=300,height=300,left=300,top=400,scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no');
        });
    }

     var charTwo = function(tag){
        console.log('sending word');
        $.post('/answer', {
        word: tag
        }, function(results){
            console.log(results);
            console.log('URL SHIT' + results.images[0].url);
            var imageURL = results.images[0].url;
            windowObjectReference = window.open(imageURL, "character two", 'width=400,height=400,left=700,top=400,scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no');
        });
    }

    // define our commands.
    // * The key is what you want your users to say say.
    // * The value is the action to do.
    //   You can pass a function, a function name (as a string), or write your function as part of the commands object.
    // var commands = {
    //   'hello (there)':        hello,
    //   'show me *search':      showFlickr,
    //   'show :type report':    showTPS,
    //   'let\'s get started':   getStarted,
    // };

      var commands = {
      'let\'s get started':   getStarted,
      'cats': searchCats,
      'write in *search' : changeColor,
      'paint it *search': changeBack,
      // 'search *search' : googleSearch,
      'scream' : bigFont,
      'whisper' : littleFont,
      'search *search' : sendWord,
      'setting *search': setting,
      'character one *search': charOne,
      'character two *search': charTwo
    };


    // OPTIONAL: activate debug mode for detailed logging in the console
    annyang.debug();

    // Add voice commands to respond to
    annyang.addCommands(commands);

    // OPTIONAL: Set a language for speech recognition (defaults to English)
    annyang.setLanguage('en-US');

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
  } else {
    $(document).ready(function() {
      $('#unsupported').fadeIn('fast');
    });
  }

// A function where we detect the change of '#' on the browser address field
var hashRouter = function() {
    $(window).off('hashchange').on('hashchange', function() {
        console.log('Current hash is ' + location.hash);
        if (location.hash == '#slide1') {
            renderQuestion();
        } else if (location.hash == '#slide2') {
            renderAnswer();
        } 
        attachEvents();
    });
};

// A function where we keep all user's interaction listener (buttons, etc)
var attachEvents = function() {
    console.log('Attaching Events');

    // register page
    $('#btnFruit').off('click').on('click', function() {
        // Ajax call
        console.log('pushed fruit');
        $.post('/answer', {
            f: 1,
            v: 0
        }, function(result) {
            console.log(result);
            // localStorage['user'] = result.email;
            alert('fruit');
            // Assuming the email has been through the registeration process
            // and return to the user
            // the user may now proceed to the next page
            location.hash = '#answer';
        });
    });

    //vegetable button
      $('#btnVeg').off('click').on('click', function() {
        // Ajax call
        $.post('/answer', {
            email: 'v'
        }, function(result) {
            console.log(result);
            // localStorage['user'] = result.email;
            alert('vegetable');
            // Assuming the email has been through the registeration process
            // and return to the user
            // the user may now proceed to the next page
            location.hash = '#answer';
        });
    });





   
};




var renderQuestion = function() {
    // This is how we compile underscore template
    // Usually, it may be applied to other template brands as well
    console.log("ren question function enter");
    var tplToCompile = $('#tpl_slide1').html();
    var compiled = _.template(tplToCompile, {
        question: 'When first the Fox saw the Lion he was terribly frightened'
    });
    $('#view').html(compiled);
    console.log("ren question function complete");
};






var renderAnswer = function() {
    // Fetch projects from database
    $.get('/answer', {
        email: localStorage['user']
    }, function(results) {
        console.log(results); // --> data
        var tplToCompile = $('#tpl_answer').html();
        var compiled = _.template(tplToCompile, {
            title: 'All Projects',
            data: results.data.results,
            user: localStorage['user']
        });
        $('#view').html(compiled);
        console.log('answer rendered');
        attachEvents();
    });
};



app.init();