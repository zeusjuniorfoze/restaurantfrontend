import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import HeaderAdmin from '../../components/admin/HeaderAdmin';
import Aside from '../../components/admin/Aside';
import FootAdmin from '../../components/admin/FootAdmin';


import UsersService from '../../services/usersService';
import { useDispatch } from 'react-redux';

function Dashboard() {
  const { userRole } = useSelector((state) => state.auth);  // On récupère le rôle utilisateur du state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await UsersService.verifyToken();
        if (!response.valid) { 
          navigate('/login');
        }
      } catch (error) {
        console.error("Erreur de vérification du token", error);
        navigate('/login');
      }
    };

    checkToken();
  }, [navigate]);

  useEffect(() => {
    dispatch({ type: 'SET_ADMIN_ROUTE', payload: true });

    return () => {
      dispatch({ type: 'SET_ADMIN_ROUTE', payload: false });
    };
  }, [dispatch]);

  return (
    <>
      <HeaderAdmin />
      <Aside />
     
      <FootAdmin />
    </>
  );
}

export default Dashboard;
