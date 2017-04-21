function InitCandy(name) {
    var _manufacture = this;
    var unit_Price = 0;

    _manufacture.randomNumber = function() {
        var temp_number = Math.ceil(Math.random() * 10);

        if (temp_number === 0) {
            temp_number = temp_number + 1;
        }

        return temp_number;
    };

    switch (name) {
        case "Atomic balls":

            atomicFireballs.setWantedLevel(randomNumber());
            atomicFireballs.setCandyManufacturingDiff(randomNumber());
            break;

        case "Candy Cigs":

            candyCigarettes.setWantedLevel(randomNumber());
            candyCigarettes.setCandyManufacturingDiff(randomNumber());
            break;

        case "Cotton Candy":

            cottonCandy.setWantedLevel(randomNumber());
            cottonCandy.setCandyManufacturingDiff(randomNumber());
            break;

        case "Gummi Bears":

            gummiBears.setWantedLevel(randomNumber());
            gummiBears.setCandyManufacturingDiff(randomNumber());
            break;

        case "Lollipop":

            lolliPop.setWantedLevel(randomNumber());
            lolliPop.setCandyManufacturingDiff(randomNumber());
            break;

        case "Milk Duds":

            milkDuds.setWantedLevel(randomNumber());
            milkDuds.setCandyManufacturingDiff(randomNumber());
            break;

        case "M&Ms":

            MMs.setWantedLevel(randomNumber());
            MMs.setCandyManufacturingDiff(randomNumber());
            break;

        case "Jaw Breaker":

            jawBreaker.setWantedLevel(randomNumber());
            jawBreaker.setCandyManufacturingDiff(randomNumber());
            break;

        case "Kit-Kat":

            kitKat.setWantedLevel(randomNumber());
            kitKat.setCandyManufacturingDiff(randomNumber());
            break;

        case "Pop Rocks":

            popRocks.setWantedLevel(randomNumber());
            popRocks.setCandyManufacturingDiff(randomNumber());
            break;

        case "Peeps":

            peeps.setWantedLevel(randomNumber());
            peeps.setCandyManufacturingDiff(randomNumber());
            break;

        case "Skittles":

            skittles.setWantedLevel(randomNumber());
            skittles.setCandyManufacturingDiff(randomNumber());
            break;

        case "Smarties":

            smarties.setWantedLevel(randomNumber());
            smarties.setCandyManufacturingDiff(randomNumber());
            break;

        case "Starburst":

            starburst.setWantedLevel(randomNumber());
            starburst.setCandyManufacturingDiff(randomNumber());
            break;

        case "Tootsie Roll":

            tootsieRolls.setWantedLevel(randomNumber());
            tootsieRolls.setCandyManufacturingDiff(randomNumber());
            break;

        default:

    }



}
