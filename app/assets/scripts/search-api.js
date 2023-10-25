window.onload(fetchRecipe());

function checkInput() {
    let recipeInput = document.getElementById('search-bar').value;
    if (recipeInput.length === 0) {
        alert("Please enter a recipe name");
    }
}

document.getElementById('search-btn').addEventListener("click", function (event) {
    event.preventDefault();
    fetchRecipe();
});

async function fetchRecipe() {
    let recipeQuery = document.getElementById('search-bar').value;
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=${recipeQuery}&instructionsRequired=true&fillIngredients=false&addRecipeInformation=true&ignorePantry=true&limitLicense=false&ranking=2&number=40`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a2eb59a3a5msha082d86bf50568bp10e897jsn2845f3101d32',
            'X-RapidAPI-Host': `spoonacular-recipe-food-nutrition-v1.p.rapidapi.com`,
        },
    };

    try {

        const response = await fetch(url, options);
        const result = await response.json();

        console.log(result);

        const image = result.results[0].image;

        //Need to make responsive
        let container = document.createElement("div");
        container.className = "recipe-container";
        container.style.display = "grid";
        container.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
        container.style.columnGap = "10px";
        container.style.rowGap = "15px";
        container.style.margin = "25px";

        let placeholder = document.querySelector("#recipe-results");
        let out = "";
        for (let recipe of result.results) {
            out += `
    <div class="recipe-item" style= "justify-content: center">
        <div style="justify-content: center">
            <img src="${recipe.image}">
        </div> 
        <div>
            <div style="margin 5px;">${recipe.dishTypes[0]}</div>
            <p><img src="../img/red-timer.png" id="timer" style="height: 20px; width: 20px; margin: 2px;"> ${recipe.readyInMinutes} Mins</p>
        </div>
    </div>
    `;
        }
        container.innerHTML = out; // Set the container's HTML content
        placeholder.appendChild(container);

    } catch (error) {
        console.error(error);
    }
}
