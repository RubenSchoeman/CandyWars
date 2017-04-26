function Travel() {
    var stay = null;
    var previous_location = null;
    var previous_location_counter = 1;
    var location = 0;

    this.flyTo = function(callback) {
        $('#flyTo').on('click', function(event) {
            event.preventDefault();

            previous_location = location;
            var locationString = engine.getSelectedTravelToValue();
            location = $('#travel_To :selected').val();
            engine.countDay();

            if(location !== stay) {
                $('#current_location').html(locationString);

                citiesArray[location].setRooms("Player");

                citiesArray[previous_location].removeFromRoom("Player");

                engine.manageNpc();

                engine.manageCity();

                engine.stockUpCityProducts(location);

                economy.updateEconomy(location);

                engine.checkCityStock(location);

                informant.messages();

                player.setPlayerLocation(location);
            }

            callback(location);
            stay = location;
        });
    };

    this.stay = function(callback) {
        $('#stay').on('click', function(event) {
            event.preventDefault();

            engine.countDay();

            engine.manageNpc();

            engine.manageCity();

            economy.updateEconomy(stay);

            engine.checkCityStock(stay);

            informant.messages();
        });
        callback(stay);
    };
}
