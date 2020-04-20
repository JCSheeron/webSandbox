// Generators in Javascript
// If using Bable 7, needs @babel/plugin-transform-runtime
// If using Babel 6, needs babel-plugin-transform-runtime or babel-polyfill
//      npm install --save-dev ...
// Rename this script "es6.js" to run it
console.log("Running es6.js");

function* director() {
    console.log("Director L1");
    yield "Three";
    console.log("Director AY1");
    yield "Two";
    console.log("Director AY2");
    yield "One";
    console.log("Director AY3");
    yield "Action!";
    console.log("Director AY4");
};

var action = director();
console.log(action);

console.log(action.next());

console.log(action.next());
console.log(action.next());
console.log(action.next());
console.log(action.next());

// Genrators used often with async events or timers
function* eachItem(arr) {
    for(var i=0; i<arr.length; i++) {
        yield arr[i];
    }
}

var letters = eachItem(["a", "b", "c", "d", "e", "f", "g"]);

var abcs = setInterval(function(){
    var letter = letters.next();
    if (letter.done) {
        clearInterval(abcs);
        console.log("Now I know my ABC's");
    }
    else
        console.log(letter.value);
},
    500);

