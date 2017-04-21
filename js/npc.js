function NPC(npc_Name, local) {
    var name = npc_Name;
    var health = 100;
    var speed = 1;
    var level = 1;
    var weapon = "Bare Fist";
    var current_Location = local;
    var new_Units_Key = 0;
    var travel_To_Key = 0;
    var units_Key = 0;
    var products = [];
    var location_Key = null;

    this.buyCheapStock = function() {
        var products_Ammount = 0;
        var most_Units_Ammount = 0;
        var buy_Ammount = 0;

        for(var i = 0; i < 15; i++) {
            var city = citiesArray[i].getName();
            if (city === current_Location) {
                location_Key = i;
            }
        }

        for(var j = 0; j < 15; j++) {
            products_Ammount = citiesArray[location_Key].getStockAmount(j);

            if(products_Ammount > most_Units_Ammount) {
                most_Units_Ammount = products_Ammount;
                units_Key = j;
            }
        }

        buy_Ammount =  Math.floor(most_Units_Ammount / 2);
        citiesArray[location_Key].buyStock(units_Key, buy_Ammount);
        //add stockUpProducts function
        products.push(citiesArray[location_Key].getStockArrayName(units_Key), buy_Ammount);
    };

    this.npcTravel = function() {
        var products_Ammount = 0;
        var least_Units = citiesArray[0].getStockAmount(units_Key);
        var sell_Ammount = 0;

        for(var key in citiesArray) {
            products_Ammount = citiesArray[key].getStockAmount(units_Key);

            if(products_Ammount < least_Units) {
                least_Units = products_Ammount;
                travel_To_Key = key;
            }
        }
        current_Location = citiesArray[travel_To_Key].getName();
    };

    this.sellProducts = function() {

        for (var i = 0; i < 15; i++) {
            if (citiesArray[travel_To_Key].getStockArrayName(i) === products[0]) {
                new_Units_Key = i;
            }
        }

        citiesArray[travel_To_Key].sellStock(new_Units_Key, products[1]);
        //add stockUpProducts function.
        products = [];
    };

    this.getProducts = function() {
        return products;
    };

    this.getLocation = function() {
        return  current_Location;
    };

    this.getName = function() {
        return name;
    };
}
