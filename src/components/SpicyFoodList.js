import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);

  function handleAddFood() {
     // create new array with all the elements
    // of the original array
    
    /**
     * Here we are using the spread operator to make a copy of our foods array
      and insert each element into the new array
      We are also adding the newly generated food returned by the 
      getNewRandomSpicyFood function at the end of the array
     */
    /**
     * Remember whenever we are updating state
     * it is important that we always pass a new array/object to the setState
     * thats why we are using the spread operator here to make a copy of the array
     * instead of .push which will mutate the original array/object
     */
    /**
     * After setting state , our component should automatically 
     * re-render with the new list of foods 
     */
    const newFood = getNewRandomSpicyFood();
    const newFoodArray = [...foods, newFood];
    setFoods(newFoodArray);
  }

  function handleDeleteFood(id) {
     /**
     * Calling .filter will return a new array based on which elements 
     * match our criteria in the call back function 
     * So if we write our callback function in .filter to look for all the 
     * foods except the number were trying to remove 
     * well get back a new shortened list of foods 
     */
    /**
     * Setting state with this updated list of foods will 
     * re-render our component , causing the food to be removed from the list.
     */


    const newFoodArray = foods.filter((food) => food.id !== id);
    setFoods(newFoodArray);
  }

  /**
   To break down the steps:

.map will iterate through the array and return a new array
Whatever value is returned by the callback function that we pass to .
map will be added to this new array
If the ID of the food we're iterating over matches the ID of the food we're updating
, return a new food object with the heat level incremented by 1
Otherwise, return the original food object
   */

  function handleAddHeat(id) {
    const updatedFoods = foods.map((food) => {
      if (food.id === id) {
        return   { ...food, heatLevel: food.heatLevel + 1, 
        };
       } else {
          return food;
        }
      }
    );
    setFoods(updatedFoods);
  }

  const foodList = foods.map((food) => (
    <li key={food.id}>
      <FoodCard
        food={food}
        onDelete={() => handleDeleteFood(food.id)}
        onAddHeat={() => handleAddHeat(food.id)}
      />
    </li>
  ));

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
    </div>
  );
}

function FoodCard({ food, onDelete, onAddHeat }) {
  return (
    <div>
      <span onClick={onAddHeat}>
        {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
      </span>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default SpicyFoodList;
