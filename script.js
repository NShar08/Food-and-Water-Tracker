let userProfile = {
    age: 30,
    weight: 70,
    height: 170,
    gender: 'male',
    activityLevel: 'moderate'
};

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

let savedEntries = [];
let charts = {};

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
    initCharts();
}

function loadData() {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        userProfile = JSON.parse(savedProfile);
        document.getElementById('userAge').value = userProfile.age;
        document.getElementById('userWeight').value = userProfile.weight;
        document.getElementById('userHeight').value = userProfile.height;
        document.getElementById('userGender').value = userProfile.gender;
        document.getElementById('activityLevel').value = userProfile.activityLevel;
    }

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
        dailyIntake = {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            water: 0,
            foods: []
        };
        localStorage.setItem('lastDate', today);
    }

    const savedEntriesData = localStorage.getItem('savedEntries');
    if (savedEntriesData) {
        savedEntries = JSON.parse(savedEntriesData);
        savedEntries = savedEntries.slice(-21);
    }
}

function saveData() {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    localStorage.setItem('dailyGoals', JSON.stringify(dailyGoals));
    localStorage.setItem('dailyIntake', JSON.stringify(dailyIntake));
    localStorage.setItem('lastDate', new Date().toDateString());
    localStorage.setItem('savedEntries', JSON.stringify(savedEntries));
}

function calculateGoals() {
    userProfile.age = parseInt(document.getElementById('userAge').value) || 30;
    userProfile.weight = parseInt(document.getElementById('userWeight').value) || 70;
    userProfile.height = parseInt(document.getElementById('userHeight').value) || 170;
    userProfile.gender = document.getElementById('userGender').value;
    userProfile.activityLevel = document.getElementById('activityLevel').value;

    let bmr;
    if (userProfile.gender === 'male') {
        bmr = 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age + 5;
    } else {
        bmr = 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age - 161;
    }

    const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725
    };

    const tdee = Math.round(bmr * activityMultipliers[userProfile.activityLevel]);

    dailyGoals.calories = tdee;
    dailyGoals.protein = Math.round(userProfile.weight * 1.6);
    dailyGoals.carbs = Math.round((tdee * 0.5) / 4);
    dailyGoals.fat = Math.round((tdee * 0.3) / 9);
    dailyGoals.water = Math.round(userProfile.weight * 35);

    document.getElementById('goalCalories').value = dailyGoals.calories;
    document.getElementById('goalProtein').value = dailyGoals.protein;
    document.getElementById('goalCarbs').value = dailyGoals.carbs;
    document.getElementById('goalFat').value = dailyGoals.fat;
    document.getElementById('goalWater').value = dailyGoals.water;

    saveData();
    updateAllDisplays();

    alert(`Recommended goals calculated based on your profile!\nCalories: ${tdee} kcal\nProtein: ${dailyGoals.protein}g\nCarbs: ${dailyGoals.carbs}g\nFat: ${dailyGoals.fat}g\nWater: ${dailyGoals.water}ml`);
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

function searchFood() {
    const query = document.getElementById('foodSearchInput').value;
    if (!query.trim()) {
        alert('Please enter a food name to search');
        return;
    }

    const results = searchFoodDatabase(query);
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p style="padding:10px;color:#666;">No results found. Try a different search or add manually.</p>';
        return;
    }

    results.forEach(food => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
            <h4>${food.name}</h4>
            <p>${food.calories} kcal | P: ${food.protein}g | C: ${food.carbs}g | F: ${food.fat}g</p>
        `;
        resultItem.onclick = () => addFoodFromDatabase(food);
        resultsContainer.appendChild(resultItem);
    });
}

function addFoodFromDatabase(food) {
    const foodItem = {
        id: Date.now(),
        name: food.name,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat
    };

    dailyIntake.foods.push(foodItem);
    dailyIntake.calories += food.calories;
    dailyIntake.protein += food.protein;
    dailyIntake.carbs += food.carbs;
    dailyIntake.fat += food.fat;

    document.getElementById('foodSearchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';

    saveData();
    updateAllDisplays();
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
    displaySavedEntries();
}

function saveEntry() {
    if (dailyIntake.foods.length === 0 && dailyIntake.water === 0) {
        alert('No data to save. Please add some food or water intake first.');
        return;
    }

    const entry = {
        date: new Date().toISOString(),
        dateString: new Date().toLocaleDateString('en-US'),
        goals: { ...dailyGoals },
        intake: { ...dailyIntake, foods: [...dailyIntake.foods] }
    };

    savedEntries.push(entry);
    if (savedEntries.length > 21) {
        savedEntries = savedEntries.slice(-21);
    }

    saveData();
    displaySavedEntries();
    updateCharts();

    alert('Entry saved successfully!');
}

function displaySavedEntries() {
    const entriesList = document.getElementById('savedEntriesList');
    entriesList.innerHTML = '';

    if (savedEntries.length === 0) {
        entriesList.innerHTML = '<p style="padding:15px;color:#666;">No saved entries yet. Click "Save Today\'s Entry" to save your current data.</p>';
        return;
    }

    savedEntries.slice().reverse().forEach((entry, index) => {
        const actualIndex = savedEntries.length - 1 - index;
        const entryItem = document.createElement('div');
        entryItem.className = 'entry-item';
        entryItem.innerHTML = `
            <div class="entry-info">
                <h4>${entry.dateString}</h4>
                <div class="entry-stats">
                    <span>${Math.round(entry.intake.calories)} / ${entry.goals.calories} kcal</span>
                    <span>P: ${Math.round(entry.intake.protein)}g</span>
                    <span>C: ${Math.round(entry.intake.carbs)}g</span>
                    <span>F: ${Math.round(entry.intake.fat)}g</span>
                    <span>💧 ${entry.intake.water}ml</span>
                </div>
            </div>
            <button class="btn-remove" onclick="removeEntry(${actualIndex})">Remove</button>
        `;
        entriesList.appendChild(entryItem);
    });
}

function removeEntry(index) {
    if (confirm('Are you sure you want to remove this entry?')) {
        savedEntries.splice(index, 1);
        saveData();
        displaySavedEntries();
        updateCharts();
    }
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

function exportCSV() {
    if (savedEntries.length === 0) {
        alert('No saved entries to export. Save some entries first!');
        return;
    }

    let csv = 'Date,Calories,Calories Goal,Protein (g),Protein Goal,Carbs (g),Carbs Goal,Fat (g),Fat Goal,Water (ml),Water Goal\n';

    savedEntries.forEach(entry => {
        csv += `${entry.dateString},`;
        csv += `${Math.round(entry.intake.calories)},${entry.goals.calories},`;
        csv += `${Math.round(entry.intake.protein)},${entry.goals.protein},`;
        csv += `${Math.round(entry.intake.carbs)},${entry.goals.carbs},`;
        csv += `${Math.round(entry.intake.fat)},${entry.goals.fat},`;
        csv += `${entry.intake.water},${entry.goals.water}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nutrition-tracker-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('Data exported as CSV successfully!');
}

function showPage(pageName) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    if (pageName === 'tracker') {
        document.getElementById('trackerPage').classList.add('active');
        document.querySelectorAll('.nav-btn')[0].classList.add('active');
    } else if (pageName === 'analytics') {
        document.getElementById('analyticsPage').classList.add('active');
        document.querySelectorAll('.nav-btn')[1].classList.add('active');
        updateCharts();
        updateStats();
    }
}

function initCharts() {
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        }
    };

    charts.calories = new Chart(document.getElementById('caloriesChart'), {
        type: 'line',
        data: { labels: [], datasets: [] },
        options: chartOptions
    });

    charts.water = new Chart(document.getElementById('waterChart'), {
        type: 'bar',
        data: { labels: [], datasets: [] },
        options: chartOptions
    });

    charts.macros = new Chart(document.getElementById('macrosChart'), {
        type: 'doughnut',
        data: { labels: [], datasets: [] },
        options: chartOptions
    });

    charts.weekly = new Chart(document.getElementById('weeklyChart'), {
        type: 'bar',
        data: { labels: [], datasets: [] },
        options: {
            ...chartOptions,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateCharts() {
    if (savedEntries.length === 0) return;

    const last7Entries = savedEntries.slice(-7);
    const dates = last7Entries.map(e => e.dateString);

    charts.calories.data.labels = dates;
    charts.calories.data.datasets = [
        {
            label: 'Calories Consumed',
            data: last7Entries.map(e => Math.round(e.intake.calories)),
            borderColor: '#667eea',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            tension: 0.4
        },
        {
            label: 'Calorie Goal',
            data: last7Entries.map(e => e.goals.calories),
            borderColor: '#51cf66',
            backgroundColor: 'rgba(81, 207, 102, 0.1)',
            borderDash: [5, 5],
            tension: 0.4
        }
    ];
    charts.calories.update();

    charts.water.data.labels = dates;
    charts.water.data.datasets = [
        {
            label: 'Water Intake (ml)',
            data: last7Entries.map(e => e.intake.water),
            backgroundColor: '#4facfe',
        },
        {
            label: 'Water Goal (ml)',
            data: last7Entries.map(e => e.goals.water),
            backgroundColor: '#00f2fe',
        }
    ];
    charts.water.update();

    const latestEntry = last7Entries[last7Entries.length - 1];
    charts.macros.data.labels = ['Protein', 'Carbs', 'Fat'];
    charts.macros.data.datasets = [{
        data: [
            Math.round(latestEntry.intake.protein),
            Math.round(latestEntry.intake.carbs),
            Math.round(latestEntry.intake.fat)
        ],
        backgroundColor: ['#ff6b6b', '#ffd43b', '#51cf66']
    }];
    charts.macros.update();

    charts.weekly.data.labels = dates;
    charts.weekly.data.datasets = [
        {
            label: 'Protein (g)',
            data: last7Entries.map(e => Math.round(e.intake.protein)),
            backgroundColor: '#ff6b6b'
        },
        {
            label: 'Carbs (g)',
            data: last7Entries.map(e => Math.round(e.intake.carbs)),
            backgroundColor: '#ffd43b'
        },
        {
            label: 'Fat (g)',
            data: last7Entries.map(e => Math.round(e.intake.fat)),
            backgroundColor: '#51cf66'
        }
    ];
    charts.weekly.update();
}

function updateStats() {
    const statsGrid = document.getElementById('statsGrid');
    statsGrid.innerHTML = '';

    if (savedEntries.length === 0) {
        statsGrid.innerHTML = '<p style="padding:15px;color:#666;grid-column:1/-1;">No data available. Save some entries to see statistics.</p>';
        return;
    }

    const avgCalories = Math.round(savedEntries.reduce((sum, e) => sum + e.intake.calories, 0) / savedEntries.length);
    const avgProtein = Math.round(savedEntries.reduce((sum, e) => sum + e.intake.protein, 0) / savedEntries.length);
    const avgCarbs = Math.round(savedEntries.reduce((sum, e) => sum + e.intake.carbs, 0) / savedEntries.length);
    const avgFat = Math.round(savedEntries.reduce((sum, e) => sum + e.intake.fat, 0) / savedEntries.length);
    const avgWater = Math.round(savedEntries.reduce((sum, e) => sum + e.intake.water, 0) / savedEntries.length);

    const stats = [
        { label: 'Avg Calories', value: `${avgCalories} kcal` },
        { label: 'Avg Protein', value: `${avgProtein}g` },
        { label: 'Avg Carbs', value: `${avgCarbs}g` },
        { label: 'Avg Fat', value: `${avgFat}g` },
        { label: 'Avg Water', value: `${avgWater}ml` },
        { label: 'Total Entries', value: savedEntries.length }
    ];

    stats.forEach(stat => {
        const statCard = document.createElement('div');
        statCard.className = 'stat-card';
        statCard.innerHTML = `
            <h4>${stat.label}</h4>
            <p>${stat.value}</p>
        `;
        statsGrid.appendChild(statCard);
    });
}

window.onload = initApp;