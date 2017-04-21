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

var engine = new Engine();
var informant = new Informant();
var economy = new Economy();
var player = new Player();
var buysell = new BuySell();

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

engine.initCityManufactures();

buysell.buyCityProduct(function(location) {
    economy.updateEconomy(location);
});

engine.flyTo(function(location) {
    economy.updateEconomy(location);
});

engine.stay();

//engine.buyCityProduct();


//$('#test').html('<div class="col-xs-' + 12 + '" id="player_Health_Bar_Color"> Player Health </div>');
//console.log(engine.getCandy().indexOf("Smarties"));




/*

var is_Random_Array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function spliceArray(index) {
    is_Random_Array.splice(index, 1);
}

function getRandomArray() {
    return is_Random_Array;
}
*/
