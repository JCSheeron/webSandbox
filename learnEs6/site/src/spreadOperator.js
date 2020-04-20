import React from 'react';

// Rename this script "es6.js" to run it
console.log("Running es6.js");

var cats = ["Tabby", "Siamese", "Persian"];
var dogs = ["Golden Retriever", "Pug", "Schnauzer"];
var animals = ["Whale", "Giraffe", ...cats, "Snake", dogs, "Coyote"];

console.log(animals);
