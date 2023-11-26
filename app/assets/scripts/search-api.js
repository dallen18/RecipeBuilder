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

//Converts minutes to hours if minutes exceed 60
//Taken from https://plainenglish.io/blog/javascript-convert-minutes-to-hours-and-minutes
function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return {hours, minutes};
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

//Event listener for search button
document.getElementById('search-btn').addEventListener("click", function (event) {
    event.preventDefault();
    $('#recipe-results').empty();
    fetchRecipe();
});

async function fetchRecipe() {
    const recipeQuery = document.getElementById('search-bar').value.trim();
    // Check if the search query is empty
    if (!recipeQuery) {
        console.error("Recipe query is empty");
        return;
    }
    try {
        const response = await fetch(`/api/searchRecipes?query=${recipeQuery}`);
        if (!response.ok) {
            throw new Error(`Error fetching recipes: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result);

        let container = document.createElement("div");
        container.className = "recipe-container";
        container.style.display = "grid";
        container.style.boxShadow = "0px 2px 10px 1px #fc1c1c";


        let placeholder = document.querySelector("#recipe-results");
        let out = "";
        for (let recipe of result.results) {
            const {hours, minutes} = toHoursAndMinutes(recipe.readyInMinutes);
            const timeDisplay = `${hours > 0 ? hours + 'h ' : ''}${minutes}m`;
            out += `
                <div class="recipe-item" style="justify-content: center";>
                    <div>
                        <img  src="${recipe.image}" class="recipe-image">
                    </div> 
                    <div>
                        <div style="margin: 5px;">${recipe.dishTypes[0]}</div>
                        <h1 style="margin: 5px; font-size: 25px ;">${recipe.title}</h1>
                        <p><img src="../img/red-timer.png" id="timer" style="height: 20px; width: 20px; margin: 5px;"> ${timeDisplay}</p>
                        <button class="recipe-details-btn">View Details</button>
                    </div>
                </div>
            `;
        }
        container.innerHTML = out;
        placeholder.appendChild(container);

        // Add event listeners after the recipes are loaded
        document.querySelectorAll(".recipe-item").forEach((item, index) => {
            item.addEventListener("click", () => openModals(result.results[index]));
        });

        page++; // Increment the page for the next fetch
    } catch (error) {
        console.error(error);
    }
}

/*Open modal function*/
function openModal(recipe) {
    const modal = document.getElementById("myModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalIngredients = document.getElementById("modalIngredients");
    const modalInstructions = document.getElementById("modalInstructions");
    const modalSummary = document.getElementById("modalSummary");
    modalTitle.textContent = recipe.title;

    // Extract and process the steps from the provided HTML
    const stepsHtml = recipe.instructions;
    const stepsContainer = document.createElement('div');
    stepsContainer.innerHTML = stepsHtml;

    // Extract and process the steps from the provided HTML
    const stepsArray = recipe.analyzedInstructions[0].steps;

    // Extract text content from list items and create a numbered list
    const stepsListItems = stepsContainer.querySelectorAll('li');
    const numberedSteps = Array.from(stepsListItems).map((step, index) => `${index + 1}. ${step.textContent.trim()}`);

    // Extract and display ingredients
    const ingredientsArray = stepsArray.reduce((acc, step) => acc.concat(step.ingredients || []), []);

    // Create a list of ingredients
    const ingredientList = ingredientsArray.map((ingredient) => `${ingredient.name}`).join(', ');

    // Set modal ingredients
    modalIngredients.textContent = `Ingredients: ${ingredientList}`;

    // If there are no <li> elements, add numbers to the beginning of each line
    const plainTextSteps = stepsContainer.textContent.trim().split('\n').map((step, index) => `${index + 1}. ${step.trim()}`);

    // Set modal instructions with the numbered list or plain text
    modalInstructions.textContent = numberedSteps.length > 0 ? numberedSteps.join('\n') : plainTextSteps.join('\n');
    modalSummary.textContent = removeTags(recipe.summary);
    modal.style.display = "block";
}


function openModals(recipe) {
    const modal = document.getElementById("myModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalIngredients = document.getElementById("modalIngredients");
    const modalInstructions = document.getElementById("modalInstructions");
    const modalSummary = document.getElementById("modalSummary");

    // Populate modal title with recipe information
    modalTitle.textContent = recipe.title;

    // Extract and process the steps from the provided HTML
    const stepsArray = recipe.analyzedInstructions[0].steps;

    // Extract text content from steps and create a numbered list
    const numberedSteps = stepsArray.map((step) => `${step.number}. ${step.step.trim()}`);

    // Extract and display ingredients
    const ingredientsArray = stepsArray.reduce((acc, step) => acc.concat(step.ingredients || []), []);

    // Create a list of ingredients
    const ingredientList = ingredientsArray.map((ingredient) => `${ingredient.name}`).join(', ');

    // Set modal ingredients
    modalIngredients.textContent = `Ingredients: ${ingredientList}`;
    // Set modal instructions with the numbered list
    modalInstructions.textContent = numberedSteps.join('\n');
    modalSummary.textContent = removeTags(recipe.summary);
    modal.style.display = "block";
}

function removeTags(input) {
    return input.replace(/<[^>]*>/g, '');
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

/*Loads page with random recipes, results come from server-side instead of client-side*/
async function startRecipe() {
    try {
        const response = await fetch("/api/searchRecipe");
        const result = await response.json();

        let container = document.createElement("div");
        container.className = "recipe-container";
        container.style.display = "grid";
        container.style.boxShadow = "0px 2px 10px 1px #fc1c1c";

        let placeholder = document.querySelector("#recipe-results");
        let out = "";
        for (let recipe of result.recipes) {
            const {hours, minutes} = toHoursAndMinutes(recipe.readyInMinutes);
            const timeDisplay = `${hours > 0 ? hours + 'h ' : ''}${minutes}m`;
            out += `
                <div class="recipe-item" style="justify-content: center";>
                    <div>
                        <img  src="${recipe.image}" class="recipe-image">
                    </div> 
                    <div>
                        <div style="margin: 5px;">${recipe.dishTypes[0]}</div>
                        <h1 style="margin: 5px; font-size: 25px ;">${recipe.title}</h1>
                        <p><img src="../img/red-timer.png" id="timer" style="height: 20px; width: 20px; margin: 5px;"> ${timeDisplay}</p>
                        <!--find a way to center button and other items on page-->
                        <button class="recipe-details-btn">View Details</button>
                    </div>
                </div>
            `;
        }
        container.innerHTML = out;
        placeholder.appendChild(container);

        // Add event listeners after the recipes are loaded
        document.querySelectorAll(".recipe-item").forEach((item, index) => {
            item.addEventListener("click", () => openModal(result.recipes[index]));
        });

    } catch (error) {
        console.error(error);
    }
}
