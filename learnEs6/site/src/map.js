import React from 'react';

// Rename this script "es6.js" to run it
console.log("Running es6.js");


var course = new Map();
// set values with the set method
course.set('react', {description: 'ui'});
course.set('jest', {description: 'testing'});

console.log(course);
console.log(course.react);
// need to use get method to get a value
console.log(course.get('react'));

// set values by passing an array
var details = new Map([
    [new Date(), 'today'],
    ['items', [1, 2]]
]);

console.log(details);
console.log(details.size);
console.log(details.get('items'));

details.forEach(function(item) {
    console.log(item);
});

var topics = new Map();
topics.set('HTML', '/class/html');
topics.set('CSS', '/class/css');
topics.set('JavaScript', '/class/javascript');
topics.set('Node', '/class/node');

console.log(topics)

// for of loops
for (let topic of topics) {
    console.log('The course is ', topic);
};

for (let topic of topics.keys()) {
    console.log(topic, 'is the course name');
};

for (let topic of topics.values()) {
    console.log('The course description can be found at', topic);
};

for (let course of topics.entries()) {
    console.log(course)
};

