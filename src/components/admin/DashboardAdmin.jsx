import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UsersService from '../../services/usersService';
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from './HeaderAdmin';
import Aside from './Aside';
import FootAdmin from './FootAdmin';
import menuService from "../../services/menuService";
import reservationService from '../../services/reservationService';

function DashboardAdmin() {
    const { userRole } = useSelector((state) => state.auth);  // On récupère le rôle utilisateur du state
    const navigate = useNavigate();
    
    // États pour stocker le nombre de types de plats et le nombre total de plats
    const [nombreTypesPlats, setNombreTypesPlats] = useState(0);
    const [nombreTotalPlats, setNombreTotalPlats] = useState(0);
    const [nombreReservation, setReservation] = useState(0);

   
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
        fetchMenus();
       
    }, [navigate]);

    const fetchMenus = async () => {
        
        try {
            const resp = await reservationService.getReservation();
            const countEnCour = resp.data.data.filter((reservation) => reservation.statutReservation === "En cours..").length;
            setReservation(countEnCour);
            const response = await menuService.getMenu();

            // Initialiser le compteur pour le nombre total de platinfo
            let totalPlatInfo = 0;

            // Parcourir chaque type de plat et additionner le nombre d'objets platinfo
            response.data.data.forEach((typePlat) => {
            if (typePlat.platinfo) {
                totalPlatInfo += typePlat.platinfo.length;
            }
            });
            setNombreTotalPlats(totalPlatInfo)
            setNombreTypesPlats(response.data.data.length);
            
           
        } catch (error) {
            console.error("Erreur lors de la récupération des menus:", error);
        } 
    };

    

    return (
        <>
            <HeaderAdmin />
            <Aside />
            <main id="mains" className="mains">
                <div className="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </nav>
                </div>

                <section className="section dashboard" id="arriereplan">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card sales-card">
                                        <div className="card-body">
                                            <h5 className="card-title">Type menus</h5>
                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-cart"></i>
                                                </div>
                                                <div className="ps-3">
                                                    <h6>{nombreTypesPlats}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card revenue-card">
                                        <div className="card-body">
                                            <h5 className="card-title">Plats</h5>
                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-people"></i>
                                                </div>
                                                <div className="ps-3">
                                                    <h6>{nombreTotalPlats}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xxl-4 col-xl-12">
                                    <div className="card info-card customers-card">
                                        <div className="card-body">
                                            <h5 className="card-title">Reservations</h5>
                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-people"></i>
                                                </div>
                                                <div className="ps-3">
                                                    <h6>{nombreReservation}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <FootAdmin />
        </>
    );
}

export default DashboardAdmin;
