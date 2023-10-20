var obj;

function checkInput() {
    let recipeInput = document.getElementById('search-bar').value;
    if (recipeInput.length !== 0) {
        document.getElementById('recipes').innerHTML = '';
    } else {
        alert("Please enter a recipe name")
    }
}

document.getElementById('search-btn').addEventListener("click", function (event) {
    event.preventDefault()
    fetchRecipe();
});

async function fetchRecipe() {
    let recipeQuery = document.getElementById('search-bar').value;
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=${recipeQuery}&instructionsRequired=true&fillIngredients=false&addRecipeInformation=true&ignorePantry=true&limitLicense=false&ranking=2`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a2eb59a3a5msha082d86bf50568bp10e897jsn2845f3101d32',
            'X-RapidAPI-Host': `spoonacular-recipe-food-nutrition-v1.p.rapidapi.com`,
        },
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
        obj = JSON.parse(result);
        console.log("HElllllllooooooooo")
        console.log(recipeQuery + "query result");
        console.log(obj.results[0].summary);
        console.log(obj.results[1]);

    } catch (error) {
        console.error(error);
    }
}

