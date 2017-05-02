function Engine(){
    var _engine = this;
    var location = 0;
    var day_counter = 0;

    this.countDay = function() {
        day_counter += 1;
    };

    this.getDayCounter = function() {
        return day_counter;
    };

    this.initCandyType = function(){

        for(var key in candyArray){
            candyArray[key].setWantedLevel(_engine.randomNumber());
            candyArray[key].setCandyManufacturingDiff(_engine.randomNumber());
        }
    };

    this.randomNumber = function() {
        var temp_number = Math.ceil(Math.random() * 10);

        if (temp_number === 0) {
            temp_number = temp_number + 1;
        }

        return temp_number;
    };

    this.getCandyKey = function(string) {
        var array_key = 0;
        var name = candyArray[array_key].getName();

        while(name !== string) {
            array_key += 1;
            name = candyArray[array_key].getName();
        }
        return array_key;
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

    this.initTravelCost = function() {
        for(var location in citiesArray){
            citiesArray[location].createTravelCost();
            var cost = citiesArray[location].getTravelCost();
            var loction_string = citiesArray[location].getName() ;
            $('#loc' + location).html(loction_string + " : " + cost);
        }
    };

    this.checkCanTravel = function(location) {
        var player_money = player.getPlayerMoney();
        var travel_cost = citiesArray[location].getTravelCost();

        if(player_money >= travel_cost) {
            return true;
        } else {
            return false;
        }
    };

    this.getEnemyDamage = function() {
        var player_location = player.getPlayerLocation();
        var enemy_array = citiesArray[player_location].getRooms();
        var damage = 0;
        var length = 0;

        for(var key in enemy_array) {
            var enemy = enemy_array[key];
            length += 1;

            if(enemy !== "Player") {
                for (var num in npcArray) {
                    if(enemy === npcArray[num].getName()) {
                        damage = damage + 2;
                    }
                }
            }
        }

        damage = damage * length;
        return damage;
    };

    this.setAllBtnFalse = function() {
        $('#flyTo').prop('disabled', true);
        $('#stay').prop('disabled', true);
        $('#product_Buy_Btn').prop('disabled', true);
        $('#product_Sell_Btn').prop('disabled', true);
        $('.shop-buy-btn').prop('disabled', true);
        $('.shop-sell-btn').prop('disabled', true);
        $('#run').prop('disabled', true);
        $('#surrender').prop('disabled', true);
        $('#bribe').prop('disabled', true);
    };

}
