
function stop() {
	document.getElementById("div1").style.animation = "blink 0s";
	document.getElementById("div2").style.animation = "blink 0s";
	document.getElementById("div3").style.animation = "blink 0s";
	document.getElementById("div4").style.animation = "blink 0s";
}

function start() {
	document.getElementById("div1").style.animation = "blink 0.125s infinite";
	document.getElementById("div2").style.animation = "blink 0.1s infinite";
	document.getElementById("div3").style.animation = "blink 0.0833s infinite";
	document.getElementById("div4").style.animation = "blink 0.06667s infinite";
}

function setColor() {
	var e = document.getElementById("itype");
	var c = e.options[e.selectedIndex].value;
	document.documentElement.style.setProperty('--color', c);
}



var socket = io("/");
socket.on('news', function (data) {
	console.log(data);
});

document.onkeydown = (e)=>{
	console.log(e);
	socket.emit("key", e.key);
}

var r = document.getElementById("r");
var d = document.getElementById("d");
var a, b, c, d, e, f, g;
var music = [];

function loadAudio() {
	b = document.getElementById("b");
	e = document.getElementById("e");
	a = document.getElementById("a");
	d = document.getElementById("d");

	e = document.getElementById("e");
	r = document.getElementById("r");
	d = document.getElementById("d");

	music[0] = b;
	music[1] = e;
	music[2] = a;
	music[3] = d;

	music[4] = b;
}

socket.on('notes', function (data) {
	if (!r || !d) {
		loadAudio();
	}
	// console.log(data);
	music[data].play();
	// if (data == 0)
	// 	r.play();
	// else
	// 	d.play();
});
socket.emit('my other event', { my: 'data' });
