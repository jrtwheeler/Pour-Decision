$(document).ready(function () {

    // Declaration of global variables
    var section_div = $(".section");
    var moreDrinkBtn = $("#moreDrink");
    var moreFoodBtn = $("#moreFood");
    var foodIngredInstr = $(".food-ingred-instr");
    var drinkIngredInstr = $(".drink-ingred-instr");

    // Hiding the main part of the page
    section_div.hide();

    // Event handler for the search button
    $("#getRecipes").on("click", function () {
        // Pulling the choices from the dropdown
        var foodChoice = $("#foodChoice").val();
        var drinkChoice = $("#drinkChoice").val();

        // Meal: verifing the remember me is not checked, and also a choice is selected
        if ($("#meal-checkbox").prop("checked") === false) {
            if (foodChoice === "") {
            } // Determines which API call to make.
            else if (foodChoice === "Random") {
                showDivs();
                processRandFood();
            } else {
                showDivs();
                processCategoryFood(foodChoice);
            };
        };
      
        // Drink: verifing the remember me is not checked, and also a choice is selected
        if ($("#drink-checkbox").prop("checked") === false) {
            if (drinkChoice === "") {
            } // Determines which API call to make.
            else if (drinkChoice === "Random") {
                showDivs();
                processRandDrink();
            } else {
                showDivs();
                processCategoryDrink(drinkChoice);
            };
        };

        // Alerts for if both remember me boxes are checked, or neither dropdown is used. 
        if ($("#meal-checkbox").prop("checked") && $("#drink-checkbox").prop("checked")) {
            alert("You have both options selected as Remember Me");
        } else if (drinkChoice === "" && foodChoice === "") {
            alert("You have not selected any options.")
        };

    });

    // Event handler to show food details
    moreFoodBtn.on("click", function () {
        foodIngredInstr.show();
    })

    // Event handler to show drink details
    moreDrinkBtn.on("click", function () {
        drinkIngredInstr.show();
    })

    // Main food function to handle API repsonse and append the DOM
    function dispFood(res) {
        // Declaring local variables
        var meal = res.meals[0];
        var i = 1;
        var stop = false;
        var ingHead = "<tr><th>Ingredients</th><th>Amount</th></tr>"
        // Appending the DOM
        $("#foodMeal").text(meal.strMeal);
        $("#foodCategory").text("Category: " + meal.strCategory);
        $("#foodOrigin").text("Origin: " + meal.strArea);
        $("#foodInstructions").text(meal.strInstructions);
        $("#foodImage").attr("src", meal.strMealThumb);
        //$("#foodVideo").attr("src", meal.strYoutube);
        // Clearing and populating the ingredient table
        $("#foodIngredient").empty();
        $("#foodIngredient").append(ingHead);        
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

    // Main food function to handle API repsonse and append the DOM
    function dispDrink(res) {
        // Declaring local variables
        var drink = res.drinks[0];
        var i = 1;
        var stop = false;
        var ingHead = "<tr><th>Ingredients</th><th>Amount</th></tr>"
        // Appending the DOM
        $("#drinkName").text(drink.strDrink);
        $("#drinkCategory").text("Category: " + drink.strCategory);
        $("#drinkAlcoholic").text("Origin: " + drink.strAlcoholic);
        $("#drinkGlass").text("Recommended Glass: " + drink.strGlass);
        $("#drinkInstructions").text(drink.strInstructions);
        $("#drinkImage").attr("src", drink.strDrinkThumb);
        // Clearing and populating the ingredient table
        $("#drinkIngredient").empty();
        $("#drinkIngredient").append(ingHead);
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

    // URL generator for a random food selection
    function processRandFood() {
        var foodURL =
            "https://www.themealdb.com/api/json/v1/1/random.php";
        foodAjax(foodURL);
    };

    // URL generator for a specific food category choice
    function processCategoryFood(foodChoice) {
        // Getting the options by category
        var foodURL =
            "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + foodChoice;
        $.ajax({
            url: foodURL,
            method: "GET",
        }).then(function (response) {
            // Selecting a random meal from within the category
            var foodCount = response.meals.length;
            var foodPick = Math.floor(Math.random() * foodCount);
            var foodRand = response.meals[foodPick].idMeal;
            // URL for a specific meal
            var newFoodURL =
                "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + foodRand;
            // Function call to get the specific meal
            foodAjax(newFoodURL);
        });
    };

    // Function and API call to get a specific meal
    function foodAjax(URL) {
        $.ajax({
            url: URL,
            method: "GET",
        }).then(function (response) {
            dispFood(response);
        });
    };

    // URL generator for a random drink selection
    function processRandDrink() {
        var drinkURL =
            "https://www.thecocktaildb.com/api/json/v1/1/random.php"
        drinkAjax(drinkURL);
    };

    // URL generator for a specific drink category choice
    function processCategoryDrink(drinkChoice) {
        // Getting options by category
        var drinkURL =
            "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + drinkChoice;
        $.ajax({
            url: drinkURL,
            method: "GET",
        }).then(function (response) {
            // Selecting a random drink from within the category
            var drinkCount = response.drinks.length;
            var drinkPick = Math.floor(Math.random() * drinkCount);
            var drinkRand = response.drinks[drinkPick].idDrink;
            // URL for specific drink
            var newDrinkURL =
                "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkRand;
            // Function call to get the specific drink
            drinkAjax(newDrinkURL);
        });

    };

    // Function and API call to get a specific drink
    function drinkAjax(URL) {
        $.ajax({
            url: URL,
            method: "GET",
        }).then(function (response) {
            dispDrink(response);
        });
    };

    // Showing the main div and hiding the specific details
    function showDivs() {
        section_div.show();
        drinkIngredInstr.hide();
        foodIngredInstr.hide();
    }

})
