$(document).ready(function () {

    //Hide section div
    var section_div = $(".section");
    var moreDrinkBtn = $("#moreDrink");
    var moreFoodBtn = $("#moreFood");
    var foodIngredInstr = $(".food-ingred-instr");
    var drinkIngredInstr = $(".drink-ingred-instr");
    section_div.hide();

    $("#getRecipes").on("click", function () {
        //Show food and drink div

        var foodChoice = $("#foodChoice").val();
        var drinkChoice = $("#drinkChoice").val();

        if ($("#meal-checkbox").prop("checked") === false) {
            if (foodChoice === "") {
            } else if (foodChoice === "Random") {
                showDivs();
                processRandFood();
            } else {
                showDivs();
                processCategoryFood(foodChoice);
            };
        };
        
        if ($("#drink-checkbox").prop("checked") === false) {
            if (drinkChoice === "") {
            } else if (drinkChoice === "Random") {
                showDivs();
                processRandDrink();
            } else {
                showDivs();
                processCategoryDrink(drinkChoice);
            };
        };

        if ($("#meal-checkbox").prop("checked") && $("#drink-checkbox").prop("checked")) {
            alert("You have both options selected as Remember Me");
        } else if (drinkChoice === "" && foodChoice === "") {
            alert("You have not selected any options.")
        };

    });

    moreFoodBtn.on("click", function () {
        foodIngredInstr.show();
    })

    moreDrinkBtn.on("click", function () {
        drinkIngredInstr.show();
    })


    function dispFood(res) {
        var meal = res.meals[0];
        var i = 1;
        var stop = false;
        $("#foodMeal").text(meal.strMeal);
        $("#foodCategory").text("Category: " + meal.strCategory);
        $("#foodOrigin").text("Origin: " + meal.strArea);
        $("#foodInstructions").text(meal.strInstructions);
        $("#foodImage").attr("src", meal.strMealThumb);
        //$("#foodVideo").attr("src", meal.strYoutube);
        while (!stop) {
            if (meal["strIngredient" + i]) {
                var trDiv = $("<tr>");
                var tdDiv1 = $("<td>");
                var tdDiv2 = $("<td>");
                tdDiv1.text(meal["strIngredient" + i]);
                tdDiv2.text(meal["strMeasure" + i]);
                trDiv.append(tdDiv1, tdDiv2);
                $("#foodIngredient").append(trDiv);
                i++;
            } else {
                stop = true;
            }
        }
    }

    function dispDrink(res) {
        var drink = res.drinks[0];
        var i = 1;
        var stop = false;
        $("#drinkName").text(drink.strDrink);
        $("#drinkCategory").text("Category: " + drink.strCategory);
        $("#drinkAlcoholic").text("Origin: " + drink.strAlcoholic);
        $("#drinkGlass").text("Recommended Glass: " + drink.strGlass);
        $("#drinkInstructions").text(drink.strInstructions);
        $("#drinkImage").attr("src", drink.strDrinkThumb);
        while (!stop) {
            if (drink["strIngredient" + i]) {
                var trDiv = $("<tr>");
                var tdDiv1 = $("<td>");
                var tdDiv2 = $("<td>");
                tdDiv1.text(drink["strIngredient" + i]);
                tdDiv2.text(drink["strMeasure" + i]);
                trDiv.append(tdDiv1, tdDiv2);
                $("#drinkIngredient").append(trDiv);
                i++;
            } else {
                stop = true;
            }
        }
    }

    function processRandFood() {
        var foodURL =
            "https://www.themealdb.com/api/json/v1/1/random.php";
        foodAjax(foodURL);
    };

    function processCategoryFood(foodChoice) {
        var foodURL =
            "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + foodChoice;
        $.ajax({
            url: foodURL,
            method: "GET",
        }).then(function (response) {
            var foodCount = response.meals.length;
            var foodPick = Math.floor(Math.random() * foodCount);
            var foodRand = response.meals[foodPick].idMeal;

            var newFoodURL =
                "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + foodRand;

            foodAjax(newFoodURL);
        });
    };

    function foodAjax(URL) {
        $.ajax({
            url: URL,
            method: "GET",
        }).then(function (response) {
            dispFood(response);
        });
    };

    function processRandDrink() {
        var drinkURL =
            "https://www.thecocktaildb.com/api/json/v1/1/random.php"
        drinkAjax(drinkURL);
    };

    function processCategoryDrink(drinkChoice) {

        var drinkURL =
            "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + drinkChoice;
        $.ajax({
            url: drinkURL,
            method: "GET",
        }).then(function (response) {
            var drinkCount = response.drinks.length;
            var drinkPick = Math.floor(Math.random() * drinkCount);
            var drinkRand = response.drinks[drinkPick].idDrink;

            var newDrinkURL =
                "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkRand;
            drinkAjax(newDrinkURL);
        });

    };

    function drinkAjax(URL) {
        $.ajax({
            url: URL,
            method: "GET",
        }).then(function (response) {
            dispDrink(response);
        });
    };

    function showDivs() {
        section_div.show();
        drinkIngredInstr.hide();
        foodIngredInstr.hide();
    }

})
