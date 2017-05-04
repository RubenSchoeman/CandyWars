function Item(name, price) {
    var item_name = name;
    var item_price = price;

    this.getPrice = function() {
        return item_price;
    };

    this.getName = function() {
        return item_name;
    };

}
