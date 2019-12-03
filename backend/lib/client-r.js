// client 
var id = 1;
var socket2 = require('socket.io-client')(`https://musynth.herokuapp.com`);
var socket = require('socket.io-client')(`http://localhost:9000`);

socket.on('connect', function(){});
socket.on('notes', function(data){
	console.log("event");
	console.log(data);
	socket2.emit("key", data);
});
socket.on('disconnect', function(){});


function sleep(ms){
    return new Promise(resolve=>{
		setTimeout(resolve,ms)
    });
}