import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';

import UsersService from '../../services/usersService';


function Aside(){
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

    return(
        <aside id="sidebar" className="sidebar" >
      
          <ul className="sidebar-nav" id="sidebar-nav">
      
            <li className="nav-item">
              <Link className="nav-link collapsed" to="/dashboard">
                <i className="bi bi-grid"></i>
               
                <span>Dashboard</span>
                </Link>
              
            </li>
      
            <li className="nav-item">
              <Link className="nav-link collapsed" to="/dashboardmenus">
                <i className="bi bi-layout-text-window-reverse"></i>
               
                <span>Menus</span>
                </Link>
              
            </li>
      
  
      
            <li className="nav-item">
              <Link className="nav-link collapsed" to="/dashboardreservation">
                <i className="bi bi-person"></i>
                <span>Reservation</span>
              </Link>
            </li>
      
            <li className="nav-item">
              <a className="nav-link collapsed" href="/login">
                <i className="bi bi-question-circle"></i>
                <span>F.A.Q</span>
              </a>
            </li>
            
      
          </ul>
      
        </aside>

    );

}

export default Aside;
