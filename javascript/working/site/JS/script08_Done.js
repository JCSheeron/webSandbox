// NOTE: Modified from (buggy) exercise code as it was delivered.
const testArea = document.querySelector(".test-area");
const originText = testArea.querySelector("#origin-text p").innerHTML;
const testWrapArea = document.querySelector(".test-wrapper #test-area");
const testWrapper = document.querySelector(".test-wrapper");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0]; // min, sec, 0.01sec, 0.001 sec
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + "." + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testWrapArea.value;
    // get the entered number of characters worth of the origin text
    let originTextMatch = originText.substring(0, textEntered.length);

    // compare entered text with target text
    if (textEntered == originText) {
        // exact match!
        clearInterval(interval);
        console.log("Exact match!");
        testWrapper.style.borderColor = "#429890";
    } else {
        if (textEntered == originTextMatch) {
            // match so far
            console.log("Match so far.");
            testWrapper.style.borderColor = "#65CCF3";
        } else {
            console.log("Not a match.");
            testWrapper.style.borderColor = "#E95D0F";
        }
    }
}

// Start the timer:
function start() {
    let textEnteredLength = testWrapArea.value.length;
    if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

// Reset everything:
function reset() {
    console.log("Reset button has been pressed!");
    // stop the interval timer and reset the instance.
    clearInterval(interval);
    interval = null;

    // Reset the timer and the displayed time.
    timer = [0,0,0,0];
    timerRunning = false;
    theTimer.innerHTML = "00:00.00";
    testWrapArea.value = "";
    testWrapper.style.borderColor = "grey";

}

// Event listeners for keyboard input and the reset button:
testWrapArea.addEventListener("keypress", start, false);
testWrapArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
