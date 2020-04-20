import React from 'react';

// Rename this script "es6.js" to run it
console.log("Running es6.js");


var books = new Set();
books.add('Pride and Prejudice');
books.add('War and Peace')
     .add("Oliver Twist");

console.log(books);
console.log('how many books?', books.size);
console.log('has Oliver Twist?', books.has('Oliver Twist'));
books.delete('Oliver Twist');
console.log('has Oliver Twist still?', books.has('Oliver Twist'));

// set values must be unique, or they get stripped out
var data = [4, 2, 3, 4, 5, 2, 1, 6, 7, 8, 9, 4, 4];
var dset = new Set(data);
console.log("data length", data.length);
console.log("set size", dset.size);
console.log(dset);


