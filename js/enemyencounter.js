/*
*   This functions main purpouse will be to check if there is an enemy encounter
*   when the player travels to or stays in a location.
*   It will also deal with the fighting and setting of vars that is related to the players and
*   npc's
*
*   To do list:
    Create a function that check if a player and npc occupies the same location.
        pass a value throught as param?
            maby create an array with names whenever player or npc is in location

    create a function that creates an instance of battle
    create a function that handles the the player choice in battle
    creates a function that checks weapons used in battle.
    create a function that handles the damage dealt.
*/

function Encounter() {

    var _encounter = this;

    this.checkRooms = function(location) {
        var rooms = citiesArray[location].getRooms();
        var rooms_occupied = rooms.length;
        var enemy_number = rooms_occupied - 1;
        var victory = true;

        if (rooms_occupied > 1) {
            $('#results_table').html('<h3>You have encountered ' + enemy_number + ' enemy/s</h3>');
            return true;
        } else {
            $('#results_table').html('');
            return false;
        }
    };

    this.playerHasWeapon = function() {
        return false;
    };

    this.playerSurrender = function() {
        return false;
    };

    this.playerCanBribe = function() {
        return false;
    };

    this.run = function() {
        $('#run').on('click', function(event) {
            event.preventDefault();
            var enemy_array = citiesArray[player.getPlayerLocation()].getRooms();
            var enemy_number = parseInt(enemy_array.length) - 1;
            var got_away = false;
            var chance = engine.getRandomInt(0, 10);
            var enemy_damage = engine.getEnemyDamage();
            var player_health = player.getPlayerHealth();

//  Remember to add armour display and reduction if available
            if(chance <= 5) {
                $('#results_table').html('<h3>You have managed to escape</h3>');
                engine.setBtnSuccess();

            } else {
                var display_player_health = player_health - enemy_damage;
                $('#results_table').html('<h3>You are still being chased by ' + enemy_number + ' enemy/s and have taken ' + enemy_damage + ' damage. Player Health: ' + display_player_health + '</h3>');
                player.setPlayerHealth(display_player_health);
                player.getPlayerDisplayHealth(display_player_health);
                player.managePlayerHealthBar();
            }
        });

    };

//this function removes all items from players backpack
    this.surrender = function() {
        $('#surrender').on('click', function(event) {
            event.preventDefault();
            engine.getPlayerBackpackArray(function(temp_array) {
                var counter = 0;

                if(temp_array.length !== 0) {
                    $('#results_table').html('<h3>You have surrendered and lost all your products</h3>');

                    engine.setBtnSuccess();
                    engine.resetPlayerBackpack();

                    for(var key in temp_array) {
                        $('#product' + counter).html("");
                        counter += 1;
                    }
                } else {
                    $('#results_table').html('<h3>They see you have nothing and leave you be</h3>');
                    engine.setBtnSuccess();
                }
            });
        });
    };

    this.bribe = function() {
        $('#bribe').on('click', function(event) {
            event.preventDefault();
            var player_money = player.getPlayerMoney();

            if(player_money < 1000) {
                $('#bribe').prop('disabled', true);
                $('#results_table').html('<h3>You do not have enough money to bribe people</h3>');
            } else {
                engine.getPlayerBackpackArray(function(temp_array) {
                    var test = 0;
                    if(temp_array.length !== 0) {
                        player_money = player_money / 2;
                        player.setPlayerMoney(player_money);
                        $('#player_Money_Display').html(player_money);
                        $('#results_table').html('<h3>The enemy smiles and takes half your money</h3>');
                        engine.setBtnSuccess();

                    } else {
                        $('#bribe').prop('disabled', true);
                        $('#results_table').html('<h3>Dont bribe them if you have nothing</h3>');
                    }
                });
            }
        });
    };

    this.victory = function(result) {
        victory = result;
        return victory;
    };

    this.encounterBegin = function(location) {
        var day_counter = engine.getDayCounter();
        if(day_counter > 3) {
            if(_encounter.checkRooms(location)){
                engine.setEncounterBtn();
            }
        }
    };
}
