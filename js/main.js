var engine = new Engine();
var informant = new Informant();
var economy = new Economy();
var player = new Player();
var buysell = new BuySell();
var travel = new Travel();
var encounter = new Encounter();
var init_travel_key = 0;

var candyArray = {
    0: atomicFireballs = new Candy(),
    1: candyCigarettes = new Candy(),
    2: cottonCandy = new Candy(),
    3: gummiBears = new Candy(),
    4: lolliPop = new Candy(),
    5: milkDuds = new Candy(),
    6: MMs = new Candy(),
    7: jawBreaker = new Candy(),
    8: kitKat = new Candy(),
    9: popRocks = new Candy(),
    10: peeps = new Candy(),
    11: skittles = new Candy(),
    12: smarties = new Candy(),
    13: starburst = new Candy(),
    14: tootsieRolls = new Candy()
};

var citiesArray = {
    0: canberra = new Location("Australia", engine),
    1: brasilia = new Location("Brazil", engine),
    2: beijing = new Location("China", engine),
    3: paris = new Location("France", engine),
    4: berlin = new Location("Germany", engine),
    5: rome = new Location("Italy", engine),
    6: tokyo = new Location("Japan", engine),
    7: mexico_City = new Location("Mexico", engine),
    8: amsterdam = new Location("Netherlands", engine),
    9: moscow = new Location("Russia", engine),
    10: singapore = new Location("Singapore", engine),
    11: pretoria = new Location("South Africa", engine),
    12: london = new Location("UK", engine),
    13: washington = new Location("USA", engine),
    14: caracas = new Location("Venezuela", engine)
};

var npcArray = {
    0: steve = new NPC("Steve", "Australia"),
    1: márcio = new NPC("Márcio", "Brazil"),
    2: yehao = new NPC("Yehao", "China"),
    3: jean = new NPC("Jean", "France"),
    4: hans = new NPC("Hans", "Germany"),
    5: giovanni = new NPC("Giovanni", "Italy"),
    6: nihonjin = new NPC("Nihonjin", "Japan"),
    7: jose = new NPC("Jose", "Mexico"),
    8: bram = new NPC("Bram", "Netherlands"),
    9: ivor = new NPC("Ivor", "Russia"),
    10: agu = new NPC("Agu", "Singapore"),
    11: willem = new NPC("Willem", "South Africa"),
    12: richard = new NPC("Richard", "UK"),
    13: mike = new NPC("Mike", "USA"),
    14: luis = new NPC("Luis", "Venezuela")
};

engine.initCandyNames();

engine.initCandyType();

player.managePlayerHealthBar();

encounter.initButtons();

//Problem : if code on line 74 - 76 is moved to line 99 it no longer works

encounter.run(function(ready) {
    console.log(ready);
});

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
