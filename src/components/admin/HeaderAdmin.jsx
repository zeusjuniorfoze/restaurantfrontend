import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import usersService from '../../services/usersService';

function HeaderAdmin() {
  const [nomuser, setNom] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // État pour la liste déroulante
  const { userRole } = useSelector((state) => state.auth); // Rôle utilisateur récupéré depuis Redux
  const navigate = useNavigate();

  // Vérification du token et récupération de l'utilisateur
  useEffect(() => {
    const initialize = async () => {
      try {
        const tokenResponse = await usersService.verifyToken();
        if (!tokenResponse.valid) {
          navigate('/login');
          return;
        }

        const userResponse = await usersService.getLogin();
        setNom(userResponse.data.data.nomUser || 'Utilisateur');
      } catch (error) {
        console.error('Erreur lors de la vérification ou récupération des données:', error);
        navigate('/login');
      }
    };

    initialize();
  }, [navigate]);

  // Gestion de l'ouverture/fermeture de la liste déroulante
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header id="headers" className="headers fixed-top d-flex align-items-center">
      {/* Logo */}
      <div className="d-flex align-items-center justify-content-between">
        <Link to="/dashboard" className="logo d-flex align-items-center">
          <img src="assetsDashboard/img/logo.png" alt="Logo" />
          <span className="d-none d-lg-block">RestaurantAdmin</span>
        </Link>
        <button 
          className="bi bi-list toggle-sidebar-btn d-lg-none" 
          onClick={toggleDropdown} 
          aria-label="Toggle navigation"
        ></button>
      </div>

      {/* Liste déroulante pour navigation mobile */}
      {isDropdownOpen && (
        <nav className="mobile-dropdown d-lg-none">
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/dashboardmenus">Menus</Link></li>
            <li><Link to="/dashboardreservation">Réservations</Link></li>
            <li><Link to="/dashboardprofile">Profil</Link></li>
            <li><Link to="/logout">Déconnexion</Link></li>
          </ul>
        </nav>
      )}

      {/* Navigation utilisateur (desktop) */}
      <nav className="headers-nav ms-auto d-none d-lg-flex">
        <div className="d-flex align-items-center">
          <span>{nomuser}</span>
        </div>
      </nav>
    </header>
  );
}

export default HeaderAdmin;
