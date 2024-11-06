import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UsersService from '../../services/usersService';
import { useNavigate, Link } from 'react-router-dom';
import HeaderAdmin from './HeaderAdmin';
import Aside from './Aside';
import FootAdmin from './FootAdmin';
import { Oval } from 'react-loader-spinner';

const Loader = ({ loading }) => (
    loading && (
        <div style={loaderStyle}>
            <Oval color="#00BFFF" height={80} width={80} />
        </div>
    )
);

const loaderStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '50%',
    padding: '20px',
};

function Profile() {
    const { userRole } = useSelector((state) => state.auth); 
    const navigate = useNavigate();
    
    const [nomUser, setNom] = useState('');
    const [emailUser, setEmail] = useState('');
    const [numeroUser, setNumero] = useState('');
    const [passwordUser, setPassword] = useState('');
    const [newPasswordUser, setNewPassword] = useState('');
    const [verifiePasswordUser, setVerifiNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [profileSuccessMessage, setProfileSuccessMessage] = useState('');
    const [passwordSuccessMessage, setPasswordSuccessMessage] = useState('');

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
        fetchUser();
    }, [navigate]);

    const fetchUser = async () => {
        try {
            const response = await UsersService.getLogin();
            setNom(response.data.data.nomUser);
            setNumero(response.data.data.numeroUser);
            setEmail(response.data.data.emailUser);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur:", error);
        } 
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await UsersService.updateProfile({ nomUser, emailUser, numeroUser });
            if (response.data.success) {
                setProfileSuccessMessage("Profil mis à jour avec succès !");
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError('');
        setPasswordSuccessMessage('');
        if (newPasswordUser !== verifiePasswordUser) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }
        
        setLoading(true);
        try {
            const response = await UsersService.changePassword({ passwordUser, newPasswordUser });
            if (response.data.success) {
                setPasswordSuccessMessage("Mot de passe mis à jour avec succès !");
                setPassword('');
                setNewPassword('');
                setVerifiNewPassword('');
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du mot de passe:", error);
            setError("Erreur lors de la mise à jour du mot de passe");
        } finally {
            setLoading(false);
        }
    };

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
                            <li className="breadcrumb-item active">Profile</li>
                        </ol>
                    </nav>
                </div>

                <section className="section profile" id="arriereplan">
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="card">
                                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                                    <h2>{nomUser}</h2>
                                    <h3>Administrateur</h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-8">
                            <div className="card">
                                <div className="card-body pt-3">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Information</button>
                                        </li>
                                        <li className="nav-item">
                                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Modifier Profile</button>
                                        </li>
                                        <li className="nav-item">
                                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Changer le mot de passe</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content pt-2">
                                        <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                            <h5 className="card-title">Détails du Profil</h5>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Nom</div>
                                                <div className="col-lg-9 col-md-8">{nomUser}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Role</div>
                                                <div className="col-lg-9 col-md-8">Administrateur</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Numero</div>
                                                <div className="col-lg-9 col-md-8">{numeroUser}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Email</div>
                                                <div className="col-lg-9 col-md-8">{emailUser}</div>
                                            </div>
                                        </div>

                                        <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                                            <form onSubmit={handleProfileSubmit}>
                                                {profileSuccessMessage && <p style={{ color: 'green' }}>{profileSuccessMessage}</p>}
                                                <div className="row mb-3">
                                                    <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Nom</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="fullName" type="text" className="form-control" id="fullName" value={nomUser} onChange={(e) => setNom(e.target.value)} disabled={loading}/>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Numero</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="phone" type="text" className="form-control" id="Phone" value={numeroUser} onChange={(e) => setNumero(e.target.value)} disabled={loading}/>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="email" type="email" className="form-control" id="Email" value={emailUser} onChange={(e) => setEmail(e.target.value)} disabled={loading}/>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary" disabled={loading}>Enregistrer</button>
                                                </div>
                                            </form>
                                        </div>

                                        <div className="tab-pane fade pt-3" id="profile-change-password">
                                            <form onSubmit={handleChangePassword}>
                                                {passwordSuccessMessage && <p style={{ color: 'green' }}>{passwordSuccessMessage}</p>}
                                                <div className="row mb-3">
                                                    <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Mot de passe actuel</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="password" type="password" className="form-control" id="currentPassword" value={passwordUser} onChange={(e) => setPassword(e.target.value)} disabled={loading}/>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">Nouveau mot de passe</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="newpassword" type="password" className="form-control" id="newPassword" value={newPasswordUser} onChange={(e) => setNewPassword(e.target.value)} disabled={loading}/>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Confirmer le mot de passe</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="renewpassword" type="password" className="form-control" id="renewPassword" value={verifiePasswordUser} onChange={(e) => setVerifiNewPassword(e.target.value)} disabled={loading}/>
                                                    </div>
                                                </div>
                                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary" disabled={loading}>Changer le mot de passe</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <FootAdmin />
            <Loader loading={loading} />
        </>
    );
}

export default Profile;
