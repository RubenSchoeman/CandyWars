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
            product_wanted_string = _buysell.getProductWantedString();
            needed_stock = citiesArray[current_location].makeLowStockArray();
            var string = "";
            var i = 0;
            var char = product_wanted_string[0];
            var name_String =  "";
            var have_Amount = 0;
            var backpack_key = 0;

            while(char !== ":"){
                string = string + char;
                i = i + 1;
                char = product_wanted_string[i];
            }

            var product_wanted_key = engine.getCandyKey(string);
            var stock_Price = _buysell.getProductStockPrice(current_location, product_wanted_key);

            _buysell.promptPlayerSell(function(sell_Ammount) {

                for (var obj in backpack_use) {
                    name_String = _buysell.getProductString(obj);
                    have_Amount = _buysell.getBackpackAmmount(obj);

                    if(string === name_String && have_Amount >= sell_Ammount) {
                        have_Amount =  have_Amount - sell_Ammount;
                        player_money = player_money + (sell_Ammount * stock_Price);
                        _buysell.displayPlayerMoney(player_money);
                        player.setPlayerMoney(player_money);
                        console.log(backpack_use);
                        if (have_Amount === 0) {
                            backpack_key = _buysell.removeFromBackpackList(backpack_use, string);
                            backpack_use.splice(backpack_key, 1);
                            console.log(backpack_use);
                            $('#results_table').html("you have sold something");
                        } else {

                            console.log("return false");
                        }
                    } else {
                        $('#results_table').html("You do not have that amount or this city does not need the item");
                    }
                }
            });

            callback(current_location);
        });
    };

    this.createBackpackList = function(current_location, product_val_key, productAmmount, i, stock_Price) {
        backpack_products.push('<option>' + citiesArray[current_location].getStockArrayName(product_val_key) + ":" + productAmmount + '</option>');
        backpack_use.push([candyArray[product_val_key].getName(),productAmmount, stock_Price , product_val_key, counter]);
        $('#product' + i).html(backpack_products.join('\n'));
        counter = i + 1;
    };

    this.removeFromBackpackList = function(backpack_use, string) {
        counter = 0;
        var backpack_Key = 0;

        for (var unit in backpack_use) {
            if(string !== backpack_use[unit][0]) {
                //new_backpack.push('<option>' + backpack_use[unit][0] + ":" + backpack_use[unit][1] + '</option>');
                $('#product' + counter).html('<option>' + backpack_use[unit][0] + ":" + backpack_use[unit][1] + '</option>');
                counter += 1;
            } else if (string === backpack_use[unit][0]) {
                $('#product' + counter).html("");
                backpack_key = counter;
            }
        }
        $('#product' + counter).html("");
        return backpack_key;
    };

    this.continueTransaction = function(productAmmount, current_location, product_val_key) {
        if (productAmmount < citiesArray[current_location].getStockAmount(product_val_key) && productAmmount !== 0) {
            return true;
        }
    };

    this.getProductString = function(obj) {
        name_String = backpack_use[obj][0];
        return name_String;
    };

    this.getBackpackAmmount = function(backpack_ammount) {
        have_Amount = backpack_use[backpack_ammount][1];
        return have_Amount;
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

    this.getProductWantedString = function() {
        return $('#products_Wanted :selected').val();
    };

    this.updateCityStock = function(current_location, product_val_key, productAmmount) {
        citiesArray[current_location].buyStock(product_val_key, productAmmount);
        citiesArray[current_location].stockUpProducts();
    };
}
