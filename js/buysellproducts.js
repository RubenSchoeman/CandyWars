function BuySellProducts() {
    var _buysellproducts = this;
    var counter = 0;
    var backpack_Products = [];
    var product_Val_Key = $('#products_Select :selected').val();
    var current_Location = null;
    var player_Money = 1000;// make this number call a setvalue in  a difficulty class

    this.buyCityProduct = function(callback) {
        $('#product_Buy_Btn').on('click', function(event) {
            event.preventDefault();
            current_Location = player.getPlayerLocation();
            player_Money = player.getPlayerMoney();
            product_Val_Key = $('#products_Select :selected').val();
            backpack_Products = [];
            var stock_Price = citiesArray[current_Location].getStockPrice(product_Val_Key);
            var product_Ammount = prompt("Please select amount", 0);

            if (product_Ammount < citiesArray[current_Location].getStockAmount(product_Val_Key)) {
                backpack_Products.push('<option>' + citiesArray[current_Location].getStockArrayName(product_Val_Key) + ":" + product_Ammount + '</option>');
                $('#product' + counter).html(backpack_Products.join('\n'));
                player_Money = player_Money - (stock_Price * product_Ammount);
                player.setPlayerMoney(player_Money);
                $('#player_Money_Display').html(player_Money);
                counter = counter + 1;

            }
            callback(current_Location);
        });
    };
}
