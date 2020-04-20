// Rename this script "es6.js" to run it
console.log("Running es6.js");

const delay = seconds => {
    return new Promise(resolve => {
        setTimeout(resolve, seconds * 1000);
    });
};

console.log("zero seconds");
delay(1).then(() => console.log("one second"));
delay(3).then(() => console.log("three seconds"));

const delay2 = seconds => {
    return new Promise(resolve => {
        setTimeout(
            () => resolve(`${seconds} second delay is up`),
            seconds * 1000
        );
    });
};

console.log("zero seconds");
delay2(2).then((msg) => console.log(msg));
delay2(4).then(msg => console.log(msg));

