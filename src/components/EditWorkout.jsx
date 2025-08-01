import { useState } from 'react';
import axios from 'axios';
import React from 'react';

const EditWorkout = ({ workout, onCancel, onSuccess }) => {
  const [type, setType] = useState(workout.type);
  const [duration, setDuration] = useState(workout.duration);
  const [caloriesBurned, setCaloriesBurned] = useState(workout.caloriesBurned || '');
  const [notes, setNotes] = useState(workout.notes || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/workout/${workout._id}`, {
      type, duration, caloriesBurned, notes
    }, {
      headers: { Authorization: token }
    });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" />
      <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration" />
      <input value={caloriesBurned} onChange={(e) => setCaloriesBurned(e.target.value)} placeholder="Calories" />
      <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" />
      <button className='btn bg-blue-600 rounded-xl p-2 text-white' type="submit">Save</button>
      <button onClick={onCancel} type="button">Cancel</button>
    </form>
  );
};

export default EditWorkout;
