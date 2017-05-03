function Shop() {
    var _shop = this;

    this.buyItem = function() {
        $('#shop_buy').on('click', function() {
            var weapon_key = _shop.createString($('#shop_Weapons :selected').val());
            console.log(weapon_key);
        });
    };

    this.sellItem = function() {
        $('#shop_sell').on('click', function() {
            var weapon_key = _shop.createString($('#weapons_Select :selected').val());
        });
    };

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
}
