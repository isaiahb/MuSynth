// client 
var id = 1;
var socket = require('socket.io-client')(`http://localhost:9000?type=audience&id=${id}`);

socket.on('connect', function(){});
socket.on('notes', function(data){
	console.log("event");
	console.log(data);
});
socket.on('disconnect', function(){});


function sleep(ms){
    return new Promise(resolve=>{
		setTimeout(resolve,ms)
    });
}