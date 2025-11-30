// Nutrition data (per serving)
const recipes = {
    fishCurry: { calories: 250, protein: 20, carbs: 10, fat: 15 },
    porkVindaloo: { calories: 350, protein: 25, carbs: 8, fat: 25 },
    chickenXacuti: { calories: 300, protein: 28, carbs: 10, fat: 18 },
    prawnBalchao: { calories: 220, protein: 18, carbs: 5, fat: 12 },
    chickenCafreal: { calories: 280, protein: 30, carbs: 5, fat: 15 },
    sorpotel: { calories: 320, protein: 22, carbs: 10, fat: 24 },
    sanna: { calories: 150, protein: 4, carbs: 30, fat: 2 },
    goanRedRice: { calories: 200, protein: 5, carbs: 45, fat: 1 },
    chorisPao: { calories: 400, protein: 15, carbs: 35, fat: 22 },
    rosOmelette: { calories: 250, protein: 18, carbs: 5, fat: 18 },
    ravaFriedFish: { calories: 270, protein: 25, carbs: 15, fat: 12 },
    crabXecXec: { calories: 300, protein: 28, carbs: 8, fat: 18 },
    bebinca: { calories: 300, protein: 4, carbs: 50, fat: 12 },
    dodol: { calories: 350, protein: 3, carbs: 55, fat: 15 },
    solKadhi: { calories: 80, protein: 1, carbs: 5, fat: 6 },
    feniUrrak: { calories: 120, protein: 0, carbs: 0, fat: 0 }
};

// DOM elements
const recipeSelect = document.getElementById('recipe');
const servingsInput = document.getElementById('servings');
const caloriesEl = document.getElementById('calories');
const proteinEl = document.getElementById('protein');
const carbsEl = document.getElementById('carbs');
const fatEl = document.getElementById('fat');
const calculateBtn = document.getElementById('calculate');
const resetBtn = document.getElementById('reset');
let chart;

// Calculate nutrition
calculateBtn.addEventListener('click', () => {
    const recipe = recipeSelect.value;
    const servings = parseInt(servingsInput.value);

    if (!recipe) {
        alert("Please select a recipe");
        return;
    }

    const data = recipes[recipe];

    const totalCalories = data.calories * servings;
    const totalProtein = data.protein * servings;
    const totalCarbs = data.carbs * servings;
    const totalFat = data.fat * servings;

    caloriesEl.textContent = totalCalories;
    proteinEl.textContent = totalProtein;
    carbsEl.textContent = totalCarbs;
    fatEl.textContent = totalFat;

    updateChart(totalProtein, totalCarbs, totalFat);
});

// Reset
resetBtn.addEventListener('click', () => {
    recipeSelect.value = "";
    servingsInput.value = 1;
    caloriesEl.textContent = 0;
    proteinEl.textContent = 0;
    carbsEl.textContent = 0;
    fatEl.textContent = 0;

    if (chart) chart.destroy();
});

// Chart.js function
function updateChart(protein, carbs, fat) {
    const ctx = document.getElementById('nutritionChart').getContext('2d');
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Protein (g)', 'Carbs (g)', 'Fat (g)'],
            datasets: [{
                label: 'Nutrition Breakdown',
                data: [protein, carbs, fat],
                backgroundColor: ['#3498db', '#f1c40f', '#e74c3c']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}