//eventually need to create a module.export for google search api

//////////////////////////////////////////////////////////////////
/////////////// S T O R Y T E L L E R //////////////////////////////

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var google = require('googleapis');

var port = 3000;
var rooms = [];

server.listen(port, function() {
    console.log('Server running at port:' + port);
});

app.use('/', express.static(__dirname + '/public'));


/*
S O C K E T

- listening for connection
- always start w/ connection; everything happens within this scope

*/
//for module way that was kinda working
// io.sockets.on('connection', socket);

io.on('connection', function(socket){
/*––––––––––– SOCKET.IO starts here –––––––––––––––*/

    /*
    .on
    .emit
    .broadcast
    */
    console.log('connected');



    // console.log('can I get io here?');
    // console.log(socket);

    console.log('socket id:'+ socket.id +'connected');

    //GREET NEW CONNECTION & SEND THEM THEIR SOCKET-ID
    socket.emit('init', {
      msg: 'GREETINGS FROM SERVER NEW CLIENT',
      id: socket.id
    });

    socket.on('send:rmcreate', function(data, callback){
      console.log('RECIEVED REQ TO CREATE ROOM');
      console.log(data.rmKey);

      var roomObj = {
        id: data.rmKey,
        members: {
          main: socket.id
        },
        fable: data.data
      };
      //add it to the rooms array
      rooms.unshift(roomObj);
      console.log(rooms);
      socket.join(data.rmKey);

        callback({
          id:socket.id,
          msg:'CONNECTED SOCKET TO ROOM!',
          data: data.rmKey
        });


    });

    //W R I T E   A   FUNCTION FOR DELETING RM WHEN FINISHED OR DISCONNECT

  }); // E N D  O F  S O C K E T CONNECT

var findRm = function(id){
  for(var i =0; i < rooms.length; i++){
    if(rooms[i].id == id){
      return rooms[i];
      // return i;
    }
  }
  return null;
};
