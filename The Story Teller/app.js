/* 

DT Project Tracker App with Parse Database (parse.com)
Feb 19 2015

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

// create a new story entry w/ default story
// then grab it's object id to send back to client side
// coming from .btnCreate
app.post('/story', function(req, res){
    // console.log(req.body);
    console.log('SERVER SIDE RECIEVING DEFAULT STORY ENTRY');
    // console.log(req.body['story[]']);
    // console.log(req.body['title']);

    //create random gen storyId 
    var storyId = Math.floor(Math.random() * 500) + 1; 

    parse.insert('Story' , {
        title: req.body['title'],
        story_content: req.body['story[]'],
        storyId: storyId + req.body['title']
    },function(err, data){
        if(err){
            console.log(err);
        }else{
            //find the instance of this story in parse
            // and grab the object ID 
            parse.find('Story', {
                storyId: storyId + req.body['title']
            }, function(err, result){
                if(err){
                    console.log(err);
                }else {
                    console.log(result.results[0].objectId);
                    res.json({
                        status: 'Default Story Template added to DB',
                        storyId: result.results[0].storyId,
                        objectId: result.results[0].objectId
                    });
                }
            });
        }
    });
});

////DO NEXT *********************************
//eventually could work for final submission of story
// as well as for the update functionality on the browse page
app.post('/storyUpdate', function(req, res){
    //we recieve the data to update the story object in the DB 
    console.log('WE IN STORY UPDATE!!!');
    console.log(req.body);
    console.log(req.body['title']);
    console.log(req.body['story[]']);
    console.log(req.body['id']);

    //add an extra line to the story array
    // var story = [];

    // parse.update('Story', id, {
    //     title: ,
    //     story: 
    // }, function(err, result){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         console.log(result);
    //     }
    // });


});

//get a specific story based on it's id
app.get('/getstory', function(req, res){
    // console.log(req.query.objectId);
    var id = req.query.objectId;
    parse.find('Story', id , function(err,result){
        if(err){
            console.log(err);
        }else {
            // console.log('results from get method used to compile create page');
            // console.log(result);
            res.json({
                data: result
            });
        }
    });
});


//create new story entry
//and send to parse
app.post('/create', function(req,res){

    console.log(req.title);
    console.log(req.story);

    res.json({
        status: 'SERVER SIDE RECIEVED STORY'
    });

});

//pull all stories

//edit story

//delete story 

/*
ROUTERS
*/

app.get('/answer', function(req, res) {
    
});

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