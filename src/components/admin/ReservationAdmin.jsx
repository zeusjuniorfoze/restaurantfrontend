import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeaderAdmin from './HeaderAdmin';
import Aside from './Aside';
import FootAdmin from './FootAdmin';
import UsersService from '../../services/usersService';
import reservationService from '../../services/reservationService';
import { RingLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';


function ReservationAdmin() {
    const { t } = useTranslation();
    const { userRole } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [loadingAction, setLoadingAction] = useState({});
    const [filter, setFilter] = useState("Toutes"); // État pour le filtre
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
        setLoadingAction(prev => ({ ...prev, [reservationId]: true }));
        try {
            await reservationService.updateStatut(reservationId, { statutReservation: 'Confirmée' });
            fetchReservations();
        } catch (error) {
            console.error(t('errorConfirming'), error);
        } finally {
            setLoadingAction(prev => ({ ...prev, [reservationId]: false }));
        }
    };

    const handleRejectReservation = async (reservationId) => {
        setLoadingAction(prev => ({ ...prev, [reservationId]: true }));
        try {
            await reservationService.updateStatut(reservationId, { statutReservation: 'Rejeté' });
            fetchReservations();
        } catch (error) {
            console.error(t('errorRejecting'), error);
        } finally {
            setLoadingAction(prev => ({ ...prev, [reservationId]: false }));
        }
    };

    useEffect(() => {
        dispatch({ type: 'SET_ADMIN_ROUTE', payload: true });
        return () => {
            dispatch({ type: 'SET_ADMIN_ROUTE', payload: false });
        };
    }, [dispatch]);

    // Filtrer les réservations en fonction du filtre sélectionné
    const filteredReservations = reservations.filter((reservation) => {
        if (filter === "Toutes") return true;
        return reservation.statutReservation === filter;
    });

    return (
        <>
            <HeaderAdmin />
            <Aside />
            <main id="mains" className="mains">
                <div className="pagetitle">
                    <h1>{t('reservations')}</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/dashboard">{t('accueil')}</Link></li>
                            <li className="breadcrumb-item active">{t('reservations')}</li>
                        </ol>
                    </nav>
                </div>

                <section className="section" id="arriereplan">
    <div className="container-fluid">
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        {/* Menu de filtre */}
                        <div className="mb-3">
                            <label className="form-label">{t('filterByStatus')}</label>
                            <select
                                className="form-select"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="Toutes">{t('all')}</option>
                                <option value="Confirmée">{t('confirmed')}</option>
                                <option value="Rejeté">{t('rejected')}</option>
                            </select>
                        </div>

                        {/* Tableau responsive */}
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">{t('clientName')}</th>
                                        <th scope="col">{t('clientNumber')}</th>
                                        <th scope="col">{t('clientEmail')}</th>
                                        <th scope="col">{t('reservationDate')}</th>
                                        <th scope="col">{t('reservationTime')}</th>
                                        <th scope="col">{t('reservedSeats')}</th>
                                        <th scope="col">{t('reservationReason')}</th>
                                        <th scope="col">{t('status')}</th>
                                        <th scope="col">{t('actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="10" className="text-center">{t('loading')}</td>
                                        </tr>
                                    ) : filteredReservations.length > 0 ? (
                                        filteredReservations.map((reservation, index) => (
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
                                                    {reservation.statutReservation === 'Confirmée' ||
                                                    reservation.statutReservation === 'Rejeté' ? (
                                                        <span className="text-success">
                                                            {reservation.statutReservation}
                                                        </span>
                                                    ) : (
                                                        <>
                                                            <button
                                                                className="btn btn-primary btn-sm me-2"
                                                                onClick={() => handleConfirmReservation(reservation._id)}
                                                                disabled={loadingAction[reservation._id]}
                                                            >
                                                                {loadingAction[reservation._id] ? (
                                                                    <RingLoader size={20} color="#ffffff" />
                                                                ) : (
                                                                    t('confirm')
                                                                )}
                                                            </button>
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => handleRejectReservation(reservation._id)}
                                                                disabled={loadingAction[reservation._id]}
                                                            >
                                                                {loadingAction[reservation._id] ? (
                                                                    <RingLoader size={20} color="#ffffff" />
                                                                ) : (
                                                                    t('reject')
                                                                )}
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="10" className="text-center">
                                                {t('noReservationsFound')}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
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

export default ReservationAdmin;
