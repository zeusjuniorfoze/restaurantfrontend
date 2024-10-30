import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import HeaderAdmin from './HeaderAdmin';
import Aside from './Aside';
import FootAdmin from './FootAdmin';
import UsersService from '../../services/usersService';
import reservationService from '../../services/reservationService';
import { RingLoader } from 'react-spinners'; // Importer un composant de chargement

function ReservationAdmin() {
    const { userRole } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [loadingAction, setLoadingAction] = useState({}); // Utiliser un objet pour gérer le chargement de chaque action
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

    const fetchReservations = async () => {
        setLoading(true);
        try {
            const response = await reservationService.getReservation();
            setReservations(response.data.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des réservations :", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const handleConfirmReservation = async (reservationId) => {
        setLoadingAction(prev => ({ ...prev, [reservationId]: true })); // Démarrer le chargement pour cette réservation
        try {
            await reservationService.updateStatut(reservationId, { statutReservation: 'Confirmée' });
            fetchReservations(); // Recharger les réservations après l'action
        } catch (error) {
            console.error("Erreur lors de la confirmation de la réservation :", error);
        } finally {
            setLoadingAction(prev => ({ ...prev, [reservationId]: false })); // Arrêter le chargement pour cette réservation
        }
    };

    const handleRejectReservation = async (reservationId) => {
        setLoadingAction(prev => ({ ...prev, [reservationId]: true })); // Démarrer le chargement pour cette réservation
        try {
            await reservationService.updateStatut(reservationId, { statutReservation: 'Rejeté' });
            fetchReservations(); // Recharger les réservations après l'action
        } catch (error) {
            console.error("Erreur lors du rejet de la réservation :", error);
        } finally {
            setLoadingAction(prev => ({ ...prev, [reservationId]: false })); // Arrêter le chargement pour cette réservation
        }
    };

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
            <main id="mains" className="mains">
                <div className="pagetitle">
                    <h1>Réservations</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item active">Réservations</li>
                        </ol>
                    </nav>
                </div>

                <section className="section" id="arriereplan">
                    <div className="row">
                        <div className="card">
                            <div className="card-body">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nom client</th>
                                            <th scope="col">Numéro client</th>
                                            <th scope="col">Email client</th>
                                            <th scope="col">Date réservée</th>
                                            <th scope="col">Heure réservée</th>
                                            <th scope="col">Places réservées</th> 
                                            <th scope="col">Motif de la réservation</th>
                                            <th scope="col">Status</th> 
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="10" className="text-center">Chargement...</td>
                                            </tr>
                                        ) : reservations.length > 0 ? (
                                            reservations.map((reservation, index) => (
                                                <tr key={reservation._id}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{reservation.nomClient}</td>
                                                    <td>{reservation.numeroClient}</td>
                                                    <td>{reservation.emailClient}</td>
                                                    <td>{reservation.dateReservation}</td>
                                                    <td>{reservation.heureReservation}</td>
                                                    <td>{reservation.nombrePlace}</td>
                                                    <td>{reservation.motifReservation}</td>
                                                    <td>{reservation.statutReservation}</td>
                                                    <td>
                                                        {reservation.statutReservation === 'Confirmée' || reservation.statutReservation === 'Rejeté' ? (
                                                            <span className="text-success">{reservation.statutReservation}</span>
                                                        ) : (
                                                            <>
                                                                <button 
                                                                    className="btn btn-primary me-2"
                                                                    onClick={() => handleConfirmReservation(reservation._id)}
                                                                    disabled={loadingAction[reservation._id]} // Désactiver le bouton pendant le chargement
                                                                >
                                                                    {loadingAction[reservation._id] ? <RingLoader size={20} color="#ffffff" /> : 'Confirmer'}
                                                                </button>
                                                                <button 
                                                                    className="btn btn-danger"
                                                                    onClick={() => handleRejectReservation(reservation._id)}
                                                                    disabled={loadingAction[reservation._id]} // Désactiver le bouton pendant le chargement
                                                                >
                                                                    {loadingAction[reservation._id] ? <RingLoader size={20} color="#ffffff" /> : 'Rejeter'}
                                                                </button>
                                                            </>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="10" className="text-center">Aucune réservation trouvée.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <FootAdmin />
        </>
    );
}

export default ReservationAdmin;