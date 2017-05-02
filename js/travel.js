function Travel() {
    var _travel = this;
    var stay = null;
    var previous_location = null;
    var previous_location_counter = 1;
    var location = 0;

    this.flyTo = function(callback) {
        $('#flyTo').on('click', function(event) {
            event.preventDefault();
            previous_location = location;

            location = $('#travel_To :selected').val();
            var locationString = engine.getSelectedTravelToValue();
            var can_Travel = engine.checkCanTravel(location);

            if(location !== stay && can_Travel) {

                engine.countDay();

                $('#results_table').html('');
                $('#current_location').html(locationString);

                citiesArray[location].setRooms("Player");

                citiesArray[previous_location].removeFromRoom("Player");
                player.playerRegen();

                player.managePlayerHealthBar();

                engine.manageNpc();

                engine.manageCity();

                engine.stockUpCityProducts(location);

                economy.updateEconomy(location);

                engine.checkCityStock(location);

                informant.messages();

                player.setPlayerLocation(location);

                player.deductTravelCosts(location);

                callback(location);
            } else {
                $('#results_table').html('<h3>You do not have the fund to travel or you are already there</h3>');
            }
            stay = location;
        });
    };

    this.stay = function(callback) {
        $('#stay').on('click', function(event) {

            event.preventDefault();

            player.playerRegen();

            player.managePlayerHealthBar();

            engine.countDay();

            engine.manageNpc();

            engine.manageCity();

            economy.updateEconomy(stay);

            engine.checkCityStock(stay);

            informant.messages();

            encounter.encounterBegin(stay);

        });
        callback(stay);
    };
}
