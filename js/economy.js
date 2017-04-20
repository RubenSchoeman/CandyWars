function Economy() {

    this.updateEconomy = function(location) {
        var stock = [];

        for(var key in citiesArray){
            stock = citiesArray[key].getStockArray();

            for(var parm in stock){
                var price = citiesArray[key].getStockPrice(parm);
                var amount = citiesArray[key].getStockAmount(parm);
                var manDiff = candyArray[parm].getCandyManufacturingDiff();
                var wanted =  candyArray[parm].getWantedLevel();
                if(amount < 20 && price < 2000){
                    price = Math.ceil(price * (wanted / 2) * (manDiff / 2));
                } else if (amount > 50) {
                    price = 10 * wanted * manDiff;
                } else if (amount === 0 && price < 2000) {
                    price = price * wanted * manDiff;
                }

                citiesArray[key].setStockPrice(parm, price);

            }
        }

        citiesArray[location].stockUpProducts();
    };
}
