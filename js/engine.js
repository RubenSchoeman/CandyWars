function Engine(){
    var _engine = this;
    var stay = null;

    var candy_type = [
        "Atomic balls",
        "Candy Cigs",
        "Cotton Candy",
        "Gummi Bears",
        "Lollipop",
        "Milk Duds",
        "M&Ms",
        "Jaw Breaker",
        "Kit-Kat",
        "Pop Rocks",
        "Peeps",
        "Skittles",
        "Smarties",
        "Starburst",
        "Tootsie Roll",
    ];

    this.initCityManufactures = function(){
        for(var key in candy_type){
            InitCandy(candy_type[key]);
        }
    };

    this.initCandyNames = function() {
        for(var key in candyArray){
            candyArray[key].setName(_engine.getCandyType(key));
        }
    };

    this.randomHundred = function() {
        var temp = Math.ceil(Math.random() * 100 + 1);
        return temp;
    };

    this.stockUpCityProducts = function(location) {
        citiesArray[location].stockUpProducts();
    };

    this.checkCityStock = function(location) {
        citiesArray[location].checkStock();
    };

    this.updateCityLowStock = function(key) {
        citiesArray[key].getLowStock();
    };

    this.getSelectedTravelToValue = function() {
        var e = document.getElementById("travel_To");
        var strUser = e.options[e.selectedIndex].text;
        return strUser;
    };

    this.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    this.getCandyType = function(index) {
        return candy_type[index];
    };

    this.getCandy = function() {
        return candy_type;
    };

    this.getCandyWantedLevel = function(key) {
        return candyArray[key].getWantedLevel();
    };

    this.manageNpc = function() {
        for(var key in npcArray) {
            npcArray[key].buyCheapStock();
            npcArray[key].npcTravel();
            npcArray[key].sellProducts();
        }
    };

    this.manageCity = function() {
        for(var key in citiesArray) {
            citiesArray[key].consumeStock();
            citiesArray[key].replaceStock();
        }
    };




}
