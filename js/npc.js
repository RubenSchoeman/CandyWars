function NPC(npc_name, local) {
    var name = npc_name;
    var health = 100;
    var speed = 1;
    var level = 1;
    var weapon = "Bare Fist";
    var current_location = local;
    var new_units_key = 0;
    var travel_to_key = 0;
    var units_key = 0;
    var products = [];
    var location_key = 0;
    var previous_location = 0;

    this.buyCheapStock = function() {
        var products_ammount = 0;
        var most_units_ammount = 0;
        var buy_ammount = 0;
        previous_location = location_key;

        for(var i = 0; i < 15; i++) {
            var city = citiesArray[i].getName();
            if (city === current_location) {
                location_key = i;
            }
        }

        for(var j = 0; j < 15; j++) {
            products_ammount = citiesArray[location_key].getStockAmount(j);

            if(products_ammount > most_units_ammount) {
                most_units_ammount = products_ammount;
                units_key = j;
            }
        }

        buy_ammount =  Math.floor(most_units_ammount / 2);
        citiesArray[location_key].buyStock(units_key, buy_ammount);
        engine.stockUpCityProducts(location_key);
        products.push(citiesArray[location_key].getStockArrayName(units_key), buy_ammount);
    };

    this.npcTravel = function() {
        var products_ammount = 0;
        var least_Units = citiesArray[0].getStockAmount(units_key);
        var sell_Ammount = 0;

        for(var key in citiesArray) {
            products_ammount = citiesArray[key].getStockAmount(units_key);

            if(products_ammount < least_Units) {
                least_Units = products_ammount;
                travel_to_key = key;
            }
        }
        current_location = citiesArray[travel_to_key].getName();
    };

    this.sellProducts = function() {

        for (var i = 0; i < 15; i++) {
            if (citiesArray[travel_to_key].getStockArrayName(i) === products[0]) {
                new_units_key = i;
            }
        }

        citiesArray[travel_to_key].sellStock(new_units_key, products[1]);
        engine.stockUpCityProducts(travel_to_key);
        products = [];
        citiesArray[location_key].setRooms(name);
        citiesArray[previous_location].removeFromRoom(name);
    };

    this.getProducts = function() {
        return products;
    };

    this.getLocation = function() {
        return  current_location;
    };

    this.getName = function() {
        return name;
    };
}
