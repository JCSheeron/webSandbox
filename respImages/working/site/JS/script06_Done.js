const HOURHAND = document.querySelector("#hour");
const MINUTEHAND = document.querySelector("#minute");
const SECONDHAND = document.querySelector("#second");

// Initially figure out the clock position based on the current time
// Get current date, and break out hrs, mins, and secs.
var date = new Date();
let hr = date.getHours();
let min = date.getMinutes();
let sec = date.getSeconds();

// convert time into degrees
let hrDeg = (360.0 / 12.0) * hr + (((360.0/60.0) * min) / 12.0);
;
let minDeg = ((360.0 / 60.0) * min) + (((360.0/60.0) * sec) / 60.0);
let secDeg = (360.0 / 60.0) * sec;


function runTheClock() {
    // Assume the clock hand positions were initially positioned.
    // Now calculate the incremental movement every time the function is called.
    // Calc Deg/sec for each handi
    hrDeg = hrDeg + 1/120; // (360/12 * 1/3600) or 30/3600 or 1/120 or 
    minDeg = minDeg + 0.1; // (360/60 * 1/60) or 6/60 or 1/10 or 0.1
    secDeg = secDeg + 6; //  360/60 
    // position (rotate) the clock hands
    HOURHAND.style.transform = "rotate(" + hrDeg +"deg)";
    MINUTEHAND.style.transform = "rotate(" + minDeg +"deg)";
    SECONDHAND.style.transform = "rotate(" + secDeg +"deg)";
}


var interval = setInterval(runTheClock, 1000);

