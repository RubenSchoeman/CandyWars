function BuySell() {
    var _buysell = this;
    var counter = 0;
    var backpack_products = [];
    var product_Val_Key = $('#products_Select :selected').val();
    var current_Location = null;
    var player_Money = 1000;// make this number call a setvalue in  a difficulty class

    this.buyCityProduct = function(callback) {
        $('#product_Buy_Btn').on('click', function(event) {
            event.preventDefault();

            current_Location = player.getPlayerLocation();
            player_Money = player.getPlayerMoney();
            product_Val_Key = _buysell.getProductKey();
            backpack_products = [];

            buysell.promptPlayer(function(product_Ammount) {
                var stock_Price = _buysell.getProductStockPrice(current_Location, product_Val_Key);

                if (_buysell.continueTransaction(product_Ammount, current_Location, product_Val_Key)) {
                    _buysell.createBackpackList(current_Location, product_Val_Key, product_Ammount, counter);
                    _buysell.deductMoney(player_Money, stock_Price, product_Ammount);
                    _buysell.updateCityStock(current_Location, product_Val_Key, product_Ammount);
                    _buysell.displayPlayerMoney(player_Money);
                    player.setPlayerMoney(player_Money);
                }

            });
            callback(current_Location);
        });
    };

    this.createBackpackList = function(city, key, amount, i) {
        backpack_products.push('<option>' + citiesArray[city].getStockArrayName(key) + ":" + amount + '</option>');
        $('#product' + i).html(backpack_products.join('\n'));
        counter = i + 1;
    };

    this.continueTransaction = function(amount, city, value) {
        if (amount < citiesArray[city].getStockAmount(value)) {
            return true;
        }
    };

    this.promptPlayer = function(callback) {
        var product_Ammount = prompt("Please select amount", 0);
        callback(product_Ammount);
    };

    this.deductMoney = function(money, price, amount) {
        player_Money = money - (price * amount);
    };

    this.displayPlayerMoney = function(money) {
        $('#player_Money_Display').html(money);
    };

    this.getProductStockPrice = function(city, key) {
        var price = citiesArray[city].getStockPrice(key);
        return price;
    };

    this.getProductKey = function() {
        return $('#products_Select :selected').val();
    };

    this.updateCityStock = function(city, key, amount) {
        citiesArray[city].buyStock(key, amount);
        citiesArray[city].stockUpProducts();
    };
}
