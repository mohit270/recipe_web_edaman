const search_button = document.querySelector('.search-button');
const search_box = document.querySelector('.search-box');
const recipe_container = document.querySelector('.recipe-container');
const recipe_details_content = document.querySelector('.recipe-details-content');
const close_btn = document.querySelector('.recipe-close-btn');
const API_ID = '750cd122';
const API_KEY = 'cb0b543f4ceebc948a56f8c79d8dc729';
const BASEURL = `https://api.edamam.com/search?q=pizza&app_id=${API_ID}&app_key=${API_KEY}&to=20`;
const next = document.querySelector('.recipe-more');


// const data = async function fatching(query){
//     const base_url = `https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}&to=20`;
//     const data = await fetch(base_url);
//     const response = data.json();
//     return response;

// }
let querylast = '';
let querycount;
document.addEventListener('DOMContentLoaded', function () {
    const defaultSearchQuery = 'today';
    search_box.value = defaultSearchQuery;
    fetchRecipe(defaultSearchQuery,21);
});

const fetchRecipe = async(query,count)=> {
    querylast = query;
    querycount = count;
    try{
        if(query != 'today') recipe_container.innerHTML = ` <h3 class="dialer">Searching Your Recipes....</h3>`;
        const base_url = `https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}&to=${count}`;
        const data = await fetch(base_url);
        const response = await data.json();
        if(query != 'today') recipe_container.innerHTML = ``;
        console.log(response);
            response.hits.forEach(meal => {
                console.log(meal);
                const div_meal = document.createElement('div');
                div_meal.classList.add('recipe');
                div_meal.innerHTML = `<img src="${meal.recipe.image}">
                                            <h3>${meal.recipe.label}</h3>
                                            <p><span>${meal.recipe.cuisineType}</span> Dish</p>
                                            <p>Belong to <span>${meal.recipe.dishType}</span> Category</p>
                                        </div> `;
                                        
                const button  = document.createElement('button');
                button.textContent = 'View Recipe';
                div_meal.appendChild(button);

                // adding EventListener to button
                button.addEventListener('click',()=>{
                    openRecipePopup(meal.recipe);
                });

                recipe_container.appendChild(div_meal);


                
            });
        }catch(e){
            recipe_container.innerHTML = ` <h3 class="dialer">Error in Searching Your Recipes....</h3>`;
        }
    }

//function to fetch_ingredients and fetch_nutrients
const fetch_ingredients = (meals)=>{
    const meal = Array.from(meals);
    let ingredientsList = "";
    console.log(meal);
    meal.forEach(ingredient=>{
        // if(ingredient){
        //     const measure = meal[`strMeasure${i}`];
        //     ingredientsList += `<li>${measure} ${ingredient}</li>`;
        // }
        ingredientsList += `<li>${ingredient}</li>`;
    });return ingredientsList;
}
const fetch_nutrients = (meals)=>{
    const meal = Array.from(meals);
    let ingredientsList = "";
    console.log(meal);
    meal.forEach(ingredient=>{
        ingredientsList += `<li>${ingredient.label} => ${parseInt(ingredient.total)}${ingredient.unit}</li>`;
    });return ingredientsList;
}

next.addEventListener('click',()=>{
    fetchRecipe(querylast,querycount+9);
})
const openRecipePopup = (meal)=>{
    recipe_details_content.innerHTML = `
    <img src="${meal.image}" class="recipe-details-content-youtube-link">
    <u class="recipe-details-content-recipe-name">${meal.label}</u>
    <u class="recipe-details-content-recipe-area">${meal.cuisineType} ${meal.dishType}</u>
    <u class="recipe-details-content-recipe-time">Time: ${meal.totalTime} min</u>
    <u class="recipe-details-content-recipe-calories">calories: ${parseInt(meal.calories)}</u>
    <u class="recipe-details-content-recipe-ingredient-list">Ingredients:<h3>
    <ul class="recipe-details-content-recipe-ingredient">${fetch_ingredients(meal.ingredientLines)}</ul>
    <h3 class="recipe-details-content-recipe-nutrients-list">Nutrients:<h3>
    <ul class="recipe-details-content-recipe-nutrients">${fetch_nutrients(meal.digest)}</ul>
    <a href="${meal.url}" class="recipe-details-content-recipe-instruction">Intructions</a>
    `;
    recipe_details_content.parentElement.style.display = 'block';
}

close_btn.addEventListener('click',()=>{
    recipe_details_content.parentElement.style.display = 'none';
})

search_button.addEventListener('click',(e)=>{
    e.preventDefault();
    const query = search_box.value.trim();
    fetchRecipe(query);
});


// const meal_url = (url)=>{
//     const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

//     // Match the regex against the URL
//     const match = url.match(regex);

//     // If a match is found, return the video ID, otherwise return null
//     return match ? match[1] : null;
// }