function Candy(){

    var name = "";
    var wanted_level = null; // 10 very wanted
    var manufacture_difficulty = null; // 10 very difficult

    this.setName = function(set_name) {
        name = set_name;
    };

    this.setWantedLevel = function(set_want_level) {
        wanted_level = set_want_level;
    };

    this.setCandyManufacturingDiff = function(man_diff) {
        manufacture_difficulty = man_diff;
    };

    this.getName = function() {
        return name;
    };

    this.getWantedLevel = function() {
        return wanted_level;
    };

    this.getCandyManufacturingDiff = function() {
        return manufacture_difficulty;
    };

}
