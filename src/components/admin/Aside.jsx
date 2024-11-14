import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UsersService from '../../services/usersService';
import { useTranslation } from 'react-i18next';

function Aside() {
  const { t, i18n } = useTranslation(); // On récupère i18n pour changer la langue
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

  const handleLogout = () => {
    localStorage.removeItem('token');  // Supprimer le token du stockage local
    navigate('/');  // Rediriger vers la page de connexion
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);  // Changer la langue en fonction du choix
  };

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/dashboard">
            <i className="bi bi-grid"></i>
            <span>{t('dashboard')}</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/dashboardmenus">
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>{t('menus')}</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/dashboardreservation">
            <i className="bi bi-journal-text"></i>
            <span>{t('reservations')}</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/dashboardprofile">
            <i className="bi bi-person"></i>
            <span>{t('profile')}</span>
          </Link>
        </li>

        <li className="nav-item">
          <button className="nav-link collapsed" onClick={handleLogout}>
            <i className="bi bi-box-arrow-in-right"></i>
            <span>{t('signOut')}</span>
          </button>
        </li>

        <li className="nav-item">
          <div className="nav-link collapsed">
            <select onChange={(e) => handleLanguageChange(e.target.value)} className="form-select">
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>
        </li>

      </ul>
    </aside>
  );
}

export default Aside;
