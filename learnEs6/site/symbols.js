// Generators in Javascript
// If using Bable 7, needs @babel/plugin-transform-runtime
// If using Babel 6, needs babel-plugin-transform-runtime or babel-polyfill
//      npm install --save-dev ...
// Rename this script "es6.js" to run it
console.log("Running es6.js");

const id = Symbol();
const courseInfo = {
    title: "ES6",
    topics: ["babel", "syntax", "functions", "classes"],
    id: "js-course"
};

console.log(id);
courseInfo[id] = 432113;
console.log(courseInfo);
console.log(courseInfo[id]);
