Calorie Tracker App
A simple calorie tracking app that allows users to track their food intake and monitor their total calorie consumption. The app supports adding, updating, and deleting food items, and calculates the total calories based on the user's entries.

Features
Add Food Item: Users can add food items with a name and calorie value.

Edit Food Item: Users can edit the name and calorie value of previously added items.

Delete Food Item: Users can delete individual food items from the list.

Clear All Items: Users can remove all items from the list at once.

Total Calories: The app calculates and displays the total calorie intake from the listed items.

Technologies Used
HTML: Markup for the app’s structure.

CSS: Styling for the app, including layout and design.

JavaScript: Functionality of the app including item management and calorie calculations.

Font Awesome: Icons for edit and delete actions.

Setup and Usage
Clone the repository:

git clone https://github.com/yourusername/calorie-tracker.git
Navigate into the project folder:

cd calorie-tracker
Open the project in your preferred code editor (VS Code, Sublime, etc.):

code .
Open the index.html file in your browser to see the app in action.

File Structure
index.html: The main HTML file for the app.

style.css: The CSS file for styling the app.

app.js: The JavaScript file that contains the logic for the calorie tracker (functions for adding, updating, deleting items, etc.).

How it Works
Item Controller
The ItemCtrl module manages the food items, including adding, updating, deleting, and tracking the total calorie intake. It uses a local data structure (data) to hold the items.

UI Controller
The UICtrl module manages the user interface (UI) updates. It displays food items in a list, handles user input, and updates the displayed total calorie count.

App Controller
The App module integrates the ItemCtrl and UICtrl modules. It initializes the app, loads event listeners, and handles form submissions, item edits, and item deletions.

Usage Instructions
Add an Item: Enter the name of the food and its calorie value, then click the "Add Item" button.

Edit an Item: Click the pencil icon next to an item, update its name or calorie value, and click the "Update" button.

Delete an Item: Click the trash icon next to an item to remove it.

Clear All Items: Click the "Clear All Items" button to remove all food items.

Total Calories: The total calorie count will update automatically based on the items in the list.

License
This project is licensed under the MIT License.

