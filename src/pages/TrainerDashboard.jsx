import { useEffect, useState } from 'react';
import axios from 'axios';
import AddTemplateForm from '../components/AddTemplateForm';
import React from 'react';

const TrainerDashboard = () => {
  const [templates, setTemplates] = useState([]);

  const fetchTemplates = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/templates', {
      headers: { Authorization: token },
    });
    setTemplates(res.data);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const deleteTemplate = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/templates/${id}`, {
      headers: { Authorization: token },
    });
    fetchTemplates();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">👨‍🏫 Trainer Dashboard</h2>

      <AddTemplateForm onSuccess={fetchTemplates} />

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">📋 Your Templates</h3>
        {templates.length === 0 ? (
          <p className="text-gray-500 italic">No templates added yet.</p>
        ) : (
          <ul className="space-y-3">
            {templates.map((tpl) => (
              <li key={tpl._id} className="p-4 bg-indigo-50 rounded-xl border">
                <div className="font-bold">{tpl.title}</div>
                <ul className="text-sm text-gray-700 list-disc pl-5">
                  {tpl.exercises.map((ex, i) => (
                    <li key={i}>
                      {ex.name} {ex.reps && `– ${ex.reps}`}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => deleteTemplate(tpl._id)}
                  className="text-red-600 mt-2"
                >
                  🗑️ Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TrainerDashboard;
