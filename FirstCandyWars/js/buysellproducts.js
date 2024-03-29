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
*   callback is used in main.js to manage the economy(might be unnecessary)
*
*   still need to implement a change that stops the player from buying more items than
*   he can afford
*/

    this.buyCityProduct = function(callback) {
        $('#product_Buy_Btn').on('click', function(event) {
            event.preventDefault();

            current_location = player.getPlayerLocation();
            player_money = player.getPlayerMoney();
            product_val_key = _buysell.getProductBuyKey();
            //backpack_products = [];

            _buysell.promptPlayerBuy(function(productAmmount) {
                var stock_price = _buysell.getProductStockPrice(current_location, product_val_key);
                var isTrue = productAmmount;

                if (_buysell.continueTransaction(productAmmount, current_location, product_val_key, stock_price, player_money, isTrue)) {
                    _buysell.createBackpackList(current_location, product_val_key, productAmmount, counter);
                    _buysell.deductMoney(player_money, stock_price, productAmmount);
                    _buysell.buyCityStock(current_location, product_val_key, productAmmount);
                    _buysell.displayPlayerMoney(player_money);
                    player.setPlayerMoney(player_money);
                    engine.checkCityStock(current_location);
                }

            });
            callback(current_location);
        });
    };

/*
*   This function (sellCityProduct) handles the product sell button on click event:
*
*   callback is used in main.js to manage the economy(might be unnecessary)
*/
    this.sellCityProducts = function(callback) {
        $('#product_Sell_Btn').on('click', function(event) {
            event.preventDefault();

            current_location = player.getPlayerLocation();
            player_money = player.getPlayerMoney();
            product_selected_string = _buysell.getProductWantedString();
            needed_stock = citiesArray[current_location].makeLowStockArray();

            var string = _buysell.createString(product_selected_string);
            var product_wanted_key = engine.getCandyKey(string);
            var stock_Price = _buysell.getProductStockPrice(current_location, product_wanted_key);

            _buysell.promptPlayerSell(function(sell_Ammount) {

                for (var obj in backpack_use) {
                    name_String = _buysell.getProductString(obj);
                    have_Amount = _buysell.getBackpackAmmount(obj);

                    if(string === name_String && have_Amount >= sell_Ammount) {
                        have_Amount =  have_Amount - sell_Ammount;
                        player_money = player_money + (sell_Ammount * stock_Price);

                        _buysell.removeAmountFromBackpack(backpack_use, string, sell_Ammount);
                        _buysell.sellCityStock(current_location, product_wanted_key, sell_Ammount);
                        _buysell.displayPlayerMoney(player_money);
                        player.setPlayerMoney(player_money);
                        engine.checkCityStock(current_location);

                        if (have_Amount === 0) {
                            _buysell.removeFromBackpackList(string);
                            $('#results_table').html("<h3>You have sold all your " + string + "</h3>");
                        }
                    } else if(string === name_String && have_Amount < sell_Ammount) {
                        $('#results_table').html("<h3>You do not have that amount of products</h3>");
                    }
                }
            });

            callback(current_location);
        });
    };

/*
*   all the function below are used withing the buy and sell function above
*
*/
    this.createBackpackList = function(current_location, product_val_key, productAmmount, i) {
        var candy_type = candyArray[product_val_key].getName();
        var candy_is_in_array = false;

        for(var key in backpack_use) {
            var name = backpack_use[key][0];

            if(name === candy_type) {
                candy_is_in_array = true;
                backpack_use[key][1] = backpack_use[key][1] + productAmmount;
            }
        }


        if(candy_is_in_array) {
            backpack_products = [];


            for(var item in backpack_use) {
                backpack_products.push('<option>' + backpack_use[item][0] + ":" + backpack_use[item][1] + '</option>');
            }

            $('#product_Select').html(backpack_products.join('\n'));
        } else {
            backpack_use.push([candy_type, productAmmount, product_val_key, counter]);
            backpack_products.push('<option>' + citiesArray[current_location].getStockArrayName(product_val_key) + ":" + productAmmount + '</option>');
            $('#product_Select').html(backpack_products.join('\n'));
            counter = i + 1;
        }
    };

    this.resetBackpacks = function() {
        backpack_products = [];
        backpack_use = [];

        $('#product_Select').html(backpack_products.join('\n'));
    };

    this.removeFromBackpackList = function(string) {
        counter = 0;
        var backpack_Key = 0;
        backpack_products = [];

        for (var unit in backpack_use) {
            var test = backpack_use[unit][0];
            if(string !== backpack_use[unit][0]) {
                counter += 1;
            } else if (string === backpack_use[unit][0]) {
                backpack_key = counter;
            }
        }

        backpack_use.splice(backpack_key, 1);

        for(var item in backpack_use) {
            backpack_products.push('<option>' + backpack_use[item][0] + ":" + backpack_use[item][1] + '</option>');
        }

        $('#product_Select').html(backpack_products.join('\n'));
    };

    this.getBackpackArray = function(callback) {
        callback(backpack_use);
    };

    this.createString = function(product_wanted_string) {
        string = "";
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
        return string;
    };

    this.removeAmountFromBackpack = function(backpack_use, string, sell_Ammount) {
        var temp = 0;
        var backpack_Key = 0;
        backpack_products = [];

        for (var unit in backpack_use) {
            var item_name = backpack_use[unit][0];
            if(string !== item_name) {
                temp += 1;
            } else if (string === item_name) {
                backpack_Key = temp;
                backpack_use[backpack_Key][1] -= sell_Ammount;
            }
        }

        for(var item in backpack_use) {
            backpack_products.push('<option>' + backpack_use[item][0] + ":" + backpack_use[item][1] + '</option>');
        }

        $('#product_Select').html(backpack_products.join('\n'));
    };

    this.continueTransaction = function(productAmmount, current_location, product_val_key, stock_price, player_money, isTrue) {
        var total = productAmmount * stock_price;

        if((isTrue >= 0) && (typeof isTrue !== 'boolean')) {
            isTrue = false;
        }

        if(player_money < total) {
            $('#results_table').html("<h3>You do not have enough money for that amount</h3>");
            return false;
        } else if (productAmmount <= citiesArray[current_location].getStockAmount(product_val_key) && productAmmount !== 0 && !isTrue) {
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


//  this function should only return a number
    this.promptPlayerBuy = function(callback) {
        var productAmmount = parseInt(prompt("Please select amount to buy"));
        if(isNaN(productAmmount)){
            callback(true);
        } else {
            callback(productAmmount);
        }
    };

    this.promptPlayerSell = function(callback) {
        var sell_Ammount = parseInt(prompt("Please select amount to sell"));
        callback(sell_Ammount);
    };

    this.deductMoney = function(money, stock_price, productAmmount) {
        player_money = money - (stock_price * productAmmount);
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

    this.buyCityStock = function(current_location, product_val_key, productAmmount) {
        citiesArray[current_location].buyStock(product_val_key, productAmmount);
        citiesArray[current_location].stockUpProducts();
    };

    this.sellCityStock = function(current_location, product_wanted_key, sell_Ammount) {
        citiesArray[current_location].sellStock(product_wanted_key, parseInt(sell_Ammount));
        citiesArray[current_location].stockUpProducts();
    };
}
