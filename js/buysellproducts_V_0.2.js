function BuySellProducts() {
    var _buysellproducts = this;
    var counter = 0;
    var backpack_products = [];
    var product_Val_Key = $('#products_Select :selected').val();
    var current_Location = null;
    var player_Money = 1000;// make this number call a setvalue in  a difficulty class

    this.buyCityProduct = function(callback) {
        $('#product_Buy_Btn').on('click', function(event) {
            event.preventDefault();

            a = player.getPlayerLocation();
            b = player.getPlayerMoney();
            c = _buysellproducts.getProductKey();
            backpack_products = [];

            buysellproducts.promptPlayer(function(d) {
                var stock_Price = _buysellproducts.getProductStockPrice(a, c);

                if (_buysellproducts.continueTransaction(d, a, c)) {
                    _buysellproducts.createBackpackList(a, c, d, counter);
                    _buysellproducts.deductMoney(b, stock_Price, d);
                    _buysellproducts.displayPlayerMoney(b);
                    player.setPlayerMoney(b);
                }

            });
            callback(current_Location);
        });
    };

    this.createBackpackList = function(current_Location, product_Val_Key, product_Ammount, counter) {
        backpack_products.push('<option>' + citiesArray[current_Location].getStockArrayName(product_Val_Key) + ":" + product_Ammount + '</option>');
        $('#product' + counter).html(backpack_products.join('\n'));
        counter = counter + 1;
    };

    this.continueTransaction = function(product_Ammount, current_Location, product_Val_Key) {
        if (product_Ammount < citiesArray[current_Location].getStockAmount(product_Val_Key)) {
            return true;
        }
    };

    this.promptPlayer = function(callback) {
        var product_Ammount = prompt("Please select amount", 0);
        callback(product_Ammount);
    };

    this.deductMoney = function(player_Money, stock_Price, product_Ammount) {
        player_Money = player_Money - (stock_Price * product_Ammount);
    };

    this.displayPlayerMoney = function(player_Money) {
        $('#player_Money_Display').html(player_Money);
    };

    this.getProductStockPrice = function(current_Location, product_Val_Key) {
        var price = citiesArray[current_Location].getStockPrice(product_Val_Key);
        return price;
    };

    this.getProductKey = function() {
        return $('#products_Select :selected').val();
    };
}
