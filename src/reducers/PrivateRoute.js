import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.userRole) === 'admin'; // Vérifie si l'utilisateur est admin

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirige vers la page de connexion si non connecté
  }

  if (!isAdmin) {
    return <Navigate to="/" />; // Redirige vers la page d'accueil si l'utilisateur n'est pas admin
  }

  return children; // Retourne la route si l'utilisateur est authentifié et admin
};

export default PrivateRoute;
