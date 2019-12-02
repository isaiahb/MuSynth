const express = require("express");
var app = express();
var http = require('http').createServer(app);
app.use(require("morgan")("dev"));
app.use(express.static('./fullFrontEnd'));

// var io = require('socket.io')(http);

// const io = require('socket.io')();
// or
// const Server = require('socket.io');
// const io = new Server();
// io.attach(9001, {
// 	pingInterval: 10000,
// 	pingTimeout: 5000,
// 	cookie: false
// });


// app.get('/', function (req, res) {
// 	res.sendFile(__dirname + "/index.html");
// });

var io = require('socket.io')(http, { 'transports': ['websocket', 'polling'] });

function floatsToNotes(floats) {
	return Math.round(Math.random() * 4);
}
// io.emit('notes', data);


const {streamWrite, streamEnd, onExit} = require('@rauschma/stringio');

var spawn = require('child_process').spawn;
var py = spawn('python', ['dsp.py']);
// var py = spawn('python', ['hello.py']);

/*Here we are saying that every time our node application receives data from the python process output stream(on 'data'), we want to convert that received data into a string and append it to the overall dataString.*/
py.stdout.on('data', function (data) {
	// dataString += data.toString();
	console.log(data);
});

py.on("error", (err)=>console.log(err));

var buffer = [];

function add(data) {
	if (buffer.length >= 256 * 10) {
		buffer = data.concat(buffer.slice(0, buffer.length - data.length));
	} else {
		buffer = data.concat(buffer);
	}
}

io.on('connection', function (socket) {
	console.log("new connection")

	// var onevent = socket.onevent;
	// socket.onevent = function (packet) {
	// 	var args = packet.data || [];
	// 	onevent.call(this, packet);    // original call
	// 	packet.data = ["*"].concat(args);
	// 	onevent.call(this, packet);      // additional call to catch-all
	// };

	// socket.on("*", function (event, data) {
	// 	// console.log(event);
	// 	// console.log(data);
	// });

	//receive processed data from python send to audience clients
	socket.on("python", function (data) {
		console.log("python " + data);
		io.emit('notes', data);

	});

	//receive data from muscician client, send to python for processing
	socket.on("floats", function (data) {
		add(data);
		console.log("buffer lenngth:  " + buffer.length);

		io.emit('process', buffer);
	});

});


//start web server
const PORT = 9000;
http.listen(PORT, function () {
	console.log('listening on http://localhost:' + PORT);
});
