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
    var meal = res.meals[0];
    var i = 1;
    var stop = false;
    console.log(meal.strMeal);
    $("#foodMeal").text(meal.strMeal);
    $("#foodCategory").text(meal.strCategory);
    $("#foodOrigin").text(meal.strArea);
    $("#foodInstructions").text(meal.strInstructions);
    $("#foodImage").attr("src", meal.strMealThumb);
    $("#foodVideo").attr("src", meal.strYoutube);
    while (!stop) {
        var ing = meal.strIngredient + i;
        if (ing) {
            var trDiv = $("<tr>");
            var tdDiv1 = $("<td>");
            var tdDiv2 = $("<td>");
            tdDiv1.text(meal.strIngredient + i);
            tdDiv2.text(meal.strMeasure + i);
            trDiv.append(trDiv1, trDiv2);
            $("#foodIngredient").append(trDiv);
            i++;
        } else {
            stop = true;
        };
    };
    

}

function dispDrink (res) {
    console.log(res);
    var drink = "res.drinks"
    var i = 1;
    var stop = false;
    $("#drinkName").text(drink.strDrink);
    $("#drinkCategory").text(drink.strCategory);
    $("#drinkAlcoholic").text(drink.strAlcoholic);
    $("#drinkGlass").text(drink.strGlass);
    $("#drinkInstructions").text(drink.strInstructions);
    $("#drinkImage").attr("src", drink.strDrinkThumb);
    while (!stop) {
        var ing = drink.strIngredient + i;
        if (ing) {
            var trDiv = $("<tr>");
            var tdDiv1 = $("<td>");
            var tdDiv2 = $("<td>");
            tdDiv1.text(drink.strIngredient + i);
            tdDiv2.text(drink.strMeasure + i);
            trDiv.append(trDiv1, trDiv2);
            $("#drinkIngredient").append(trDiv);
            i++;
        } else {
            stop = true;
        };
    };

}