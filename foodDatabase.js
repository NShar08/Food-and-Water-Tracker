const foodDatabase = {
    "apple": { name: "Apple (medium)", calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
    "banana": { name: "Banana (medium)", calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
    "orange": { name: "Orange (medium)", calories: 62, protein: 1.2, carbs: 15, fat: 0.2 },
    "chicken breast": { name: "Chicken Breast (100g)", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    "rice": { name: "White Rice (1 cup cooked)", calories: 205, protein: 4.2, carbs: 45, fat: 0.4 },
    "brown rice": { name: "Brown Rice (1 cup cooked)", calories: 218, protein: 5, carbs: 46, fat: 1.6 },
    "egg": { name: "Egg (large)", calories: 72, protein: 6, carbs: 0.4, fat: 5 },
    "bread": { name: "Whole Wheat Bread (1 slice)", calories: 80, protein: 4, carbs: 14, fat: 1 },
    "milk": { name: "Milk (1 cup)", calories: 149, protein: 8, carbs: 12, fat: 8 },
    "yogurt": { name: "Greek Yogurt (1 cup)", calories: 100, protein: 17, carbs: 6, fat: 0.7 },
    "salmon": { name: "Salmon (100g)", calories: 208, protein: 20, carbs: 0, fat: 13 },
    "tuna": { name: "Tuna (100g canned)", calories: 116, protein: 26, carbs: 0, fat: 0.8 },
    "beef": { name: "Beef (100g lean)", calories: 250, protein: 26, carbs: 0, fat: 15 },
    "pork": { name: "Pork Chop (100g)", calories: 231, protein: 23, carbs: 0, fat: 15 },
    "pasta": { name: "Pasta (1 cup cooked)", calories: 220, protein: 8, carbs: 43, fat: 1.3 },
    "potato": { name: "Potato (medium baked)", calories: 161, protein: 4.3, carbs: 37, fat: 0.2 },
    "sweet potato": { name: "Sweet Potato (medium)", calories: 112, protein: 2, carbs: 26, fat: 0.1 },
    "broccoli": { name: "Broccoli (1 cup)", calories: 31, protein: 2.6, carbs: 6, fat: 0.3 },
    "spinach": { name: "Spinach (1 cup)", calories: 7, protein: 0.9, carbs: 1.1, fat: 0.1 },
    "carrot": { name: "Carrot (medium)", calories: 25, protein: 0.6, carbs: 6, fat: 0.1 },
    "tomato": { name: "Tomato (medium)", calories: 22, protein: 1.1, carbs: 4.8, fat: 0.2 },
    "cucumber": { name: "Cucumber (1 cup)", calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1 },
    "avocado": { name: "Avocado (whole)", calories: 322, protein: 4, carbs: 17, fat: 29 },
    "almonds": { name: "Almonds (1 oz)", calories: 164, protein: 6, carbs: 6, fat: 14 },
    "peanut butter": { name: "Peanut Butter (2 tbsp)", calories: 188, protein: 8, carbs: 7, fat: 16 },
    "oatmeal": { name: "Oatmeal (1 cup cooked)", calories: 166, protein: 6, carbs: 28, fat: 3.6 },
    "cheese": { name: "Cheddar Cheese (1 oz)", calories: 114, protein: 7, carbs: 0.4, fat: 9 },
    "pizza": { name: "Pizza (1 slice)", calories: 285, protein: 12, carbs: 36, fat: 10 },
    "hamburger": { name: "Hamburger (1 regular)", calories: 354, protein: 20, carbs: 30, fat: 17 },
    "french fries": { name: "French Fries (medium)", calories: 365, protein: 4, carbs: 48, fat: 17 },
    "chocolate": { name: "Chocolate Bar (1 oz)", calories: 155, protein: 1.4, carbs: 17, fat: 9 },
    "ice cream": { name: "Ice Cream (1 cup)", calories: 273, protein: 5, carbs: 31, fat: 15 },
    "coffee": { name: "Coffee (black)", calories: 2, protein: 0.3, carbs: 0, fat: 0 },
    "soda": { name: "Soda (12 oz)", calories: 140, protein: 0, carbs: 39, fat: 0 },
    "orange juice": { name: "Orange Juice (1 cup)", calories: 112, protein: 1.7, carbs: 26, fat: 0.5 },
    "steak": { name: "Steak (6 oz)", calories: 456, protein: 54, carbs: 0, fat: 26 },
    "shrimp": { name: "Shrimp (100g)", calories: 99, protein: 24, carbs: 0.2, fat: 0.3 },
    "tofu": { name: "Tofu (100g)", calories: 76, protein: 8, carbs: 1.9, fat: 4.8 },
    "beans": { name: "Black Beans (1 cup)", calories: 227, protein: 15, carbs: 41, fat: 0.9 },
    "lentils": { name: "Lentils (1 cup cooked)", calories: 230, protein: 18, carbs: 40, fat: 0.8 },
    "quinoa": { name: "Quinoa (1 cup cooked)", calories: 222, protein: 8, carbs: 39, fat: 3.6 },
    "bagel": { name: "Bagel (plain)", calories: 289, protein: 11, carbs: 56, fat: 2 },
    "cereal": { name: "Cereal (1 cup)", calories: 147, protein: 2.7, carbs: 32, fat: 1.8 },
    "waffle": { name: "Waffle (1 piece)", calories: 218, protein: 6, carbs: 25, fat: 11 },
    "pancake": { name: "Pancake (1 medium)", calories: 86, protein: 2.4, carbs: 11, fat: 3.6 },
    "bacon": { name: "Bacon (2 slices)", calories: 86, protein: 6, carbs: 0.2, fat: 7 },
    "sausage": { name: "Sausage (1 link)", calories: 96, protein: 5, carbs: 1, fat: 8 },
    "turkey": { name: "Turkey Breast (100g)", calories: 135, protein: 30, carbs: 0, fat: 0.7 },
    "mushroom": { name: "Mushrooms (1 cup)", calories: 15, protein: 2.2, carbs: 2.3, fat: 0.2 },
    "bell pepper": { name: "Bell Pepper (1 medium)", calories: 24, protein: 1, carbs: 6, fat: 0.2 }
};

function searchFoodDatabase(query) {
    const lowerQuery = query.toLowerCase().trim();
    const results = [];

    for (const key in foodDatabase) {
        if (key.includes(lowerQuery) || foodDatabase[key].name.toLowerCase().includes(lowerQuery)) {
            results.push(foodDatabase[key]);
        }
    }

    return results.slice(0, 5);
}