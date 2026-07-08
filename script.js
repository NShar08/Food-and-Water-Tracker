let dailyGoals = {
    calories: 2000,
    protein: 50,
    carbs: 250,
    fat: 70,
    water: 2000
};

let dailyIntake = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    water: 0,
    foods: []
};

function initApp() {
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('currentDate').textContent = dateStr;

    loadData();
    updateAllDisplays();
}

function loadData() {
    const savedGoals = localStorage.getItem('dailyGoals');
    if (savedGoals) {
        dailyGoals = JSON.parse(savedGoals);
        document.getElementById('goalCalories').value = dailyGoals.calories;
        document.getElementById('goalProtein').value = dailyGoals.protein;
        document.getElementById('goalCarbs').value = dailyGoals.carbs;
        document.getElementById('goalFat').value = dailyGoals.fat;
        document.getElementById('goalWater').value = dailyGoals.water;
    }

    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('lastDate');

    if (savedDate === today) {
        const savedIntake = localStorage.getItem('dailyIntake');
        if (savedIntake) {
            dailyIntake = JSON.parse(savedIntake);
        }
    } else {
        resetDay();
        localStorage.setItem('lastDate', today);
    }
}

function saveData() {
    localStorage.setItem('dailyGoals', JSON.stringify(dailyGoals));
    localStorage.setItem('dailyIntake', JSON.stringify(dailyIntake));
    localStorage.setItem('lastDate', new Date().toDateString());
}

function saveGoals() {
    dailyGoals.calories = parseInt(document.getElementById('goalCalories').value) || 2000;
    dailyGoals.protein = parseInt(document.getElementById('goalProtein').value) || 50;
    dailyGoals.carbs = parseInt(document.getElementById('goalCarbs').value) || 250;
    dailyGoals.fat = parseInt(document.getElementById('goalFat').value) || 70;
    dailyGoals.water = parseInt(document.getElementById('goalWater').value) || 2000;

    saveData();
    updateAllDisplays();

    alert('Goals saved successfully!');
}

function addWater(amount) {
    dailyIntake.water += amount;
    saveData();
    updateWaterDisplay();
}

function addCustomWater() {
    const amount = parseInt(document.getElementById('customWater').value);
    if (amount && amount > 0) {
        addWater(amount);
        document.getElementById('customWater').value = '';
    }
}

function updateWaterDisplay() {
    const percentage = Math.min((dailyIntake.water / dailyGoals.water) * 100, 100);
    document.getElementById('waterFill').style.height = percentage + '%';
    document.getElementById('waterAmount').textContent = dailyIntake.water;
    document.getElementById('waterGoal').textContent = dailyGoals.water;
}

function addFood() {
    const name = document.getElementById('foodName').value;
    const calories = parseFloat(document.getElementById('foodCalories').value) || 0;
    const protein = parseFloat(document.getElementById('foodProtein').value) || 0;
    const carbs = parseFloat(document.getElementById('foodCarbs').value) || 0;
    const fat = parseFloat(document.getElementById('foodFat').value) || 0;

    if (!name) {
        alert('Please enter a food name');
        return;
    }

    const food = {
        id: Date.now(),
        name,
        calories,
        protein,
        carbs,
        fat
    };

    dailyIntake.foods.push(food);
    dailyIntake.calories += calories;
    dailyIntake.protein += protein;
    dailyIntake.carbs += carbs;
    dailyIntake.fat += fat;

    document.getElementById('foodName').value = '';
    document.getElementById('foodCalories').value = '';
    document.getElementById('foodProtein').value = '';
    document.getElementById('foodCarbs').value = '';
    document.getElementById('foodFat').value = '';

    saveData();
    updateAllDisplays();
}

function removeFood(id) {
    const food = dailyIntake.foods.find(f => f.id === id);
    if (food) {
        dailyIntake.calories -= food.calories;
        dailyIntake.protein -= food.protein;
        dailyIntake.carbs -= food.carbs;
        dailyIntake.fat -= food.fat;

        dailyIntake.foods = dailyIntake.foods.filter(f => f.id !== id);

        saveData();
        updateAllDisplays();
    }
}

function updateFoodList() {
    const foodList = document.getElementById('foodList');
    foodList.innerHTML = '';

    dailyIntake.foods.forEach(food => {
        const foodItem = document.createElement('div');
        foodItem.className = 'food-item';
        foodItem.innerHTML = `
            <div class="food-info">
                <h4>${food.name}</h4>
                <div class="food-nutrients">
                    <span>${food.calories} kcal</span>
                    <span>P: ${food.protein}g</span>
                    <span>C: ${food.carbs}g</span>
                    <span>F: ${food.fat}g</span>
                </div>
            </div>
            <button class="btn-remove" onclick="removeFood(${food.id})">Remove</button>
        `;
        foodList.appendChild(foodItem);
    });
}

function updateNutrientDisplay(nutrient) {
    const current = Math.round(dailyIntake[nutrient] * 10) / 10;
    const target = dailyGoals[nutrient];
    const percentage = Math.min((current / target) * 100, 100);
    const remaining = Math.max(target - current, 0);

    const capitalizedNutrient = nutrient.charAt(0).toUpperCase() + nutrient.slice(1);

    document.getElementById(`progress${capitalizedNutrient}`).style.width = percentage + '%';
    document.getElementById(`current${capitalizedNutrient}`).textContent = current;
    document.getElementById(`target${capitalizedNutrient}`).textContent = target;

    const unit = nutrient === 'calories' ? 'kcal' : 'g';
    const remainingText = remaining > 0 ? `${Math.round(remaining * 10) / 10}${unit} remaining` : 'Goal reached!';
    document.getElementById(`remaining${capitalizedNutrient}`).textContent = remainingText;

    if (current >= target) {
        document.getElementById(`progress${capitalizedNutrient}`).style.background = 'linear-gradient(90deg, #51cf66 0%, #40c057 100%)';
    } else if (current >= target * 0.7) {
        document.getElementById(`progress${capitalizedNutrient}`).style.background = 'linear-gradient(90deg, #ffd43b 0%, #fab005 100%)';
    } else {
        document.getElementById(`progress${capitalizedNutrient}`).style.background = 'linear-gradient(90deg, #ff6b6b 0%, #ff5252 100%)';
    }
}

function updateAllDisplays() {
    updateWaterDisplay();
    updateFoodList();
    updateNutrientDisplay('calories');
    updateNutrientDisplay('protein');
    updateNutrientDisplay('carbs');
    updateNutrientDisplay('fat');
}

function resetDay() {
    if (confirm('Are you sure you want to reset today\'s data?')) {
        dailyIntake = {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            water: 0,
            foods: []
        };
        saveData();
        updateAllDisplays();
    }
}

function exportData() {
    const today = new Date().toISOString().split('T')[0];
    const data = {
        date: today,
        goals: dailyGoals,
        intake: dailyIntake
    };

    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `nutrition-tracker-${today}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('Data exported successfully!');
}

window.onload = initApp;