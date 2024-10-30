import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import HeaderAdmin from '../../components/admin/HeaderAdmin';
import Aside from '../../components/admin/Aside';
import FootAdmin from '../../components/admin/FootAdmin';
import Menus from '../../components/admin/Menus';
import DashboardAdmin from '../../components/admin/DashboardAdmin';

import UsersService from '../../services/usersService';

function Dashboard() {
  const { userRole } = useSelector((state) => state.auth);  // On récupère le rôle utilisateur du state
  const navigate = useNavigate();

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

  return (
    <>
      <HeaderAdmin />
      <Aside />
      <main id="mains" className="mains">
        

      </main>
      <FootAdmin />
    </>
  );
}

export default Dashboard;
