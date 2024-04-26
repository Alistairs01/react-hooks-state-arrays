import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All");

  const foodsToDisplay = foods.filter((food) => {
    return filterBy === "All" || food.cuisine === filterBy;
  });

  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id}>
      <FoodCard
        food={food}
        onDelete={() => handleDeleteFood(food.id)}
        onAddHeat={() => handleAddHeat(food.id)}
      />
    </li>
  ));

  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    setFoods([...foods, newFood]);
  }

  function handleDeleteFood(id) {
    const newFoodArray = foods.filter((food) => food.id !== id);
    setFoods(newFoodArray);
  }

  function handleAddHeat(id) {
    const updatedFoods = foods.map((food) => {
      if (food.id === id) {
        return { ...food, heatLevel: food.heatLevel + 1 };
      } else {
        return food;
      }
    });
    setFoods(updatedFoods);
  }

  function handleFilterChange(event) {
    setFilterBy(event.target.value);
  }

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <select name="filter" value={filterBy} onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
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
