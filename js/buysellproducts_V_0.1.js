function BuySellProducts() {
    var _buysellproducts = this;
    var counter = 0;
    var backpack_Products = [];
    var product_Val_Key = $('#products_Select :selected').val();
    var current_Location = null;
    var player_Money = 1000;// make this number call a setvalue in  a difficulty class

    this.buyCityProduct = function(callback) {
        $('#product_Buy_Btn').on('click', function(event) {
            event.preventDefault();

            current_Location = player.getPlayerLocation();
            player_Money = player.getPlayerMoney();
            product_Val_Key = _buysellproducts.getProductKey();
            backpack_Products = [];

            buysellproducts.promptPlayer(function(product_Ammount) {
                var stock_Price = _buysellproducts.getProductStockPrice(current_Location, product_Val_Key);

                if (_buysellproducts.continueTransaction(product_Ammount, current_Location, product_Val_Key)) {
                    _buysellproducts.createBackpackList(current_Location, product_Val_Key, product_Ammount, counter);
                    _buysellproducts.deductMoney(player_Money, stock_Price, product_Ammount);
                    _buysellproducts.displayPlayerMoney(player_Money);
                    player.setPlayerMoney(player_Money);
                }

            });
            callback(current_Location);
        });
    };

    this.createBackpackList = function(a, b, c, d) {
        backpack_Products.push('<option>' + citiesArray[a].getStockArrayName(b) + ":" + c + '</option>');
        $('#product' + d).html(backpack_Products.join('\n'));
        counter = d + 1;
    };

    this.continueTransaction = function(x, y, z) {
        if (x < citiesArray[y].getStockAmount(z)) {
            return true;
        }
    };

    this.promptPlayer = function(callback) {
        var product_Ammount = prompt("Please select amount", 0);
        callback(product_Ammount);
    };

    this.deductMoney = function(i, j, k) {
        player_Money = i - (j * k);
    };

    this.displayPlayerMoney = function(q) {
        $('#player_Money_Display').html(q);
    };

    this.getProductStockPrice = function(r, s) {
        var price = citiesArray[r].getStockPrice(s);
        return price;
    };

    this.getProductKey = function() {
        return $('#products_Select :selected').val();
    };
}
