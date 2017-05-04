function Ammo(name, price) {
    var ammo_name = name;
    var ammo_price = price;

    this.getName = function() {
        return ammo_name;
    };

    this.getPrice = function() {
        return ammo_price;
    };
}
