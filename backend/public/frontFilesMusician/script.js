
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


var a, b, c, d, e, f, g, h, j, k, l;
var music = [];

function loadAudio() {
	b = document.getElementById("b");
	e = document.getElementById("e");
	a = document.getElementById("a");
	d = document.getElementById("d");
	
	e = document.getElementById("e");
	r = document.getElementById("r");
	d = document.getElementById("d");


	h = document.getElementById("poop");
	j = document.getElementById("scoop");
	k = document.getElementById("whoopity");
	l = document.getElementById("whoop");

	music[0] = b;
	music[1] = e;
	music[2] = a;
	music[3] = d;
	
	music[4] = b;

	music["h"] = h;
	music["j"] = j;
	music["k"] = k;
	music["l"] = l;
}

socket.on('notes', function (data) {
	if (!a) {
		loadAudio();
	}
	// console.log(data);
	if(!music[data].paused){
		music[data].currentTime = 0;
	}
	music[data].play();

});
socket.emit('my other event', { my: 'data' });
