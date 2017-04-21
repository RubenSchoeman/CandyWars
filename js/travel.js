function Travel() {
    var stay = null;

    this.flyTo = function(callback) {
        $('#flyTo').on('click', function(event) {
            event.preventDefault();
            var e = document.getElementById("travel_To");
            var strUser = e.options[e.selectedIndex].text;
            var location = $('#travel_To :selected').val();


            if(location !== stay) {
                $('#current_location').html(strUser);

                engine.manageNpc();

                engine.manageCity();

                //citiesArray[location].stockUpProducts();
                citiesArray[location].checkStock();

                informant.messages();

                player.setPlayerLocation(location);
            }

            callback(location);
            //$('#test').html('<div id="player_Health_Bar_Color" class="col-xs-' + player.getPlayerDisplayHealth(player.getPlayerHealth()) + '">' + player.getHealthText() + '</div>');
            //player.setPlayerHealth(8);
            //if(player.getHealthText() === "You be DEAD!!!") {
            //    $('#player_Health_Bar_Color').css('background-color', 'red');
            //}

            stay = location;
        });
    };

    this.stay = function() {
        $('#stay').on('click', function(event) {
            event.preventDefault();

            engine.manageNpc();

            engine.manageCity();

            citiesArray[stay].stockUpProducts();
            citiesArray[stay].checkStock();

            informant.messages();

        });
    };
}
