window.onload = () => {
    // Initial random recipes loaded to page
    startRecipe();
};

//Converts minutes to hours if minutes exceed 60
//Taken from https://plainenglish.io/blog/javascript-convert-minutes-to-hours-and-minutes
function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return {hours, minutes};
}

/*Loads more recipes with the fetchRecipe function, find a way to check whether there's already been a search and call startRecipe
* if no previous search has been done*/
const loadMoreButton = document.getElementById("load-more-btn");
let currentPage = 1;

// Event listener for the "Load More" button
loadMoreButton.addEventListener("click", function (event) {
    event.preventDefault();
    $('#recipe-results').empty();
    window.scrollTo(0, 0);
    fetchRecipe(currentPage);
    currentPage++; // Increment for the next page
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

        let container = document.createElement("div");
        container.className = "recipe-container";
        container.style.display = "grid";
        //container.style.boxShadow = "0px 2px 10px 1px #fc1c1c";
        container.style.border = "solid 2px #B5b0b0";
        container.style.placeItems = "center";


        let placeholder = document.querySelector("#recipe-results");
        let out = "";
        for (let recipe of result.results) {
            const {hours, minutes} = toHoursAndMinutes(recipe.readyInMinutes);
            const timeDisplay = `${hours > 0 ? hours + 'h ' : ''}${minutes}m`;
            out += `
                <div class="recipe-item" style="justify-content: center";>
                    <div>
                        <img  src="${recipe.image}" class="recipe-image" alt="Image of recipe item return from API">
                    </div> 
                    <div>
                        <div style="margin: 5px;">${recipe.dishTypes[0]}</div>
                        <h1 style="margin: 5px; font-size: 25px ;">${recipe.title}</h1>
                        <p><img src="../img/red-timer.png" id="timer" style="height: 20px; width: 20px;" alt="red timer for cook time"> ${timeDisplay}</p>
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

    // Create and set modal title with image
    modalTitle.innerHTML = `<img src="img/spatula.png" style="width: 85px; height: 25px; margin-right: 25px; " alt="red spatula" class="modal-image">${recipe.title}`;

    // Extract and process the steps from the provided HTML
    const stepsHtml = recipe.instructions;
    const stepsContainer = document.createElement('div');
    stepsContainer.innerHTML = stepsHtml;

    // Extract and process the steps from the provided HTML
    const stepsArray = recipe.analyzedInstructions[0].steps;

    // Extract text content from list items and create a numbered list
    const stepsListItems = stepsContainer.querySelectorAll('li');
    const numberedSteps = Array.from(stepsListItems).map((step, index) => `${index + 1}. ${step.textContent.trim()}`);

    // If there are no <li> elements, add numbers to the beginning of each line
    const plainTextSteps = stepsContainer.textContent.trim().split('\n').map((step, index) => `${index + 1}. ${step.trim()}`);

    // Label the steps section
    const stepsLabel = "Steps:";
    const stepsContent = numberedSteps.length > 0 ? numberedSteps.join('<br>') : plainTextSteps.join('<br>');

    // Set modal instructions with the labeled and formatted content
    modalInstructions.innerHTML = `<strong style="font-size: 22px;">${stepsLabel}</strong><br>${stepsContent}`;

    // Extract and display ingredients
    const ingredientsArray = stepsArray.reduce((acc, step) => acc.concat(step.ingredients || []), []);

    // Create a list of ingredients
    const ingredientList = ingredientsArray.map((ingredient) => `${ingredient.name}`).join(', ');

    // Set modal ingredients
    modalIngredients.innerHTML = `<strong style="font-size: 22px;">Ingredients: </strong>${ingredientList}`;

    // Set modal summary
    modalSummary.innerHTML = `<strong style="font-size: 22px;">Summary: </strong>${removeTags(recipe.summary)}`;


    modal.style.display = "block";
}


function openModals(recipe) {
    const modal = document.getElementById("myModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalIngredients = document.getElementById("modalIngredients");
    const modalInstructions = document.getElementById("modalInstructions");
    const modalSummary = document.getElementById("modalSummary");

    // Populate modal title with recipe information
    modalTitle.innerHTML = `<img src="img/spatula.png" style="width: 85px; height: 25px; margin-right: 25px; " alt="Recipe Image" class="modal-image">${recipe.title}`;

    // Extract and process the steps from the provided HTML
    const stepsArray = recipe.analyzedInstructions[0].steps;

    // Extract text content from steps and create a numbered list
    const numberedSteps = stepsArray.map((step) => `${step.number}. ${step.step.trim()}`);

    // Extract and display ingredients
    const ingredientsArray = stepsArray.reduce((acc, step) => acc.concat(step.ingredients || []), []);

    // Create a list of ingredients
    const ingredientList = ingredientsArray.map((ingredient) => `${ingredient.name}`).join(', ');

    // Set modal ingredients
    modalIngredients.innerHTML = `<strong style="font-size: 22px;">Ingredients: </strong>${ingredientList}`;

    // Set modal instructions with the numbered list
    modalInstructions.textContent = numberedSteps.join('\n');

    // Label the steps section
    const stepsLabel = "Steps:";
    const stepsContent = numberedSteps.length > 0 ? numberedSteps.join('<br>') : plainTextSteps.join('<br>');

    // Set modal instructions with the labeled and formatted content
    modalInstructions.innerHTML = `<strong style="font-size: 22px;">${stepsLabel}</strong><br>${stepsContent}`;

    //Display recipe summary
    modalSummary.innerHTML = `<strong style="font-size: 22px;">Summary: </strong>${removeTags(recipe.summary)}`;
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
        container.style.border = "solid 2px #B5b0b0";
        container.style.padding = "5px"
        container.style.placeItems = "center";

        let placeholder = document.querySelector("#recipe-results");
        let out = "";
        for (let recipe of result.recipes) {
            const {hours, minutes} = toHoursAndMinutes(recipe.readyInMinutes);
            const timeDisplay = `${hours > 0 ? hours + 'h ' : ''}${minutes}m`;
            out += `
                <div class="recipe-item" style="justify-content: center";>
                    <div>
                        <img  src="${recipe.image}" class="recipe-image" alt="Image of recipe item return from API">
                    </div> 
                    <div>
                        <div style="margin: 5px; padding-top: 5px;">${recipe.dishTypes[0]}</div>
                        <h1 style="margin: 5px; font-size: 25px ;">${recipe.title}</h1>
                        <p><img src="../img/red-timer.png" id="timer" style="height: 20px; width: 20px;" alt="red timer for cook time"> ${timeDisplay}</p>
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
