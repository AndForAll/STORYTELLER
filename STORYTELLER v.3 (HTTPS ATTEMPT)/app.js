
// var express = require('express');
// var port = 3000;
// var app = express(),
// 	// so we can read write
// 	fs = require('fs'),
// 	//options for https
// 	//how I generated keys http://gaboesquivel.com/blog/2014/nodejs-https-and-ssl-certificate-for-development/
// 	options = {
// 		key: fs.readFileSync('crts/client.key'), 
// 		cert: fs.readFileSync('crts/client.crt'),
// 		requestCert: true
// 	},
// 	//assign the HTTPS to the server obj
// 	server = require('https').createServer(options,app),
// 	//bind this with socket's server
// 	io = require('socket.io').listen(server);

// 	app.use('/', express.static(__dirname + '/public'));
// 	console.log(server);
// 	console.log('running');
// 	console.log(port);
	
// server.listen(port);

// io.on('connection', function(socket) {

// 	//send greeting message to any new sockets that connect
// 	socket.emit('greeting', {
// 		msg: 'welcome',
// 		id: socket.id
// 	});
// 	console.log(socket.id + ' just connected');
// });

// var express = require('express');

// var https = require('https');
// var app = express();

// //require read write files so we can read keys etc...
// var fs = require('fs');
// //options for https server
// // var options = {
// // 	// host: 'local.foobar3000.com',
// // 	ca: fs.readFileSync('certs/client/my-root-ca.crt.pem'),
// // 	key: fs.readFileSync('certs/client/my-app-client.key.pem'),
// // 	cert: fs.readFileSync('certs/client/my-app-client.crt.pem'),
// // 	requestCert: true,
// // 	rejectUnauthorized: false,
// // };

// var options = {
// 	// host: 'local.foobar3000.com',
// 	key: fs.readFileSync('certs/server/my-server.key.pem'),
// 	ca: fs.readFileSync('certs/server/my-root-ca.crt.pem'),
// 	cert: fs.readFileSync('certs/server/my-server.crt.pem'),
// 	requestCert: true,
// 	rejectUnauthorized: false
// };

// console.log(options);

// https.createServer(options, app).listen(8001);


var https = require('https')
  , port = process.argv[2] || 8001
  , fs = require('fs')
  , path = require('path')
  , server
  , options
  ;

options = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'server', 'my-server.key.pem'))
, ca: [ fs.readFileSync(path.join(__dirname, 'certs', 'server', 'my-root-ca.crt.pem'))]
, cert: fs.readFileSync(path.join(__dirname, 'certs', 'server', 'my-server.crt.pem'))
, requestCert: true
, rejectUnauthorized: true
};

var app = function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, encrypted world!');
}

console.log(https);

server = https.createServer(options, app);
server.listen(port, function() {
	console.log('SUCCESS');
});

// .listen(port, function () {
//   port = server.address().port;
//   // console.log('Listening on https://127.0.0.1:' + port);
//   console.log('Listening on https://' + server.address().address + ':' + port);
//   console.log('Listening on https://local.foobar3000.com:' + port);
// });




