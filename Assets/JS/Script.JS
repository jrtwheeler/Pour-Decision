$("#getRecipes").on("click", function () {
    var foodChoice = "Beef"//$(#"foodChoice");
    var drinkChoice = "Cocktail"//$("#drinkChoice");

    var foodURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + foodChoice;
    var drinkURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + drinkChoice;


    $.ajax({
        url: foodURL,
        method: "GET"
    }) .then(function (response) {
        console.log(response);
    });

    $.ajax({
        url: drinkURL,
        method: "GET"
    }) .then(function (response) {
        console.log(response);
    });

})