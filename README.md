# Nutrition & Water Tracker 🥗💧

A simple and intuitive web application to track your daily food intake, water consumption, and compare your nutrient intake against personalized daily goals.

![Nutrition Tracker](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## Features

### 💧 Water Tracking
- Visual progress indicator showing your daily water consumption
- Quick-add buttons for common amounts (250ml, 500ml, 750ml)
- Custom amount input for precise tracking
- Real-time percentage display

### 🍽️ Food Intake
- Add foods with complete nutritional information:
  - Calories (kcal)
  - Protein (g)
  - Carbohydrates (g)
  - Fat (g)
- View all consumed foods in an organized list
- Remove individual items if logged incorrectly
- Complete nutrient breakdown for each food item

### 📊 Nutrient Tracking
- Track four key nutrients: Calories, Protein, Carbs, and Fat
- Visual progress bars with intelligent color coding:
  - 🟢 **Green**: Goal reached or exceeded
  - 🟡 **Yellow**: 70%+ of daily goal achieved
  - 🔴 **Red**: Below 70% of goal
- Real-time comparison of current intake vs. target amounts
- Display remaining nutrients needed to reach goals

### ⚙️ Customizable Goals
- Set personalized daily targets for all nutrients and water intake
- Goals persist across browser sessions
- Sensible default values provided:
  - 2000 kcal (Calories)
  - 50g (Protein)
  - 250g (Carbohydrates)
  - 70g (Fat)
  - 2000ml (Water)

### 💾 Data Management
- Automatic data persistence using browser local storage
- Automatic daily reset at midnight
- Export your data as a JSON file for backup or analysis
- Manual reset option for starting fresh

## Installation

No installation required! Simply:

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start tracking your nutrition!

```bash
git clone https://github.com/yourusername/nutrition-tracker.git
cd nutrition-tracker
```

Then open `index.html` in your preferred browser.

## Usage

1. **Set Your Goals**: Click on the goal inputs at the top and enter your personalized daily targets
2. **Track Water**: Use the quick-add buttons or enter a custom amount to log water intake
3. **Add Food**: Fill in the food name and nutritional values, then click "Add Food"
4. **Monitor Progress**: Check the summary section to see how close you are to your daily goals
5. **Export Data**: Click "Export Data" to download your daily log as a JSON file

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Modern styling with gradients, flexbox, and grid
- **JavaScript (Vanilla)**: All functionality without external dependencies
- **Local Storage API**: Data persistence

## File Structure

```
Food Tracker/
├── index.html      # Main HTML structure
├── styles.css      # All styling and responsive design
├── script.js       # Application logic and data management
└── README.md       # This file
```

## Privacy

All data is stored locally in your browser. No data is sent to any server or third party. Your nutritional information stays completely private on your device.

## Future Enhancements

Potential features for future versions:
- Meal categorization (breakfast, lunch, dinner, snacks)
- Historical data visualization with charts
- Common food database for quick entry
- Barcode scanning for packaged foods
- Mobile app version
- Calorie/macro suggestions based on goals

## Contributing

Feel free to fork this project and submit pull requests for any improvements!

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Created with ❤️ for health-conscious individuals

---

**Note**: This app is for tracking purposes only and does not provide medical or nutritional advice. Consult with healthcare professionals for personalized nutrition guidance.