const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container=document.querySelector('.container');
let searchQuery='';

const APP_ID = '4cd450da';
const APP_KEY='2ea77e45c96293460c39cc2c7282f1b8';




searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    // console.log(searchQuery);
    fetchAPI();
})


async function fetchAPI(){
    const baseURL=`https://api.edamam.com/api/recipes/v2?type=public&q="${searchQuery}"&app_id=${APP_ID}&app_key=${APP_KEY}`;
    const response =await fetch(baseURL);
    const data=await response.json();
    generateHTML(data.hits);
    console.log(data);
   
}

function generateHTML(results){
    container.classList.remove('intial');
    let generatedHTML='';
    results.map(result => {
        generatedHTML+=
        `
        <div class="item">
                <img src="${result.recipe.image}" alt="">
                <div class="flex-container">
                    <h1 class="title">${result.recipe.label}</h1>
                    <a href="${result.recipe.url}" target="_blank" class="view-button">View Recipe</a>
                </div>
                <p class="item-data">calories:${result.recipe.calories.toFixed(2)}</p>
                <p class="item-data">Diet label:${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels:"No Data Foumd"}</p>
                <p class="item-data">Health label:${result.recipe.healthLabels}</p>
            </div>
        `
    })

    searchResultDiv.innerHTML=generatedHTML;
}

