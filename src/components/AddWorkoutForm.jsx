import { useState } from 'react';
import axios from 'axios';
import React from 'react';

const AddWorkoutForm = ({ onSuccess }) => {
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/workout',
        { type, duration, caloriesBurned, notes },
        { headers: { Authorization: token } }
      );
      setType('');
      setDuration('');
      setCaloriesBurned('');
      setNotes('');
      onSuccess(); // Refresh dashboard data
    } catch (err) {
      console.error('Failed to add workout', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4">Add Your Workout</h3>
      <div className='pb-5'>
      <input
        className="input"
        type="text"
        placeholder="Workout Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      />
      <input
        className="input"
        type="number"
        placeholder="Duration (mins)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      />
      <input
        className="input"
        type="number"
        placeholder="Calories Burned (optional)"
        value={caloriesBurned}
        onChange={(e) => setCaloriesBurned(e.target.value)}
      />
      <textarea
        className="input"
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      </div>
      <button className="btn bg-blue-600 rounded-xl p-2 text-white">Add Workout</button>
    </form>
  );
};

export default AddWorkoutForm;
