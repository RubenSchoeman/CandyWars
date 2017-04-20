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

            atomic_Fireballs.setWantedLevel(randomNumber());
            atomic_Fireballs.setCandyManufacturingDiff(randomNumber());
            break;

        case "Candy Cigs":

            candy_Cigarettes.setWantedLevel(randomNumber());
            candy_Cigarettes.setCandyManufacturingDiff(randomNumber());
            break;

        case "Cotton Candy":

            cotton_Candy.setWantedLevel(randomNumber());
            cotton_Candy.setCandyManufacturingDiff(randomNumber());
            break;

        case "Gummi Bears":

            gummi_Bears.setWantedLevel(randomNumber());
            gummi_Bears.setCandyManufacturingDiff(randomNumber());
            break;

        case "Lollipop":

            lolli_Pop.setWantedLevel(randomNumber());
            lolli_Pop.setCandyManufacturingDiff(randomNumber());
            break;

        case "Milk Duds":

            milk_Duds.setWantedLevel(randomNumber());
            milk_Duds.setCandyManufacturingDiff(randomNumber());
            break;

        case "M&Ms":

            MMs.setWantedLevel(randomNumber());
            MMs.setCandyManufacturingDiff(randomNumber());
            break;

        case "Jaw Breaker":

            jaw_Breaker.setWantedLevel(randomNumber());
            jaw_Breaker.setCandyManufacturingDiff(randomNumber());
            break;

        case "Kit-Kat":

            kit_Kat.setWantedLevel(randomNumber());
            kit_Kat.setCandyManufacturingDiff(randomNumber());
            break;

        case "Pop Rocks":

            pop_Rocks.setWantedLevel(randomNumber());
            pop_Rocks.setCandyManufacturingDiff(randomNumber());
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

            tootsie_Rolls.setWantedLevel(randomNumber());
            tootsie_Rolls.setCandyManufacturingDiff(randomNumber());
            break;

        default:

    }



}
