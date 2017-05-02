var engine = new Engine();
var informant = new Informant();
var economy = new Economy();
var player = new Player();
var buysell = new BuySell();
var travel = new Travel();
var encounter = new Encounter();
var init_travel_key = 0;

var candyArray = [
    new Candy("Atomic balls"),
    new Candy("Candy Cigs"),
    new Candy("Cotton Candy"),
    new Candy("Gummi Bears"),
    new Candy("Lollipop"),
    new Candy("Milk Duds"),
    new Candy("M&Ms"),
    new Candy("Jaw Breaker"),
    new Candy("Kit-Kat"),
    new Candy("Pop Rocks"),
    new Candy("Peeps"),
    new Candy("Skittles"),
    new Candy("Smarties"),
    new Candy("Starburst"),
    new Candy("Tootsie Roll")
];

var citiesArray = [
    new Location("Australia", engine),
    new Location("Brazil", engine),
    new Location("China", engine),
    new Location("France", engine),
    new Location("Germany", engine),
    new Location("Italy", engine),
    new Location("Japan", engine),
    new Location("Mexico", engine),
    new Location("Netherlands", engine),
    new Location("Russia", engine),
    new Location("Singapore", engine),
    new Location("South Africa", engine),
    new Location("UK", engine),
    new Location("USA", engine),
    new Location("Venezuela", engine)
];

var npcArray = [
    new NPC("Steve", "Australia"),
    new NPC("Márcio", "Brazil"),
    new NPC("Yehao", "China"),
    new NPC("Jean", "France"),
    new NPC("Hans", "Germany"),
    new NPC("Giovanni", "Italy"),
    new NPC("Nihonjin", "Japan"),
    new NPC("Jose", "Mexico"),
    new NPC("Bram", "Netherlands"),
    new NPC("Ivor", "Russia"),
    new NPC("Agu", "Singapore"),
    new NPC("Willem", "South Africa"),
    new NPC("Richard", "UK"),
    new NPC("Mike", "USA"),
    new NPC("Luis", "Venezuela")
];

engine.initCandyType();

player.managePlayerHealthBar();

encounter.initButtons();

encounter.run();

buysell.buyCityProduct(function(location) {
    economy.updateEconomy(location);
});

buysell.sellCityProducts(function(location) {
    economy.updateEconomy(location);
});

travel.flyTo(function(location) {
    engine.stockUpCityProducts(location);
    encounter.encounterBegin(location);
    if(init_travel_key !== location){
        engine.initTravelCost();
    }
    init_travel_key = location;
});

travel.stay(function(location) {
    engine.stockUpCityProducts(location);
    engine.initTravelCost();
});
