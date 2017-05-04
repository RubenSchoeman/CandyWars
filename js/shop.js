function Shop() {
    var _shop = this;
    var counter = 0;
    var backpack_weapons = [];
    var backpack_array = [];

    this.buyItem = function() {
        $('#shop_buy').on('click', function() {
            var weapon_name = _shop.createString($('#shop_Weapons :selected').val());
            var ammmo_item = _shop.isAmmoOrItem(weapon_name);//give var ammo_item better name

            if(_shop.continueTransaction(weapon_name, ammmo_item)) {

                if(ammmo_item === "item") {
                    if(_shop.manageItems(weapon_name)) {
                        _shop.managePlayerMoney(weapon_name, ammmo_item);
                    }
                } else if(ammmo_item === "ammo") {

                    if(_shop.hasWeapon(weapon_name)) {
                        var ammo_amount = parseInt(prompt("Please select amount to buy"));

                        if(_shop.continueTransaction(weapon_name, ammmo_item, ammo_amount)) {
                            _shop.manageAmmo(weapon_name, ammo_amount);
                            _shop.managePlayerMoney(weapon_name, ammmo_item, ammo_amount);
                            _shop.addAmmoToWeaponsDisplay();
                        } else {
                            $('#results_table').html('<h3>You do not have enough money for that amount</h3>');
                        }

                    } else {
                        $('#results_table').html('<h3>You do not have a weapon that takes this ammo</h3>');
                    }

                } else {
                    _shop.createWeaponList(weapon_name, _shop.checkAmmoRequired(weapon_name), counter);
                    _shop.managePlayerMoney(weapon_name, ammmo_item);
                }
            } else {
                $('#results_table').html('<h3>You do not have enough money</h3>');
            }
        });
    };

    this.sellItem = function() {
        $('#shop_sell').on('click', function() {
            var weapon_key = _shop.createString($('#weapons_Select :selected').val());
            var ammmo_or_item = _shop.isAmmoOrItem(weapon_key);
            var item_price = (_shop.getItemPrice(weapon_key, ammmo_or_item)) / 2;
            var player_money = player.getPlayerMoney();
            var key = _shop.getSpliceKey(weapon_key);

            player_money = player_money + item_price;
            player.setPlayerMoney(player_money);
            $('#player_Money_Display').html(player_money);

            console.log(backpack_array);
            backpack_array.splice(key, 1);
            _shop.addAmmoToWeaponsDisplay();
            console.log(backpack_array);
        });
    };

    this.manageItems = function(weapon_name) {
        var player_health = player.getPlayerHealth();

        if(weapon_name === "Leather Jacket"){
            if(player_health !== 150) {
                player_health = player_health + 50;

                if(player_health > 150) {
                    player_health = 150;
                }
                player.setPlayerHealth(player_health);
                player.getPlayerDisplayHealth(player_health);
                player.managePlayerHealthBar();
                if(player_health > 100) {
                    player.setPlayerArmour(true);
                }
                return true;
            } else {
                $('#results_table').html('<h3>Your already have a new leather jacket</h3>');
                return false;
            }
        } else if(weapon_name === "Dog Poop") {

        } else {
            if(player_health !== 100) {
                player_health = player_health + 25;

                if(player_health > 100) {
                    player_health = 100;
                }
//  Find a way to make this three functions one function
                player.setPlayerHealth(player_health);
                player.getPlayerDisplayHealth(player_health);
                player.managePlayerHealthBar();
                return true;
            } else {
                $('#results_table').html('<h3>Your health is aleady full</h3>');
                return false;
            }
        }
    };

    this.getSpliceKey = function(weapon_key) {
        var weaponkey = 0;
        counter = 0;

        for(var key in backpack_array) {
            var weapon = backpack_array[key][0];

            if(weapon === weapon_key) {
                weaponkey = counter;
            }
            counter += 1;
        }

        return weaponkey;
    };

    this.continueTransaction = function(weapon_name, ammmo_item, ammo_amount) {
        var player_money = player.getPlayerMoney();
        var item_price = _shop.getItemPrice(weapon_name, ammmo_item, ammo_amount);

        if(player_money < item_price) {
            return false;
        } else {
            return true;
        }
    };

    this.getItemPrice = function(weapon_name, ammmo_item, ammo_amount) {
        var weapon_price = 0;
        if(ammmo_item === "weapon") {
            for(var key in weaponsArray) {
                var weapon = weaponsArray[key].getName();

                if(weapon === weapon_name) {
                    weapon_price = weaponsArray[key].getPrice();
                }
            }
        } else if(ammmo_item === "item") {
            for(var obj in itemsArray) {
                var item = itemsArray[obj].getName();

                if(item === weapon_name) {
                    weapon_price = itemsArray[obj].getPrice();
                }
            }
        } else {
            for(var i in ammoArray) {
                var ammo = ammoArray[i].getName();

                if(ammo === weapon_name) {
                    weapon_price = ammoArray[i].getPrice() * ammo_amount;
                }
            }
        }

        return weapon_price;
    };

//this function is used in buysellproducts make one function
    this.createString = function(weapon_key) {
        var string = "";
        var i = 0;
        var char = weapon_key[0];

        while(char !== ":"){
            string = string + char;
            i = i + 1;
            char = weapon_key[i];
        }
        return string;
    };

//this function is used in buysellproducts make one function
    this.createWeaponList = function(weapon_name, ammo, i) {
        backpack_array.push([weapon_name, ammo, counter]);
        backpack_weapons.push('<option>' + weapon_name + ":" + ammo + '</option>');
        $('#weapons_Select').html(backpack_weapons.join('\n'));
        counter = i + 1;
    };

    this.addAmmoToWeaponsDisplay = function() {
        backpack_weapons = [];
        for(var item in backpack_array) {
            backpack_weapons.push('<option>' + backpack_array[item][0] + ":" + backpack_array[item][1] + '</option>');
        }

        $('#weapons_Select').html(backpack_weapons.join('\n'));
    };

    this.checkAmmoRequired = function(weapon_name) {
        var weapon_array = weaponsArray;

        for(var key in weapon_array) {
            var name = weapon_array[key].getName();

            if(name === weapon_name) {
                return weapon_array[key].getAmmo();
            }
        }
    };

    this.hasWeapon = function(weapon_name) {
        var new_name = engine.weaponName(weapon_name);

        for(var key in backpack_array) {
            var check = backpack_array[key][0];
            if(check === new_name) {
                return true;
            }
        }
        return false;
    };

    this.manageAmmo = function(weapon_name, ammo_amount) {
        var new_name = engine.weaponName(weapon_name);
        var set_ammo = 0;
        var backpack_key = 0;

        if(isNaN(ammo_amount)) {
            ammo_amount = 0;
        }

        for(var key in weaponsArray) {
            var weapon = weaponsArray[key].getName();

            if(weapon === new_name) {
                weaponsArray[key].addAmmo(ammo_amount);
                set_ammo = weaponsArray[key].getAmmo();
            }
        }

        for(var i in backpack_array) {
            var get_name = backpack_array[i][0];
            if(get_name === new_name) {
                backpack_array[i][1] = set_ammo;
            }
        }
    };

    this.managePlayerMoney = function(weapon_name, ammmo_item, ammo_amount) {
        var player_money = player.getPlayerMoney();
        var weapon_price = 0;

        if(ammmo_item === "weapon") {
            for(var key in weaponsArray) {
                var weapon = weaponsArray[key].getName();

                if(weapon === weapon_name) {
                    weapon_price = weaponsArray[key].getPrice();
                }
            }
        } else if(ammmo_item === "item") {
            for(var obj in itemsArray) {
                var item = itemsArray[obj].getName();

                if(item === weapon_name) {
                    weapon_price = itemsArray[obj].getPrice();
                }
            }
        } else {
            for(var i in ammoArray) {
                var ammo = ammoArray[i].getName();

                if(ammo === weapon_name) {
                    weapon_price = ammoArray[i].getPrice() * ammo_amount;
                }
            }
        }


        player_money = player_money - weapon_price;
        player.setPlayerMoney(player_money);
        $('#player_Money_Display').html(player_money);
    };

    this.isAmmoOrItem = function(weapon_name) {
        var unit = "";
        switch (weapon_name) {
            case "Leather Jacket":
                    unit = "item";
                break;
            case "Dog Poop":
                    unit = "item";
                break;
            case "Health Kit":
                    unit = "item";
                break;
            case "Water P Ammo":
                    unit = "ammo";
                break;
            case "Nerf Ammo":
                    unit = "ammo";
                break;
            case "BB Ammo":
                    unit = "ammo";
                break;
            case "Paintball Ammo":
                    unit = "ammo";
                break;
            default:
                unit = "weapon";
        }
        return unit;
    };


}
