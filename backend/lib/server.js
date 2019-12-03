const express = require("express");
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http, { 'transports': ['websocket', 'polling'] });

app.use(require("morgan")("dev"));
app.use(express.static(__dirname+'/../public'));
var spawn = require('child_process').spawn;

//add data to the muze buffer
function add(data, muze) {
	if(!muze.last) muze.last = Date.now();

	if (muze.buffer.length >= 256 * 10) {
		muze.buffer = data.concat(muze.buffer.slice(0, muze.buffer.length - data.length));
	} else {
		muze.buffer = data.concat(muze.buffer);
	}
}

//keep track of the clients that are connected with a muze, store a buffer and python proccess for them as well
var clients = {};


io.on('connection', function (socket) {
	let id = socket.id;
	console.log("CONNECTED:  " + id)

	socket.on('disconnect', function(){
		console.log("DISCONNECTED:  " + id)
		var muze = clients[id];
		if(muze) {
			console.log("killing the process " + id);
			muze.process.kill('SIGINT');
		}
		clients[id] = null;
	});

	//receive processed data from python send to audience clients
	socket.on("python", function (data) {
		console.log("python " + data);
		io.emit('notes', data);

	});

	//receive data from muscician client, send to python for processing
	socket.on("floats", function (data) {
		//create a muze if doesn't exist
		// let id = socket.id;
		let muze = clients[id];

		if(!muze) {
			console.log("*new muze-ision*\n id:  " + id)
			clients[id] = {
				buffer: [],
				process: spawn('python3', [__dirname + '/dsp.py', id]),
				last: Date.now()
			}
			muze = clients[id];
			muze.process.stdout.on('data', function (data) {
				console.log();
				console.log("**process " + id + ": \n   " + data);
			});
			muze.process.on("error", (err)=>console.log(err));

		}

		add(data, muze);
		let dif =  Date.now() - muze.last;
		let seconds = dif / 1000;

		if(seconds >= 1) {
			io.emit('process'+id, muze.buffer);
			muze.last = Date.now();
		}
	});

	//receive data from muscician client2
	socket.on("key", function (data) {
		console.log("key: " + data);
		io.emit('notes', data);
	});

});


//start web server
const PORT = process.env.PORT || 9000;
http.listen(PORT, function () {
	console.log('listening on http://localhost:' + PORT);
});
