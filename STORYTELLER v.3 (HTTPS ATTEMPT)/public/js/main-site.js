
var app = {};

app.init = function() {
	// var socket = io();
	renderLandingPage();
	// var startSocket = function() {
	// 	socket = io.connect('https://149.31.145.201:3000/', {secure:true});
	// 	//socket = io.connect('https://IP:PORT', {secure:true});
	// 	socket.on('greeting', function(data){
	// 		console.log(data);

	// 	});
	// }
}

// EVENTS // BUTTONS
var attachEvents = function() {

}

// PAGE RENDERERS
var renderLandingPage = function() {

	var tplToCompile = $('#tpl_home').html();

    var compiled = _.template(tplToCompile, {
        data: 'test'
    });

    $('#view').html(compiled);

    attachEvents();
}

// FUNCTIONS

app.init();
