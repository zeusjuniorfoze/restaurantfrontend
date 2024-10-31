import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import usersService from '../../services/usersService';


function HeaderAdmin(){

  const [nomuser, setNom] = useState('');
  const { userRole } = useSelector((state) => state.auth);  // On récupère le rôle utilisateur du state
    const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
        try {
            const response = await usersService.verifyToken();
            if (!response.valid) { 
                navigate('/login');
            }
        } catch (error) {
            console.error("Erreur de vérification du token", error);
            navigate('/login');
        }
    };

    checkToken();
    fetchUser();
   
}, []);

  const fetchUser = async () => {
        
    try {
        const response = await usersService.getLogin();

       setNom(response.data.data.nomUser)
    } catch (error) {
        console.error("Erreur lors de la récupération des menus:", error);
    } 
};

    return(

        <header id="headers" className="headers fixed-top d-flex align-items-center">

        <div className="d-flex align-items-center justify-content-between">
          <a href="/dashboard" className="logo d-flex align-items-center">
            <img src="assetsDashboard/img/logo.png" alt="" />
            <span className="d-none d-lg-block">RestaurantAdmin</span>
          </a>
          <i className="bi bi-list toggle-sidebar-btn"></i>
        </div>
    
       
    
        <nav className="headers-nav ms-auto">
          <div className="d-flex align-items-center">
  
          <span >{nomuser}</span>
          
    
          </div>
        </nav>
    
      </header>

    );

}

export default HeaderAdmin;
