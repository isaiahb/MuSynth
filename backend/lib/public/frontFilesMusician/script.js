
function stop(){
    document.getElementById("div1").style.animation="blink 0s";
    document.getElementById("div2").style.animation="blink 0s";
    document.getElementById("div3").style.animation="blink 0s";
    document.getElementById("div4").style.animation="blink 0s";
}

function start(){
    document.getElementById("div1").style.animation="blink 0.125s infinite";
    document.getElementById("div2").style.animation="blink 0.1s infinite";
    document.getElementById("div3").style.animation="blink 0.0833s infinite";
    document.getElementById("div4").style.animation="blink 0.06667s infinite";
}

function setColor(){
    var e = document.getElementById("itype");
    var c = e.options[e.selectedIndex].value;
    document.documentElement.style.setProperty('--color', c);
    

}