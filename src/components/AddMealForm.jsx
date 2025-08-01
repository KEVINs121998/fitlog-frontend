import { useState } from 'react';
import axios from 'axios';
import React from 'react';

const AddMealForm = ({ onSuccess }) => {
  const [timeOfDay, setTimeOfDay] = useState('Lunch');
  const [foodItems, setFoodItems] = useState([
    { name: '', calories: '', protein: '', carbs: '', fats: '' },
  ]);

  const handleFoodChange = (index, field, value) => {
    const updatedItems = [...foodItems];
    updatedItems[index][field] = value;
    setFoodItems(updatedItems);
  };

  const addFoodItem = () => {
    setFoodItems([
      ...foodItems,
      { name: '', calories: '', protein: '', carbs: '', fats: '' },
    ]);
  };

  const removeFoodItem = (indexToRemove) => {
    setFoodItems(foodItems.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/meal',
        { foodItems, timeOfDay },
        { headers: { Authorization: token } }
      );
      setFoodItems([{ name: '', calories: '', protein: '', carbs: '', fats: '' }]);
      setTimeOfDay('Lunch');
      onSuccess();
    } catch (err) {
      console.error('Failed to add meal', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4">Add Your Meal</h3>

      <select
        className="input"
        value={timeOfDay}
        onChange={(e) => setTimeOfDay(e.target.value)}
      >
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>

      {foodItems.map((item, index) => (
        <div key={index} className="grid grid-cols-6 gap-2 mb-2 items-center">
          <input
            className="input"
            type="text"
            placeholder="Name"
            value={item.name}
            onChange={(e) => handleFoodChange(index, 'name', e.target.value)}
            required
          />
          <input
            className="input"
            type="number"
            placeholder="Calories"
            value={item.calories}
            onChange={(e) => handleFoodChange(index, 'calories', e.target.value)}
          />
          <input
            className="input"
            type="number"
            placeholder="Protein"
            value={item.protein}
            onChange={(e) => handleFoodChange(index, 'protein', e.target.value)}
          />
          <input
            className="input"
            type="number"
            placeholder="Carbs"
            value={item.carbs}
            onChange={(e) => handleFoodChange(index, 'carbs', e.target.value)}
          />
          <input
            className="input"
            type="number"
            placeholder="Fats"
            value={item.fats}
            onChange={(e) => handleFoodChange(index, 'fats', e.target.value)}
          />
          {foodItems.length > 1 && (
            <button
              type="button"
              onClick={() => removeFoodItem(index)}
              className="text-red-600 font-bold hover:underline"
            >
              ❌
            </button>
          )}
        </div>
      ))}

      <div className="flex gap-4 mt-4">
        <button type="button" onClick={addFoodItem} className="btn bg-gray-200 rounded-xl p-2 text-black">
           Add Food Item
        </button>
        <button type="submit" className="btn bg-blue-600 rounded-xl p-2 text-white">
          Add Meal
        </button>
      </div>
    </form>
  );
};

export default AddMealForm;
