/**
*   @param {string} name names the weapon;
*   @param {int} max_damage sets the damage of weapon;
*   @param {boolean} requires_ammo sets weather weapon requires ammo;
*   @param {int} price sets waepon price;
*   @param {int} durability sets waepon durability;
*/

function Weapon(name, max_damage, requires_ammo, price, durability) {
    var weapon_name = name;
    var damage_dealt = max_damage;
    var min_damage = damage_dealt / 2;
    var ammo_required = requires_ammo;
    var weapon_price = price;
    var weapon_uses = durability;
    var ammo = 0;

    this.dealDamage = function() {
        var deal_damage = engine.getRandomInt(min_damage, damage_dealt);
        weapon_uses -= engine.getRandomInt(0, 5);
        return deal_damage;
    };

    this.getName = function() {
        return weapon_name;
    };

    this.getPrice = function() {
        return weapon_price;
    };

    this.needAmmo = function() {
        return ammo_required;
    };

    this.addAmmo = function(set_ammo) {
        ammo = ammo + set_ammo;
    };

    this.removeAmmo = function() {
        ammo = ammo - 1;
    };

    this.getAmmo = function() {
        if(ammo_required === true) {
            return ammo;
        } else {
            ammo = "NA";
            return ammo;
        }

    };

}
