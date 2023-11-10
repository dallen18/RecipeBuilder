window.onload = () => {
    // Initial random recipes loaded to page
    startRecipe();
};

function checkInput() {
    const recipeInput = document.getElementById('search-bar').value;
    if (recipeInput.length === 0) {
        alert("Please enter a recipe name");
    }
}

/*Loads more recipes with the fetchRecipe function, find a way to check whether or not there's already been a search and call startRecipe
* if no previous search has been done*/
const loadMoreButton = document.getElementById("load-more-btn");
loadMoreButton.addEventListener("click", function (event) {
    event.preventDefault();
    $('#recipe-results').empty();
    window.scrollTo(0, 0);
    fetchRecipe();
});

document.getElementById('search-btn').addEventListener("click", function (event) {
    event.preventDefault();
    $('#recipe-results').empty();
    fetchRecipe();
});

let page = 1; // Track the current page
const resultsPerPage = 36; // Number of results per page

async function fetchRecipe() {
    const recipeQuery = document.getElementById('search-bar').value.trim();
    // Check if the search query is empty
    if (!recipeQuery) {
        console.error("Recipe query is empty");
        return;
    }
    try {
        const response = await fetch(`/api/searchRecipes?query=${(recipeQuery)}`);
        if (!response.ok) {
            throw new Error(`Error fetching recipes: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result);

        let container = document.createElement("div");
        container.className = "recipe-container";
        container.style.display = "grid";
        //container.style.border = "1px solid #fc1c1c";
        container.style.boxShadow = "0px 2px 10px 1px #fc1c1c";
        //container.style.boxShadow = "6px 5px 5px 6px #fc1c1c";

        let placeholder = document.querySelector("#recipe-results");
        let out = "";
        for (let recipe of result.results) {
            out += `
        <div class="recipe-item" style="justify-content: center";>
            <div>
                <img  src="${recipe.image}" class="recipe-image">
            </div> 
            <div>
                <div style="margin: 5px;">${recipe.dishTypes[0]}</div>
                <h1 style="margin: 5px; font-size: 25px ;">${recipe.title}</h1>
                <p><img src="../img/red-timer.png" id="timer" style="height: 20px; width: 20px; margin: 5px;"> ${recipe.readyInMinutes} Mins</p>
            </div>
        </div>
        `;
        }
        container.innerHTML = out;
        placeholder.appendChild(container);

        page++; // Increment the page for the next fetch
    } catch (error) {
        console.error(error);
    }
}


/*Loads page with random recipes, results come from server-side instead of client-side*/
async function startRecipe() {
    try {
        const response = await fetch("/api/searchRecipe");
        const result = await response.json();

        let container = document.createElement("div");
        container.className = "recipe-container";
        container.style.display = "grid";
        //container.style.border = "1px solid #fc1c1c";
        container.style.boxShadow = "0px 2px 10px 1px #fc1c1c";
        //container.style.boxShadow = "6px 5px 5px 6px #fc1c1c";

        let placeholder = document.querySelector("#recipe-results");
        let out = "";
        for (let recipe of result.recipes) {
            out += `
        <div class="recipe-item" style="justify-content: center";>
            <div>
                <img  src="${recipe.image}" class="recipe-image">
            </div> 
            <div>
                <div style="margin: 5px;">${recipe.dishTypes[0]}</div>
                <h1 style="margin: 5px; font-size: 25px ;">${recipe.title}</h1>
                <p><img src="../img/red-timer.png" id="timer" style="height: 20px; width: 20px; margin: 5px;"> ${recipe.readyInMinutes} Mins</p>
            </div>
        </div>
        `;
        }
        container.innerHTML = out;
        placeholder.appendChild(container);

        page++; // Increment the page for the next fetch

    } catch (error) {
        console.error(error);
    }
}

