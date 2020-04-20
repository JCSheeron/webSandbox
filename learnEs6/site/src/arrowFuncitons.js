import React from 'react';

// Rename this script "es6.js" to run it
console.log("Running es6.js");

// old syntax
var studentList = function(students) {
    console.log(students);
};

// es6 syntax with arrow functions =>
var studentList2 = (students) => console.log(students);

studentList(["Joe", "Cincy", "Jeanne"]);
studentList2(["Mark", "Sadie", "Zoe"]);

var person = {
    first: "Doug",
    actions: ['bike', 'hike', 'ski', 'surf'],
    // method with 'old syntax'
    // instead of bind(this) at the end, you could also 
    // use var_this = this ahead of the forEach, and ref _this in the loop
    printActions: function() {
        // var _this = this;
        this.actions.forEach(function(action) {
            var str = this.first + "likes to " + action;
            console.log(str);
        }.bind(this));
    },
    // method with new es6 syntax.
    // Could use parentheses aorund acton and other params if there were more than on.
    // If only one argument, the paraentheses are optional.
    printActions2() {
        // var _this = this;
        this.actions.forEach(action => {
            var str = this.first + "likes to " + action;
            console.log(str);
        });
    }
};
person.printActions();
person.printActions2();

