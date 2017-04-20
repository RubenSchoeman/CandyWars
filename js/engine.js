function Engine(){
    var _engine = this;
    var stay = null;

    var candy_Type = [
        "Atomic balls",
        "Candy Cigs",
        "Cotton Candy",
        "Gummi Bears",
        "Lollipop",
        "Milk Duds",
        "M&Ms",
        "Jaw Breaker",
        "Kit-Kat",
        "Pop Rocks",
        "Peeps",
        "Skittles",
        "Smarties",
        "Starburst",
        "Tootsie Roll",
    ];

    this.initCityManufactures = function(){
        for(var key in candy_Type){
            InitCandy(candy_Type[key]);
        }
    };

    this.initCandyNames = function() {
        for(var key in candyArray){
            candyArray[key].setName(_engine.getCandyType(key));
        }
    };

    this.randomHundred = function() {
        var temp = Math.ceil(Math.random() * 100 + 1);
        return temp;
    };

    this.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    this.getCandyType = function(index) {
        return candy_Type[index];
    };

    this.getCandy = function() {
        return candy_Type;
    };

    this.manageNpc = function() {
        for(var key in npcArray) {
            npcArray[key].buyCheapStock();
            npcArray[key].npcTravel();
            //console.log(npcArray[key].getName() + " is in " + npcArray[key].getLocation() + " with " + npcArray[key].getProducts());
            npcArray[key].sellProducts();
        }
    };

    this.manageCity = function() {
        for(var key in citiesArray) {
            citiesArray[key].consumeStock();
            citiesArray[key].replaceStock();
        }
    };

    this.flyTo = function(callback) {
        $('#flyTo').on('click', function(event) {
            event.preventDefault();
            var e = document.getElementById("travel_To");
            var strUser = e.options[e.selectedIndex].text;
            var location = $('#travel_To :selected').val();


            if(location !== stay) {
                $('#current_location').html(strUser);

                _engine.manageNpc();

                _engine.manageCity();

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

            _engine.manageNpc();

            _engine.manageCity();

            citiesArray[stay].stockUpProducts();
            citiesArray[stay].checkStock();

            economy.lowStockPrice();

            informant.messages();

        });
    };


}
