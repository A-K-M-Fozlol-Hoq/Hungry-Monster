// Starting point
fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese')
.then(res => res.json())
.then(data=>{
    displayMeals(data.meals,'meals');
})


// This function will search meal by meal name
const searchByName=()=>{
    const mealName= document.getElementById('meal-name').value;
    const namePart= mealName.charAt(0).toLowerCase();
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?f=${namePart}`;
    //note : This URL does not work every time 
    fetch(url)
    .then(res => res.json())
    .then(data=>{
        displayMeals(data.meals,'meals');
    })
    .catch(error=>{
        console.log(error);
        alert('Server side error, Please search again. This URL does not work every time ')
    })
    
}


// This function will display meal, it takes two arguments. 1-> data, 2-> The ID where have to show data
const displayMeals=(data,ID)=>{
    const mealsDiv= document.getElementById(ID);
    const meals= data;
    meals.forEach(meal => {
        const mealDiv= document.createElement('div');
        mealDiv.className='meal';
        const mealInfo= `
        <img class="meal-img" src="${meal.strMealThumb}"/>
        <a onclick="showDetail(${meal.idMeal})" href="#"><p>${meal.strMeal}</p></a>
        `;
        mealDiv.innerHTML=mealInfo;
        mealsDiv.appendChild(mealDiv);
    });
}


// After clicking any meal name, this function will execute and it will display detail about the meal/food.
const showDetail=id=>{
    // Search by ID
    const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        const meal =data.meals[0];
        const detailsDiv= document.getElementById('details');
        const mealDiv= document.createElement('div');
        mealDiv.className='meal'
        const mealDetails= `
        <div >
            <img class="meal-img" src="${meal.strMealThumb}"/>
            <a onclick="showDetail(${meal.idMeal})" href="#"><p>${meal.strMeal} ${meal.strIngredient10}</p></a>
        </div>
        `; 
        document.getElementById("ingredient").innerHTML=``;
        document.getElementById('ingredient-header').innerText='Ingredient';
        for(let i=1; i<=20; i++){
            const ingredient = `strIngredient${i}`;
            const measure = `strMeasure${i}`;
            if(meal[ingredient] && meal[measure]){
                const li= document.createElement('li');
                li.innerHTML=`${meal[ingredient]} ${meal[measure]}`
                const ul=document.getElementById("ingredient")
                ul.appendChild(li)
            }
        }
        mealDiv.innerHTML=mealDetails;
        detailsDiv.innerHTML=``;
        detailsDiv.appendChild(mealDiv);
    })
}