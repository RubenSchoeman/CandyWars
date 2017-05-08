function Backpack () {
    var backpack = [];

    this.setBackpack = function(item) {
        backpack.push = item;
    };

    this.getBackpack = function() {
        return backpack;
    };


}
