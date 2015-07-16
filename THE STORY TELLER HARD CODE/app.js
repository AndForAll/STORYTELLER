/* 

THE STORY TELLER THE HARD CODE VERSION

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

//initialize server



/*
INTERFACE ROUTERS
*/

//recieve speech input from client side
app.post('/visual', function(req,res){
    console.log('recieved message from client and searching fro visual');
    console.log(req.body['data']);
    //search google for it
    google.search(req.body['data'], function(err,images) {
        if(err) throw err;
        console.log('G O O G L E :');
        console.log(images);

        res.json({
            images: images
        });

    });
});




var PORT = 3000; //the port you want to use
app.listen(PORT, function() {
    console.log('Server running at port ' + PORT + '. Ctrl+C to terminate.');
});