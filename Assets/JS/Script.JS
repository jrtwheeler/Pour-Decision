$("#getRecipes").on("click", function () {
    var foodChoice = $("#foodChoice").val();
    var drinkChoice = $("#drinkChoice").val();

    var foodURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + foodChoice;
    var drinkURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + drinkChoice;


    $.ajax({
        url: foodURL,
        method: "GET"
    }) .then(function (response) {
        var foodCount = response.meals.length;
        var foodPick = Math.floor(Math.random()*foodCount);
        var foodRand = response.meals[foodPick].idMeal;

        var newFoodURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + foodRand;

        $.ajax({
            url: newFoodURL,
            method: "GET"
        }) .then(function (response) {
            dispFood(response);
        });

    });

    $.ajax({
        url: drinkURL,
        method: "GET"
    }) .then(function (response) {
        var drinkCount = response.drinks.length;
        var drinkPick = Math.floor(Math.random()*drinkCount);
        var drinkRand = response.drinks[drinkPick].idDrink;

        var newDrinkURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkRand;

        $.ajax({
            url: newDrinkURL,
            method: "GET"
        }) .then(function (response) {
            dispDrink(response);
        });

    });

})

function dispFood (res) {
    console.log(res);
}

function dispDrink (res) {
    console.log(res);
}