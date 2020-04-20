// Rename this script "es6.js" to run it
console.log("Running es6.js");

var attendance = {
    _list: [],
    set addName(name) {
        this._list.push(name);
    },
    get list() {
        return this._list.join(', ');
    }
};

console.log(attendance.list);
console.log(attendance._list);
attendance.addName = 'Johanne';
console.log(attendance.list);
console.log(attendance._list);
attendance.addName = 'Raymond';
console.log(attendance.list);
console.log(attendance._list);

