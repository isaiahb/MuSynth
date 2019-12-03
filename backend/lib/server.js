const express = require("express");
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http, { 'transports': ['websocket', 'polling'] });

app.use(require("morgan")("dev"));
app.use(express.static('./public'));


var spawn = require('child_process').spawn;
var py = spawn('python3', [__dirname + '/dsp.py']);

py.stdout.on('data', function (data) {
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

var muzes = {};

io.on('connection', function (socket) {
	console.log("new connection")

	//receive processed data from python send to audience clients
	socket.on("python", function (data) {
		console.log("python " + data);
		io.emit('notes', data);

	});

	//receive data from muscician client, send to python for processing
	socket.on("floats", function (data) {
		// console.log(data);
		add(data);
		io.emit('process', buffer);
	});

	//receive data from muscician client2
	socket.on("key", function (data) {
		console.log("key: " + data);
		io.emit('notes', data);
	});

});


//start web server
const PORT = 9000;
http.listen(PORT, function () {
	console.log('listening on http://localhost:' + PORT);
});
