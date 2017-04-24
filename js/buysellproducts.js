/*
*
*   This class instance is created in main.js
*
*/

function BuySell() {
    var _buysell = this;
    var counter = 0;
    var backpack_products = [];
    var backpack_use = [];
    var needed_stock = [];
    var product_val_key = $('#products_Select :selected').val();
    var product_sell_string = "";
    var current_location = 0;
    var player_money = 1000;// make this number call a setvalue in  a difficulty class


/*
*   This function (buyCityProduct) handles the product buy button on click event:
*   prompts player for amount
*   checks if transaction may continue
*   creates a list of products in the backpack
*   updates money of player and product amounts for display
*   callback is used in main.js to manage the economy
*/

    this.buyCityProduct = function(callback) {
        $('#product_Buy_Btn').on('click', function(event) {
            event.preventDefault();

            current_location = player.getPlayerLocation();
            player_money = player.getPlayerMoney();
            product_val_key = _buysell.getProductBuyKey();
            backpack_products = [];


            _buysell.promptPlayerBuy(function(productAmmount) {
                var stock_Price = _buysell.getProductStockPrice(current_location, product_val_key);

                if (_buysell.continueTransaction(productAmmount, current_location, product_val_key)) {
                    _buysell.createBackpackList(current_location, product_val_key, productAmmount, counter, stock_Price);
                    _buysell.deductMoney(player_money, stock_Price, productAmmount);
                    _buysell.updateCityStock(current_location, product_val_key, productAmmount);
                    _buysell.displayPlayerMoney(player_money);
                    player.setPlayerMoney(player_money);
                }

            });
            callback(current_location);
        });
    };

    this.sellCityProducts = function(callback) {
        $('#product_Sell_Btn').on('click', function(event) {
            event.preventDefault();
            current_location = player.getPlayerLocation();
            player_money = player.getPlayerMoney();
            product_wanted_string = _buysell.getProductWantedKey();
            needed_stock = citiesArray[current_location].makeLowStockArray();
            var string = "";
            var i = 0;
            var char = product_wanted_string[0];

            while(char !== ":"){
                string = string + char;
                i = i + 1;
                char = product_wanted_string[i];
            }

            _buysell.promptPlayerSell(function(sell_Ammount) {

                for (var obj in backpack_use) {

                    if(string === _buysell.getProductString(obj) && sell_Ammount <= _buysell.getBackpackAmmount(obj)) {
                        if (_buysell.getBackpackAmmount(obj) === 0) {
                            backpack_use.pop([obj]);
                        } else {
                            
                        }


                    }
                }
            });

            callback(current_location);
        });
    };

    this.createBackpackList = function(current_location, product_val_key, productAmmount, i, stock_Price) {
        backpack_products.push('<option>' + citiesArray[current_location].getStockArrayName(product_val_key) + ":" + productAmmount + '</option>');
        backpack_use.push([candyArray[product_val_key].getName(),productAmmount, stock_Price]);
        $('#product' + i).html(backpack_products.join('\n'));
        counter = i + 1;
    };

    this.continueTransaction = function(productAmmount, current_location, product_val_key) {
        if (productAmmount < citiesArray[current_location].getStockAmount(product_val_key) && productAmmount !== 0) {
            return true;
        }
    };

    this.getProductString = function(obj) {
        var name_String = backpack_use[obj][0];
        return name_String;
    };

    this.getBackpackAmmount = function(backpack_ammount) {
        var chosen_amount = backpack_use[backpack_ammount][1];
        return chosen_amount;
    };

    this.promptPlayerBuy = function(callback) {
        var productAmmount = prompt("Please select amount");
        callback(productAmmount);
    };

    this.promptPlayerSell = function(callback) {
        var sell_Ammount = prompt("Please select amount to sell");
        callback(sell_Ammount);
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

    this.getProductBuyKey = function() {
        return $('#products_Select :selected').val();
    };

    this.getProductWantedKey = function() {
        return $('#products_Wanted :selected').val();
    };

    this.updateCityStock = function(current_location, product_val_key, productAmmount) {
        citiesArray[current_location].buyStock(product_val_key, productAmmount);
        citiesArray[current_location].stockUpProducts();
    };
}
