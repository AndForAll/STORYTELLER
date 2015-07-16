var angular = angular || {};

angular.module('app.window.service', [])
  .factory('winServe', function($rootScope) {
    //M E T H O D S
    ///////////////
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
        };

        //FINDS WINDOWS LEFT AND TOP VALUES TO GET IT IN THE RIGHT POSITION
        //////////////////////////////////////////////////////////////////
        //functions for pop ups etc...
        //just from LHAND corner of window for now...
        //x = left, middle, right
        //y = top, middle, bottom
        //w = width
        //h = height
        //centred = true/false
        var windowPos = function(xy,w,h,centre){
          console.log('windowpos');
          console.log(windowPoints);

          var windowPoints = {
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

          } //end of else
        }; //end of winPos

    return {
          winPos: function(xy,w,h,centre){
            return windowPos(xy,w,h,centre);
          },
          winCenter: function(w,h){
            return windowCenter(w, h);
          },//might need to fix!!!!!
          openWin: function(url,name,profile){
            $rootScope.global.openWins[name] =  window.open(url,name,'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,'+profile);
            console.log($rootScope.global.openWins);
          },
          selfdestruct: function(){
            window.close();
          },
          closeWin: function(win){
            win.close();
          }
          //NOT YET WORKING
          ,
          //can only be called from main window.. as this has all the open windows saved in it's rooot
          closeAll: function(wins){
            console.log('in close all');
            console.log(wins);

            for(var win in wins){
              console.log(win);
              console.log(wins[win]);
              wins[win].close();
            };
          }

    };//end of retrn

  });
