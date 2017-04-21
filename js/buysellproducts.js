function BuySell() {
    var _buysell = this;
    var counter = 0;
    var backpack_products = [];
    var product_val_key = $('#products_Select :selected').val();
    var current_location = null;
    var player_money = 1000;// make this number call a setvalue in  a difficulty class

    this.buyCityProduct = function(callback) {
        $('#product_Buy_Btn').on('click', function(event) {
            event.preventDefault();

            current_location = player.getPlayerLocation();
            player_money = player.getPlayerMoney();
            product_val_key = _buysell.getProductKey();
            backpack_products = [];

            buysell.promptPlayer(function(productAmmount) {
                var stock_Price = _buysell.getProductStockPrice(current_location, product_val_key);

                if (_buysell.continueTransaction(productAmmount, current_location, product_val_key)) {
                    _buysell.createBackpackList(current_location, product_val_key, productAmmount, counter);
                    _buysell.deductMoney(player_money, stock_Price, productAmmount);
                    _buysell.updateCityStock(current_location, product_val_key, productAmmount);
                    _buysell.displayPlayerMoney(player_money);
                    player.setPlayerMoney(player_money);
                }

            });
            callback(current_location);
        });
    };

    this.createBackpackList = function(current_location, product_val_key, productAmmount, i) {
        backpack_products.push('<option>' + citiesArray[current_location].getStockArrayName(product_val_key) + ":" + productAmmount + '</option>');
        $('#product' + i).html(backpack_products.join('\n'));
        counter = i + 1;
    };

    this.continueTransaction = function(productAmmount, current_location, product_val_key) {
        if (productAmmount < citiesArray[current_location].getStockAmount(product_val_key)) {
            return true;
        }
    };

    this.promptPlayer = function(callback) {
        var productAmmount = prompt("Please select amount", 0);
        callback(productAmmount);
    };

    this.deductMoney = function(money, price, productAmmount) {
        player_money = money - (price * productAmmount);
    };

    this.displayPlayerMoney = function(money) {
        $('#player_Money_Display').html(money);
    };

    this.getProductStockPrice = function(current_location, product_val_key) {
        var price = citiesArray[current_location].getStockPrice(product_val_key);
        return price;
    };

    this.getProductKey = function() {
        return $('#products_Select :selected').val();
    };

    this.updateCityStock = function(current_location, product_val_key, productAmmount) {
        citiesArray[current_location].buyStock(product_val_key, productAmmount);
        citiesArray[current_location].stockUpProducts();
    };
}
