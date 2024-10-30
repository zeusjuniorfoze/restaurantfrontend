import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UsersService from '../../services/usersService';
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from './HeaderAdmin';
import Aside from './Aside';
import FootAdmin from './FootAdmin';
import menuService from "../../services/menuService";

function DashboardAdmin() {
    const { userRole } = useSelector((state) => state.auth);  // On récupère le rôle utilisateur du state
    const navigate = useNavigate();
    
    // États pour stocker le nombre de types de plats et le nombre total de plats
    const [nombreTypesPlats, setNombreTypesPlats] = useState(0);
    const [nombreTotalPlats, setNombreTotalPlats] = useState(0);

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

        const fetchPlatsData = async () => {
            try {
                // Appel pour récupérer le nombre de types de plats
                const typesResponse = await menuService.getMenu(); // Supposons que cette fonction existe
                setNombreTypesPlats(typesResponse.data.length); // Ajuste selon la structure de la réponse

                // Appel pour récupérer le nombre total de plats
                const platsResponse = await menuService.getTotalPlats(); // Supposons que cette fonction existe
                setNombreTotalPlats(platsResponse.length); // Ajuste selon la structure de la réponse
            } catch (error) {
                console.error("Erreur lors de la récupération des données des plats:", error);
            }
        };

        checkToken();
       
    }, [navigate]);

    const fetchMenus = async () => {
        
        try {
            const response = await menuService.getMenu();
            const typesPlats = response.data.data;
            setNombreTypesPlats(response.data.data.length);
            

            const nombrePlatsParType = response.data.data.map(type => {
                return {
                    type: type.typePlat,
                    nombre: type.plats.length // Compte le nombre de plats dans ce type
                };
            });
            console.log(nombrePlatsParType.nombre)
            setNombreTotalPlats(nombrePlatsParType.nombre); 
           
        } catch (error) {
            console.error("Erreur lors de la récupération des menus:", error);
        } 
    };

    useEffect(() => {
        fetchMenus();
    }, []);

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
                                                    <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>
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
                                                    <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span>
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
                                                    <h6>1244</h6>
                                                    <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span>
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
