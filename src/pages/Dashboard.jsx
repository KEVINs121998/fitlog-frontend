import { useEffect, useState } from 'react';
import axios from 'axios';
import AddWorkoutForm from '../components/AddWorkoutForm';
import AddMealForm from '../components/AddMealForm';
import React from 'react';
import EditWorkout from '../components/EditWorkout';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [editWorkoutId, setEditWorkoutId] = useState(null);
const [editMealId, setEditMealId] = useState(null);
const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

     const deleteWorkout = async (id) => {
  const token = localStorage.getItem('token');
  await axios.delete(`http://localhost:5000/workout/${id}`, {
    headers: { Authorization: token },
  });
  fetchData();
};

const deleteMeal = async (id) => {
  const token = localStorage.getItem('token');
  await axios.delete(`http://localhost:5000/meal/${id}`, {
    headers: { Authorization: token },
  });
  fetchData();
};


  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: token },
      };

      const [workoutRes, mealRes] = await Promise.all([
        axios.get('http://localhost:5000/workout', config),
        axios.get('http://localhost:5000/meal', config),
      ]);

      setWorkouts(workoutRes.data);
      setMeals(mealRes.data);
    } catch (err) {
      console.error('Error fetching dashboard data', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-end mb-4">
  <button
    onClick={handleLogout}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
  >
    🚪 Logout
  </button>
</div>

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-black-600 mb-15">📊 FitLog Dashboard</h2>

        <div className="mb-8">
          <AddWorkoutForm onSuccess={fetchData} />
        </div>

        <div className="mb-8">
          <AddMealForm onSuccess={fetchData} />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Workouts Section */}
          <div>
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">🏋️ Your Workouts</h3>
            {workouts.length === 0 ? (
              <p className="text-gray-500 italic">No workouts logged yet.</p>
            ) : (
             <ul className="space-y-3">
  {workouts.map((w) =>
    editWorkoutId === w._id ? (
      <EditWorkout
        workout={w}
        onCancel={() => setEditWorkoutId(null)}
        onSuccess={() => {
          setEditWorkoutId(null);
          fetchData();
        }}
      />
    ) : (
      <li key={w._id} className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm">
        <div className="flex justify-between">
          <div>
            <div className="text-lg font-semibold">{w.type}</div>
            <div className="text-sm text-gray-700">
              {w.duration} mins | {w.caloriesBurned} kcal
              <br />
              {new Date(w.date).toLocaleDateString()}
              {w.notes && <div className="italic text-gray-600">📝 {w.notes}</div>}
            </div>
          </div>
          <div className="space-x-2">
            <button type="button" onClick={() => setEditWorkoutId(w._id)} className="text-blue-600">✏️</button>
            <button type="button" onClick={() => deleteWorkout(w._id)} className="text-red-600">🗑️</button>
          </div>
        </div>
      </li>
    )
  )}
</ul>


            )}
          </div>

          {/* Meals Section */}
          <div>
            <h3 className="text-2xl font-semibold text-green-600 mb-4">🥗 Your Meals</h3>
            {meals.length === 0 ? (
              <p className="text-gray-500 italic">No meals logged yet.</p>
            ) : (
              <ul className="space-y-3">
                {Object.entries(
  meals.reduce((acc, meal) => {
    const dateKey = new Date(meal.date).toLocaleDateString();
    const key = `${dateKey} - ${meal.timeOfDay}`;
    if (!acc[key]) acc[key] = [];

    acc[key].push(...meal.foodItems); // merge food items across same date + time
    return acc;
  }, {})
).map(([key, foodItems]) => {
  const [dateStr, timeOfDay] = key.split(' - ');
  const totalCalories = foodItems.reduce((sum, f) => sum + (f.calories || 0), 0);
  const totalProtein = foodItems.reduce((sum, f) => sum + (f.protein || 0), 0);
  const totalCarbs = foodItems.reduce((sum, f) => sum + (f.carbs || 0), 0);
  const totalFats = foodItems.reduce((sum, f) => sum + (f.fats || 0), 0);

  return (
    <li
      key={key}
      className="bg-green-50 border border-green-200 p-4 rounded-xl shadow-sm"
    >
      <div className="text-lg font-semibold capitalize mb-1">
        {timeOfDay} – {dateStr}
      </div>
      <div className="text-sm text-gray-700">
        <span className="font-medium">Calories:</span> {totalCalories} kcal<br />
        <span className="font-medium">Protein:</span> {totalProtein} g | 
        <span className="ml-2 font-medium">Carbs:</span> {totalCarbs} g | 
        <span className="ml-2 font-medium">Fats:</span> {totalFats} g
      </div>
    </li>
  );
})}

              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
