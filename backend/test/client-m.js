// client 
var id = 0;
var socket = require('socket.io-client')(`http://localhost:9000`);

socket.on('connect', function(){});
socket.on('event', function(data){});
socket.on('disconnect', function(){});

function randomF() {
	return Math.round(Math.random() * 2000) - 1000;
}

function randomFrequencies() {
	var floats = [];
	for (var i = 0; i < 255; i++) {
		floats.push(randomF());
	}
	return floats;
}

async function run() {
	while(true)  {
		await sleep(1000);
		socket.emit('floats', randomFrequencies());
	}
}
run();

function sleep(ms){
    return new Promise(resolve=>{
		setTimeout(resolve,ms)
    });
}
