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


//  move to engine.js and call in main.js
    this.initButtons = function() {
        $('#fight').prop('disabled', true);
        $('#run').prop('disabled', true);
        $('#surrender').prop('disabled', true);
        $('#bribe').prop('disabled', true);
    };

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

//  Move all the jquery into one function in engine.js (engine.escaped())
//  Remember to add armour display and reduction if available
            if(chance <= 5) {
                $('#results_table').html('<h3>You have managed to escape</h3>');
                $('#flyTo').prop('disabled', false);
                $('#stay').prop('disabled', false);
                $('#product_Buy_Btn').prop('disabled', false);
                $('#product_Sell_Btn').prop('disabled', false);
                $('.shop-buy-btn').prop('disabled', false);
                $('.shop-sell-btn').prop('disabled', false);
                $('#run').prop('disabled', true);
                $('#surrender').prop('disabled', true);
                $('#bribe').prop('disabled', true);

            } else {
                var display_player_health = player_health - enemy_damage;
                var set_col = player.getPlayerDisplayHealth(display_player_health);
                $('#results_table').html('<h3>You are still being chased by ' + enemy_number + ' enemy/s and have taken ' + enemy_damage + ' damage. Player Health: ' + display_player_health + '</h3>');

                player.setPlayerHealth(display_player_health);
                player.managePlayerHealthBar();
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

//  move to engine.js (engine.initEncounterBtn())
                $('#flyTo').prop('disabled', true);
                $('#stay').prop('disabled', true);
                $('#product_Buy_Btn').prop('disabled', true);
                $('#product_Sell_Btn').prop('disabled', true);
                $('.shop-buy-btn').prop('disabled', true);
                $('.shop-sell-btn').prop('disabled', true);
                $('#run').prop('disabled', false);
                $('#surrender').prop('disabled', false);
                $('#bribe').prop('disabled', false);

            }
        }
    };
}
