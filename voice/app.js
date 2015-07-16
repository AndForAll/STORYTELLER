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
    app_id: 'CZgxivzCjFOAvBn1OxmTMWQyIZKGBGjNx7XB3fdp',
    api_key: 'KBa3v1uy1cd33zL4cnFH0J2MwhuxHNqAsPHrjHYE' // rest_key:'...' could be used too
};
var parse = new Parse(options);
// Add crypto for encrypting email

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





app.get('/answer', function(req, res) {
    
});




// Create a project
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