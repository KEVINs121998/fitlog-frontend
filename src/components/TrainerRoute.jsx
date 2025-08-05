import { Navigate } from 'react-router-dom';
import React from 'react';

const TrainerRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  console.log("TOKEN:", token);
  console.log("ROLE:", role); // 👈 Check this in console

  if (!token) return <Navigate to="/login" />;
  if (role !== 'trainer') return <Navigate to="/unauthorized" />;

  return children;
};


export default TrainerRoute;
