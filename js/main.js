var engine = new Engine();
var informant = new Informant();
var economy = new Economy();
var player = new Player();
var buysell = new BuySell();
var shop = new Shop();
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

var weaponsArray = [
    new Weapon("Bare Fist", 50, false, 250, 25),
    new Weapon("Plastic Sword", 75, false, 300, 25),
    new Weapon("Water Pistol", 100, true, 400, 30),
    new Weapon("Nerf Pistol", 125, true, 600, 30),
    new Weapon("Bat", 150, false, 750, 35),
    new Weapon("BB Gun", 175, true, 1000, 30),
    new Weapon("Pepper Spray", 200, false, 3500, 3),
    new Weapon("Paintball Gun", 300, true, 10000, 15),
    new Weapon("Water Baloon", 175, false, 1000, 1),
    new Weapon("Paintball bomb", 250, false, 2500, 1)
];

engine.initCandyType();

player.managePlayerHealthBar();

engine.initBtn();

encounter.run();

encounter.surrender();

encounter.bribe();

shop.buyItem();

shop.sellItem();

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
