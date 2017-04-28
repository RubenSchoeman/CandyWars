/*
*   This class handles the economy of the game and is called several times
*   throughout the game whenever a turn is up or sales are made.
*/

function Economy() {

/**
*   @param {value} location is an int between 0 and 14 and indicates a city;
*/

    this.updateEconomy = function(location) {
        var stock = [];

        if(location === null) {
            location = 0;
        }

        for(var key in citiesArray){
            stock = citiesArray[key].getStockArray();

            for(var obj in stock){
                var price = citiesArray[key].getStockPrice(obj);

                var amount = citiesArray[key].getStockAmount(obj);
                var manDiff = candyArray[obj].getCandyManufacturingDiff();
                var wanted =  candyArray[obj].getWantedLevel();
                if(amount < 20 && price < 2000){
                    price = engine.getRandomInt(5, 1000);
                } else if (amount > 50) {
                    price = 10 * wanted * Math.ceil(manDiff / 2);
                } else if (amount <= 0) {
                    price = engine.getRandomInt(5, 10000);
                }

                citiesArray[key].setStockPrice(obj, price);

            }
        }
        engine.stockUpCityProducts(location);
    };
}
