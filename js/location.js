function Location(Location_name, engine) {
    var _location = this;
    var name = Location_name;
    var manufactures = "";
    var manufactures_Key = null;
    var manufactured_Price = 0;
    var cityManufacture = "";
    var array_Comp = false;


    var stock = {
        0: ["Atomic balls", engine.randomHundred(), engine.getRandomInt(5, 100)],
        1: ["Candy Cigs", engine.randomHundred(), engine.getRandomInt(5, 100)],
        2: ["Cotton Candy", engine.randomHundred(), engine.getRandomInt(5, 100)],
        3: ["Gummi Bears", engine.randomHundred(), engine.getRandomInt(5, 100)],
        4: ["Lollipop", engine.randomHundred(), engine.getRandomInt(5, 100)],
        5: ["Milk Duds", engine.randomHundred(), engine.getRandomInt(5, 100)],
        6: ["M&Ms", engine.randomHundred(), engine.getRandomInt(5, 100)],
        7: ["Jaw Breaker", engine.randomHundred(), engine.getRandomInt(5, 100)],
        8: ["Kit-Kat", engine.randomHundred(), engine.getRandomInt(5, 100)],
        9: ["Pop Rocks", engine.randomHundred(), engine.getRandomInt(5, 100)],
        10: ["Peeps", engine.randomHundred(), engine.getRandomInt(5, 100)],
        11: ["Skittles", engine.randomHundred(), engine.getRandomInt(5, 100)],
        12: ["Smarties", engine.randomHundred(), engine.getRandomInt(5, 100)],
        13: ["Starburst", engine.randomHundred(), engine.getRandomInt(5, 100)],
        14: ["Tootsie Roll", engine.randomHundred(), engine.getRandomInt(5, 100)]
    };

    this.getName = function() {
        return name;
    };

    this.getManufactures = function() {
        return manufactures;
    };

    this.getStockArray = function() {
        return stock;
    };

    this.getStockArrayName = function(index) {
        return stock[index][0];
    };

    this.getStockPrice = function(index) {
        return stock[index][2];
    };

    this.getStockAmount = function(index) {
        return stock[index][1];
    };

    this.sellStock = function(index, amount) {
        stock[index][1] = stock[index][1] + amount;
    };

    this.buyStock = function(index, amount) {
        stock[index][1] = stock[index][1] - amount;
    };

    this.setStockPrice = function(index, price) {
        stock[index][2] = price;
    };

    this.stockUpProducts = function() {
        var key = 0;
        for(key in stock) {
            $('#Candy' + key).html(stock[key][0] + ":" + " amount: " + stock[key][1] + " price: " + stock[key][2]);
        }
    };

    this.getLowStock = function() {
        var key = 0;
        var html = [];

        for(key in stock) {
            if (stock[key][1] < 20) {
                html.push('<option>' + name + ' needs ' + stock[key][0] + '</option>');
            }
        }
        $('#informant').html(html.join('\n'));
        return html;

    };

    this.checkStock = function() {

        var check_Stock = [];

        for(var key in stock){

            if (stock[key][1] < 20) {
                check_Stock.push('<option>' + stock[key][0] + ":"  + "     price: " + stock[key][2] + '</option>');
            }
        }
        $('#products_Wanted').html(check_Stock.join('\n'));
    };

    this.replaceStock = function() {
        for(var key in stock){

            if (stock[key][1] === 0) {
                stock[key][1] = engine.getRandomInt(5, 500);
            }
        }
    };

    this.setManufactures = function(candy_type) {

        manufactures = candy_type;
        InitCandy(manufactures);

    };

    this.consumeStock = function() {
        var key = 0;

        for(key in stock) {
            var item_Name = stock[key][0];
            var item_Amount = stock[key][1];
            var minus = candyArray[key].getWantedLevel();

            if(item_Amount !== 0){
                stock[key][1] = item_Amount - candyArray[key].getWantedLevel();
            }
            if (item_Amount < 0) {
                stock[key][1] = 0;
            }
        }
    };


}
