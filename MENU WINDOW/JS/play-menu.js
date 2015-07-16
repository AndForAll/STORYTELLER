
window.onload = function() {

  renderStart();

};

var story = [['Lucy is','GREAT!' ], ['wow hi again','hi'],['oh look its you','balls']];
var stepCounter;
var steps=[];


//EVENTS
var attachedEvents = function(){

  $('#btnStart').off('click').on('click', function() {

    // moveWindow('lb',439,177,false);
    // renderMenuDefault();
    startStory();

  });

  $('#btnMenu').off('click').on('click', function() {

    renderMenuExp();

  });

  $('#btnMenuExpand').off('click').on('click', function() {

    renderMenuExp();

  });
  
  $('#btnClose').off('click').on('click', function() {

    renderMenuDefault();

  });

  $('#btnNextStep').off('click').on('click', function() {

  });



  
  
}

//functions
var startStory = function() {
  stepCounter = 0;
  renderStoryText();
}

var nextStep = function() {
  stepCounter++;
  if(stepCounter => story.length){
    renderMenuDefault();
  }else{
    renderStoryText();
  }
}


//Renders

var renderStart = function() {
    var tplToCompile = $('#tpl_play').html();

    ///eventually will show socket phone stuff here
    var compiled = _.template(tplToCompile, {
        data: 'splash'
    });

    
    $('#view').html(compiled);
    
    attachedEvents();
}



var renderMenuDefault = function() {

   var tplToCompile = $('#tpl_pop').html();

    var compiled = _.template(tplToCompile, {
        data: 'menu'
    });

    // window.resizeTo(439,177);
    
    $('#view').html(compiled);
    moveWindow('lb',439,177,false);
    attachedEvents();
}

//renders the small pop up window 

var renderStoryText = function() {

  var tplToCompile = $('#tpl_story').html();

     var compiled = _.template(tplToCompile, {
        line: story[stepCounter]
    });


  moveWindow('mb','full', 200, false);
    $('#view').html(compiled);
  
  attachedEvents();

}

var renderMenuExp = function() {
   var tplToCompile = $('#tpl_pop_expand').html();

   var compiled = _.template(tplToCompile, {
        data: 'menu expand'
    });

  // window.resizeTo(840,177);
  moveWindow('lb',840,177,false);

  $('#view').html(compiled);
  
  attachedEvents();
}

//*********************FUNCTIONS

//xy for 3x3 grid placement i.e where you want to move to
//w - width if changing
//h - height if changing
//centre - true or false
var moveWindow = function(xy,w,h,centre){

  if(w == 'full') {w = window.screen.availWidth - 40 };
  if(h == 'full') {h = window.screen.availWidth - 40 };

  if(centre){
    //place it in the centre
    var pos = windowCenter(w,h);
    //move to pos
    
    window.resizeTo(w,h);
    window.moveTo(pos.left,pos.top);
  }else {
    //get co-ordinates
    var pos = windowPos(xy,w,h,centre);
    window.resizeTo(w,h);
    window.moveTo(pos.left,pos.top);
  }
}



//FINDS WINDOWS LEFT AND TOP VALUES TO GET IT IN THE RIGHT POSITION
//////////////////////////////////////////////////////////////////
//functions for pop ups etc...
//just from LHAND corner of window for now...
//x = left, middle, right
//y = top, middle, bottom
//w = width
//h = height
//centred = true/false
var windowPos = function(xy, w, h, centre) {
  windowPoints = {
    lt: {
      left: window.screen.availLeft,
      top:  window.screen.availTop
    },
    lm: {
      left: window.screen.availLeft ,
      top: (window.screen.availHeight/2)
    },
    lb: {
      left: window.screen.availLeft,
      top: window.screen.availHeight - h //this may be an issue as it's not outer height
    },
    mt: {
      left: (window.screen.availWidth/2) -(w/2),
      top: window.screen.availTop
    },
    mb: {
      left:(window.screen.availWidth/2) -(w/2),
      top:window.screen.availHeight - h
    },
    rt: {
      left:window.screen.availWidth - w,
      top:window.screen.availTop
    },
    rm: {
      left:window.screen.availWidth-w,
      top:(window.screen.availHeight/2)-h
    },
    rb: {
      left:window.screen.availWidth-w,
      top:window.screen.availHeight - h
    }
  };
  
  console.log('windowpos');
  console.log(windowPoints);
  
  
  
  if(centre){
    //place it in the centre
    var pos = windowCenter(w,h);
    console.log('WINDOW POSITION');
    console.log(pos);
    console.log('center = true');
    return pos;
    
  }else{
    
        for (var winType in windowPoints) {
          console.log(winType);
          console.log(windowPoints[winType]);
          if(xy == winType){
              var pos = {
                left:windowPoints[winType].left,
                top:windowPoints[winType].top
              };
            
              console.log('WINDOW POSITION');
              console.log(pos);
              return pos;
          }
        }
      } // end of else
} // end of function

//centers the window
var windowCenter = function(w,h) {
  var screenWidth = window.screen.availWidth;
  var screenHeight = window.screen.availHeight-1;
  
  var midPoint = {
    left: screenWidth/2,
    top: screenHeight/2
  };
  
  var left = midPoint.left - (w/2);
  var top = midPoint.top - (h/2);
  var pos = {
    left: left,
    top: top
  };
  return pos;
}