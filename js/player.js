function Player() {
    var _player = this;

    var player_health = 100;
    var player_armour = 0;
    var player_damage = null;
    var player_speed = 2;
    var player_money = 1000;
    var bar_Health = 12;
    var health_Text = "Player Health";
    var armour_Text = "Player Armour";
    var player_Location = 0;

    this.managePlayerHealthBar = function() {
        $('#test').html('<div id="player_Health_Bar_Color" class="col-xs-' + _player.getPlayerDisplayHealth(_player.getPlayerHealth()) + '">' + _player.getHealthText() + '</div>');
        if(player.getHealthText() === "You be DEAD!!!") {
            $('#player_Health_Bar_Color').css('background-color', 'red');
        }
    };

    this.deductTravelCosts = function(location) {
        var travel_cost = citiesArray[location].getTravelCost();
        player_money = player_money - travel_cost;
        $('#player_Money_Display').html(player_money);
    };

    this.setPlayerHealth = function(set_health) {
        player_health = player_health - set_health;
    };

    this.setPlayerArmour = function(set_armour) {
        player_armour = set_armour;
    };

    this.setPlayerDamage = function(set_damage) {
        player_armour = set_damage;
    };

    this.setPlayerSpeed = function(set_speed) {
        player_speed = set_speed;
    };

    this.setPlayerMoney = function(set_money) {
        player_money = set_money;
    };

    this.setPlayerLocation = function(location) {
        player_Location = location;
    };

    this.getPlayerHealth = function() {
        return player_health;
    };

    this.getHealthText = function() {
        return health_Text;
    };

    this.getArmourText = function() {
        return armour_Text;
    };

    this.getPlayerArmour = function() {
        return player_armour;
    };

    this.getPlayerDamage = function() {
        return player_Damage;
    };

    this.getPlayerSpeed = function() {
        return player_speed;
    };

    this.getPlayerMoney = function() {
        return player_money;
    };

    this.getPlayerLocation = function() {
        return player_Location;
    };

    this.getPlayerDisplayHealth = function(health) {

        if (health <= 0) {
            bar_Health = 12;
            health_Text = "You be DEAD!!!";

        } else if (health <= 8) {
            bar_Health = 1;
            health_Text = "";
            $('#test').css('background-color', 'red');

        } else if (health <= 16) {
            bar_Health = 2;
            health_Text = "";
            $('#test').css('background-color', 'red');

        } else if (health <= 32) {
            bar_Health = 3;
            health_Text = "";
            $('#test').css('background-color', 'red');

        } else if (health <= 40) {
            bar_Health = 4;
            health_Text = "";
            $('#test').css('background-color', 'red');

        } else if (health <= 48) {
            bar_Health = 5;
            health_Text = "";
            $('#test').css('background-color', 'red');

        } else if (health <= 56) {
            bar_Health = 6;
            $('#test').css('background-color', 'red');

        } else if (health <= 64) {
            bar_Health = 7;
            $('#test').css('background-color', 'red');

        } else if (health <= 72) {
            bar_Health = 8;
            $('#test').css('background-color', 'red');

        } else if (health <= 80) {
            bar_Health = 9;
            $('#test').css('background-color', 'red');

        } else if (health <= 88) {
            bar_Health = 10;
            $('#test').css('background-color', 'red');

        } else if (health <= 94) {
            bar_Health = 11;
            $('#test').css('background-color', 'red');

        } else if (health <= 100) {
            bar_Health = 12;
            $('#test').css('background-color', 'red');
        }

        return bar_Health;
    };
}
