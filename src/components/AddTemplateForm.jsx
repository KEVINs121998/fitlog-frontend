import React, { useState } from 'react';
import axios from 'axios';

const AddTemplateForm = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [exercises, setExercises] = useState([{ name: '', reps: '' }]);

  const handleChange = (index, key, value) => {
    const updated = [...exercises];
    updated[index][key] = value;
    setExercises(updated);
  };

  const addExercise = () => setExercises([...exercises, { name: '', reps: '' }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    await axios.post(
      'http://localhost:5000/api/templates',
      { title, exercises },
      { headers: { Authorization: token } }
    );

    setTitle('');
    setExercises([{ name: '', reps: '' }]);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold">➕ Add Workout Template</h3>

      <input
        type="text"
        placeholder="Template Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full border rounded p-2"
      />

      {exercises.map((ex, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            placeholder="Exercise Name"
            value={ex.name}
            onChange={(e) => handleChange(i, 'name', e.target.value)}
            required
            className="flex-1 border rounded p-2"
          />
          <input
            type="text"
            placeholder="Reps (e.g. 3x10)"
            value={ex.reps}
            onChange={(e) => handleChange(i, 'reps', e.target.value)}
            className="w-32 border rounded p-2"
          />
        </div>
      ))}

      <div className="flex gap-3">
        <button type="button" onClick={addExercise} className="text-blue-600 font-medium">
          ➕ Add Exercise
        </button>
        <button type="submit" className="text-green-600 font-medium">
          ✅ Save Template
        </button>
      </div>
    </form>
  );
};

export default AddTemplateForm;
