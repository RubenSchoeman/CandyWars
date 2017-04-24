function Travel() {
    var stay = null;

    this.flyTo = function(callback) {
        $('#flyTo').on('click', function(event) {
            event.preventDefault();
            var locationString = engine.getSelectedTravelToValue();
            var location = $('#travel_To :selected').val();


            if(location !== stay) {
                $('#current_location').html(locationString);

                engine.manageNpc();

                engine.manageCity();

                engine.stockUpCityProducts(location);

                economy.updateEconomy(location);

                engine.checkCityStock(location);

                informant.messages();

                player.setPlayerLocation(location);
            }

            callback(location);
            //$('#test').html('<div id="player_Health_Bar_Color" class="col-xs-' + player.getPlayerDisplayHealth(player.getPlayerHealth()) + '">' + player.getHealthText() + '</div>');
            //player.setPlayerHealth(8);
            //if(player.getHealthText() === "You be DEAD!!!") {
            //    $('#player_Health_Bar_Color').css('background-color', 'red');
            //}
            //console.log(location);
            stay = location;
        });
    };

    this.stay = function(callback) {
        $('#stay').on('click', function(event) {
            event.preventDefault();

            engine.manageNpc();

            engine.manageCity();

            economy.updateEconomy(stay);

            engine.checkCityStock(stay);

            informant.messages();

        });
        callback(stay);
    };
}
