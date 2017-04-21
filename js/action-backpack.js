function Array() {
    var array = {
        0: ["steve", 35],
        1: ["bob", 25],
        2: ["smitty", 56]
    };

    this.updateArray = function() {
        array.push("Mike", 22);
    };
}

en dan erens in n ander class:

    array.updateArray();

of is dit beter om eerder so te maak:

function Array() {
    var array = {
        0: ["steve", 35],
        1: ["bob", 25],
        2: ["smitty", 56]
    };

    this.getArray =function() {
        return array;
    }:
}

function ManageEveryThing() {

    this.updateArray = function(name, age) {
        var array = array.getArray()
        array.push(name, age);
    };
}

en dan erens in n ander class:

    manageeverything.updateArray();
