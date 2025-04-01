//Storage Controller

//Item Controller
const ItemCtrl = function(){
  //Item Constructor
  const Item = function(id, name, calorie){
    this.id = id;
    this.name = name;
    this.calorie = calorie;
  }

  //Data Structure
  const data = {
    Items: [
      // {id: 0, name: 'Steak Dinner', calorie: 1200},
      // {id: 1, name: 'Cookie', calorie: 400},
      // {id: 2, name: 'Egg', calorie: 300}
    ],
    currentItem: null,
    totalCalorie: 0
  }

  //Public Methods
  return {
    getItem: function(){
      return data.Items;
    },
    addItem: function(name, calories){
      //Create ID
      let ID;

      if(data.Items.length > 0){
        ID = data.Items[data.Items.length - 1].id + 1;
      } else{
        ID = 0
      }

      //Calories to number
      calories = parseInt(calories)

      //Create new item
      newItem = new Item(ID, name, calories)

      //Add Item to array
      data.Items.push(newItem)

      return newItem;
    },
    getItemById: function(id){
      let found = null;

      //Loop through items
      data.Items.forEach(function(item){
         if(item.id === id){
           found = item
         }
      })

      return found;
    },
    updateItem: function(name, calorie){
      //Calories to number
      calorie = parseInt(calorie);

      let found = null;

      data.Items.forEach(function(item){
         if(item.id === data.currentItem.id){
           item.name =  name;
           item.calorie = calorie;
           found = item;
         }
      })

      return found;
    },
    deleteItem: function(id){
      //Get Ids
      const ids = data.Items.map(function(item){
        return item.id;
      })

      //Get Index
      const index = ids.indexOf(id);

      //Remove items
      data.Items.splice(index, 1)

    },
    clearAllItems: function(){
      data.Items = [];
    },
    setCurrentItem: function(item){
      data.currentItem = item;
    },
    getCurrentItem: function(){
      return data.currentItem;
    },
    getTotalCalories: function(){
      let total = 0;

      data.Items.forEach(function(item){
        total += item.calorie;
      })

      data.totalCalorie = total;

      return data.totalCalorie;
    },
    logData: function(){
      return data;
    }
  }
}()

//UI Controller
const UICtrl = function(){
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-meal',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  }
  //Public Methods
   return {
    populateItemList: function(items){
      let html = '';
      items.forEach(function(item){
        html += `
          <li class="collection-item" id="item-${item.id}"><strong>${item.name}: </strong> <em>${item.calorie} Calorie</em> <a href="#" class="secondary-content"><i class="fa edit-item fa-pencil"></i></a></li>
        `
      });
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getSelectors: function(){
      return UISelectors;
    },
    getInputItem: function(){
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function(item){
      //Show list items
      document.querySelector(UISelectors.itemList).style.display = 'block'
      //Create li Element
      const li = document.createElement('li');
      //Add class
      li.className = 'collection-item';
      //Add ID
      li.id = `item-${item.id}`;
      //Add Html
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calorie} Calories</em> <a href="#" class="secondary-content"><i class="fa edit-item fa-pencil"></i></a>`;
      //Output li
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
    },
    updateListItem: function(item){
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //Turn Node list into array
      listItems = Array.from(listItems);

      listItems.forEach(function(listItem){
        const itemID = listItem.getAttribute('id');

        if(itemID === `item-${item.id}`){
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calorie} Calories</em> <a href="#" class="secondary-content"><i class="fa edit-item fa-pencil"></i></a>`;
        }
      })
    },
    deleteListItem: function(id){
      const itemID = `#item-${id}`;
     const item = document.querySelector(itemID);
     item.remove() 
    },
    addItemToForm: function(){
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calorie;
      UICtrl.showEditState();
     },
    removeItems: function(){
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //Turn node list into array
      listItems = Array.from(listItems);

      listItems.forEach(function(item){
        item.remove()
      })

     //Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Show total calories in UI
      UICtrl.showTotalCalories(totalCalories); 

      UICtrl.removeItems();

      //Hide Ul list
      UICtrl.hidelist();

    },
    hidelist: function(){
     document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: function(totalCalories){
     document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearInput: function(){
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    clearEditState: function(){
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState: function(){
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    }
   }

}()

//App Controller
const App = function(ItemCtrl, UICtrl){
  //Load Event Listeners
  const loadEventListener = function(){
    const UISelectors = UICtrl.getSelectors();

    //Add Item Event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    //Edit Icon event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    //Update list event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    //Back list event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

    //Delete list event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    //Clear all items
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick)
  }

  const itemAddSubmit = function(e){
    //Get Form Input
    const input = UICtrl.getInputItem();

    //Check for input name and calories input
    if(input.name !== '' && input.calories !== ''){
      //Add New Item
      const newItem = ItemCtrl.addItem(input.name, input.calories)

      //Add item to ui
      UICtrl.addListItem(newItem);

      //Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Show total calories in UI
      UICtrl.showTotalCalories(totalCalories); 

      //Clear Input fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

  const itemEditClick = function(e){
    if(e.target.classList.contains('edit-item')){
      //Get list ID
      const listId = e.target.parentNode.parentNode.id;

      //Break into array
      const listIdArr = listId.split('-');

      //Get Id
      const id = parseInt(listIdArr[1]);

      //Get item to edit
      const itemToEdit = ItemCtrl.getItemById(id);

      //Set Current Item
      ItemCtrl.setCurrentItem(itemToEdit);

      //Add item to form
      UICtrl.addItemToForm();
    }

    e.preventDefault();
  }

  const itemUpdateSubmit = function(e){
    const input = UICtrl.getInputItem();

    //Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    //Update item in UI
    UICtrl.updateListItem(updatedItem);

    //Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Show total calories in UI
    UICtrl.showTotalCalories(totalCalories); 

    UICtrl.clearEditState()


    e.preventDefault()
  }

  const itemDeleteSubmit = function(e){
    //Get Current Item
    const currentItem = ItemCtrl.getCurrentItem();

    //Delete from data structure
    ItemCtrl.deleteItem(currentItem.id)

    //Delete from UI
    UICtrl.deleteListItem(currentItem.id)

    //Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Show total calories in UI
    UICtrl.showTotalCalories(totalCalories); 

    UICtrl.clearEditState()


    e.preventDefault()
  }

  const clearAllItemsClick = function(e){
    //Delete items from data structure
    ItemCtrl.clearAllItems();

    //Delete items from UI
    UICtrl.removeItems()

    e.preventDefault()
  }
  
  //Public Method
  return {
    init: function(){
      //Set Initial State
      UICtrl.clearEditState()
      //Fetch items from data Structure
      const items = ItemCtrl.getItem()

      //Check list
      if(items.length === 0){
        UICtrl.hidelist()
      } else{
        //Populate List with items
        UICtrl.populateItemList(items)
      }

      //Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Show total calories in UI
      UICtrl.showTotalCalories(totalCalories); 

      //Load Event Listeners
      loadEventListener()
    }
  }
}(ItemCtrl, UICtrl)

App.init();