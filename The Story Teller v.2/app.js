/*

THE STORY TELLER


*/

// We will need 'Express' module
var express = require('express');
// To be able to decipher post request, we need to require body-parser
var bodyParser = require('body-parser');
var google = require('google-images');

// Refer our server to 'app'
// Reference at http://expressjs.com/api.html
// http://erichonorez.wordpress.com/2013/02/04/a-basic-web-server-with-node-js-and-express/
var app = express();
var fs = require('fs');
// Inject Parse API (https://github.com/Leveton/node-parse-api)
var Parse = require('node-parse-api').Parse;
var options = {
    app_id: 'mpnax0d3QHAGv4I6zZdd39DPzCPut9SuQmzzzAiN',
    api_key: 'FDNcvv8FuodaLLMfzunuKuXxJqMgwH1ByvcsniP4' // rest_key:'...' could be used too
};
var parse = new Parse(options);

// .use is a middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());
app.use(function(req, res, next) {
    // Setup a Cross Origin Resource sharing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log('incoming request from ---> ' + ip);
    // Show the target URL that the user just hit
    var url = req.originalUrl;
    console.log('### requesting ---> ' + url);
    next();
});

app.use('/', express.static(__dirname + '/public'));

/*
INTERFACE ROUTERS
*/

// create a new story entry
app.post('/story', function(req, res){

    console.log('SERVER RECIEVING NEW STORY');

    var story = JSON.parse(req.body['data']);

    parse.insert('Story_Templates' , {
        title: req.body['title'],
        story_content: story,
        triggers: req.body['triggers[]']
    },function(err, data){
        if(err){
            console.log(err);
        }else{
            res.json({
                status: 'SERVER SIDE RECIEVED STORY',
                data: data
            });
        }
    });

});


//pull all stories
///WHEN GETTTING STORY CONTENT YOU MUST USE JSON TO PARSE
// IT BACK INTO AN OBJECT
app.get('/stories', function(req, res) {
  console.log(req.query);

  //grab all story templates from database
  parse.findMany('Story_Templates' , '', function(err, results) {
    if(err){
      console.log(err);
    } else  {
      console.log('SERVER SUCCESSFUL IN GETTING STORIES FROM DATABASE');
      console.log(results);
      res.json({
        status: 'SERVER SUCCESSFUL IN GETTING ALL STORY TEMPLATES',
        data: results
      });
    }
  });
});

//get a specific story based on it's id
app.get('/getstory', function(req, res){
    // console.log(req.query.objectId);
    var id = req.query.id;
    parse.find('Story_Templates', id , function(err,result){
        if(err){
            console.log(err);
        }else {
            res.json({
                data: result
            });
        }
    });
});


//edit story

//delete story

/*
ROUTERS
*/

// recieves the users input word and searches google for
// an image grabs the info and sends it back to the client side
app.post('/answer', function(req, res) {
console.log(req.body.word);
google.search(req.body.word, function(err,images){
    if(err) throw err;
    console.log(images);
    res.json({
        images : images
    });
});
        });



//initialize server

var PORT = 3000; //the port you want to use
app.listen(PORT, function() {
    console.log('Server running at port ' + PORT + '. Ctrl+C to terminate.');
});
