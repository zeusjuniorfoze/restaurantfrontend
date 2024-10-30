import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UsersService from '../../services/usersService';
import HeaderAdmin from './HeaderAdmin';
import Aside from './Aside';
import FootAdmin from './FootAdmin';
import menuService from "../../services/menuService";
import 'bootstrap/dist/css/bootstrap.min.css';

function Menus() {
    const { userRole } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [menus, setMenus] = useState({ data: [] });
    const [selectedTypePlat, setSelectedTypePlat] = useState('');
    const [newTypePlat, setNewTypePlat] = useState('');
    const [updatedTypePlat, setUpdatedTypePlat] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedPlat, setSelectedPlat] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [showAddTypePlatModal, setShowAddTypePlatModal] = useState(false);
    const [showEditTypePlatModal, setShowEditTypePlatModal] = useState(false);
    const [newPlat, setNewPlat] = useState({ nomplat: '', descripplat: '', prixplat: '' });

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

    const fetchMenus = async () => {
        setLoading(true);
        try {
            const response = await menuService.getMenu();
            setMenus(response.data);
            if (response.data.length > 0) {
                setSelectedTypePlat(response.data[0]._id); // Sélectionner le premier menu par défaut
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des menus:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenus();
    }, []);

    const handleTypePlatChange = (e) => {
        setSelectedTypePlat(e.target.value);
    };

    const filteredMenus = menus.data.filter(menu => menu._id === selectedTypePlat);

    const filteredPlats = selectedTypePlat 
        ? filteredMenus.flatMap(menu => 
            menu.platinfo.filter(plat => 
                plat.nomplat.toLowerCase().includes(searchTerm.toLowerCase())
            )
        ) 
        : [];

    const handleEditPlat = (plat) => {
        setSelectedPlat(plat);
        setImageFile(null); 
        setShowModal(true);
    };

    const handleDeletePlat = async (menuId, nomplat) => {
        setLoading(true);
        try {
            const response = await menuService.deletePlat(menuId, nomplat);
            console.log(response.message);
            setMessage("Le plat a été supprimé avec succès.");
            await fetchMenus(); // Actualiser les menus
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
            setMessage("Erreur lors de la suppression du plat.");
        } finally {
            setLoading(false);
            setTimeout(() => {
                setMessage('');
            }, 5000);
        }
    };

    const handleSaveChanges = async () => {
        setLoading(true);
        try {
            const updatedPlat = new FormData();
            updatedPlat.append('nomplat', selectedPlat.nomplat);
            updatedPlat.append('descripplat', selectedPlat.descripplat);
            updatedPlat.append('prixplat', selectedPlat.prixplat);

            if (imageFile) {
                updatedPlat.append('imageplat', imageFile); // Ajouter le fichier image
            }

            await menuService.modifierPlat(selectedTypePlat, selectedPlat._id, updatedPlat);
            setMessage("Le plat a été mis à jour avec succès.");
            await fetchMenus(); // Actualiser les menus
        } catch (error) {
            console.error("Erreur lors de la mise à jour du plat:", error);
            setMessage("Erreur lors de la mise à jour du plat : " + error.message);
        } finally {
            setLoading(false);
            setShowModal(false);
            setTimeout(() => {
                setMessage('');
            }, 5000);
        }

        
    };

    const handleAddPlat = async () => {
        setLoading(true);
        try {
            const newPlatData = new FormData();
            newPlatData.append('nomplat', newPlat.nomplat);
            newPlatData.append('descripplat', newPlat.descripplat);
            newPlatData.append('prixplat', newPlat.prixplat);
            if (imageFile) {
                newPlatData.append('imageplat', imageFile);
            }

            await menuService.ajouterPlat(selectedTypePlat || menus.data[0]._id, newPlatData);
            setMessage("Le plat a été ajouté avec succès.");
            await fetchMenus();
        } catch (error) {
            console.error("Erreur lors de l'ajout du plat:", error);
            setMessage("Erreur lors de l'ajout du plat : " + error.message);
        } finally {
            setLoading(false);
            setShowAddModal(false);
            setTimeout(() => {
                setMessage('');
            }, 5000);
        }
    };

    const handleDeleteTypePlat = async () => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce menu ?")) return;
        setLoading(true);
        try {
            await menuService.deleteMenus(selectedTypePlat);
            setMessage("Le menu a été supprimé avec succès.");
            await fetchMenus(); // Actualiser les menus
            setSelectedTypePlat(''); // Réinitialiser la sélection
        } catch (error) {
            console.error("Erreur lors de la suppression du menu:", error);
            setMessage("Erreur lors de la suppression du menu.");
        } finally {
            setLoading(false);
            setTimeout(() => {
                setMessage('');
            }, 5000);
        }
    };

    const handleAddMenus = async () => {
        setLoading(true);
        try {
            await menuService.ajouterMenus(newTypePlat);
            setMessage("Le type de plat a été ajouté avec succès.");
            await fetchMenus();
        } catch (error) {
            console.error("Erreur lors de l'ajout du type de plat:", error);
            setMessage("Erreur lors de l'ajout du type de plat : " + error.message);
        } finally {
            setLoading(false);
            setShowAddTypePlatModal(false);
            setTimeout(() => {
                setMessage('');
            }, 5000);
        }
    };

    const handleEditMenu = async () => {
        setLoading(true);
        try {
            await menuService.modifierMenus(selectedTypePlat, updatedTypePlat);
            setMessage("Le type de plat a été modifié avec succès.");
            await fetchMenus();
        } catch (error) {
            console.error("Erreur lors de la modification du type de plat:", error);
            setMessage("Erreur lors de la modification du type de plat : " + error.message);
        } finally {
            setLoading(false);
            setShowEditTypePlatModal(false);
            setTimeout(() => {
                setMessage('');
            }, 5000);
        }
    };



    return (
        <>
            <HeaderAdmin />
            <Aside />
            <main id="mains" className="mains">
                <div className="pagetitle">
                    <h1>Menus</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item active">Menus</li>
                        </ol>
                    </nav>

                    <section className="section" id="arriereplan">
                        <div className="row">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Liste des Menus</h5>

                                    {message && <div className="alert alert-success">{message}</div>}

                                    <div className="col-md-6 mb-3 d-flex align-items-center">
                                        <div className="form-floating me-2">
                                            <select 
                                                className="form-select" 
                                                id="floatingSelect" 
                                                aria-label="State"
                                                onChange={handleTypePlatChange}
                                                value={selectedTypePlat}
                                            >
                                                <option value="">Sélectionnez un type de menu</option>
                                                {menus.data.length > 0 && 
                                                    menus.data.map(menu => (
                                                        <option value={menu._id} key={menu._id}>{menu.typeplat}</option>
                                                    ))
                                                }
                                            </select>
                                            <label htmlFor="floatingSelect">Type menus</label>
                                        </div>
                                        <button 
                                            className="btn btn-success me-3" 
                                            onClick={() => setShowAddTypePlatModal(true)}
                                        >
                                            Ajouter menu
                                        </button>
                                        {selectedTypePlat && (
                                            <button 
                                                className="btn btn-warning" 
                                                onClick={() => setShowEditTypePlatModal(true)}
                                            >
                                                Modifier menu
                                            </button>
                                        )}
                                    </div>

                                    {selectedTypePlat && (
                                        <div className="col-md-4 mb-3">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Rechercher un plat" 
                                                value={searchTerm} 
                                                onChange={(e) => setSearchTerm(e.target.value)} 
                                            />
                                        </div>
                                    )}

                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Nom</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Image</th>
                                                <th scope="col">Prix</th>
                                                <th scope="col">Actions</th> 
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredPlats.length > 0 ? (
                                                filteredPlats.map((plat, platIndex) => (
                                                    <tr key={platIndex}>
                                                        <th scope="row">{platIndex + 1}</th>
                                                        <td>{plat.nomplat}</td>
                                                        <td>{plat.descripplat || "Description non disponible"}</td>
                                                        <td>
                                                            <img 
                                                                src={plat.imageplat ? plat.imageplat : "assets/img/menu/default-image.jpg"} 
                                                                alt={plat.nomplat} 
                                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                                                            />
                                                        </td>
                                                        <td>{plat.prixplat}</td>
                                                        <td>
                                                            <button 
                                                                className="btn btn-primary me-2" 
                                                                onClick={() => handleEditPlat(plat)}
                                                            >
                                                                Éditer
                                                            </button>
                                                            <button 
                                                                className="btn btn-danger" 
                                                                onClick={() => handleDeletePlat(selectedTypePlat, plat.nomplat)}
                                                            >
                                                                Supprimer
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center">Aucun plat trouvé.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>

                                    {selectedTypePlat && (
                                        <div className="col-md-4">
                                            {selectedTypePlat && (
                                                <button 
                                                    className="btn btn-success me-2" 
                                                    onClick={() => setShowAddModal(true)} 
                                                    disabled={selectedTypePlat === ''}
                                                >
                                                    Ajouter un plat
                                                </button>
                                                

                                            )}
                                            <button 
                                                className="btn btn-danger" 
                                                onClick={handleDeleteTypePlat}
                                                disabled={selectedTypePlat === ''}
                                            >
                                                Supprimer ce menu
                                            </button>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <FootAdmin />

            {/* Modal pour ajouter un type de plat */}
            <div className={`modal fade ${showAddTypePlatModal ? 'show' : ''}`} style={{ display: showAddTypePlatModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Ajouter un menu</h5>
                            <button type="button" className="btn-close" onClick={() => setShowAddTypePlatModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Nom du menu</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="typeplat"
                                    value={newTypePlat} 
                                    onChange={(e) => setNewTypePlat(e.target.value)} 
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowAddTypePlatModal(false)}>Fermer</button>
                            <button type="button" className="btn btn-success" onClick={handleAddMenus}>Ajouter</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className={`modal fade ${showEditTypePlatModal ? 'show' : ''}`} style={{ display: showEditTypePlatModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modifier le menus</h5>
                            <button type="button" className="btn-close" onClick={() => setShowEditTypePlatModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Nouveau Nom du menu</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="typeplat"
                                    value={updatedTypePlat} 
                                    onChange={(e) => setUpdatedTypePlat(e.target.value)} 
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowEditTypePlatModal(false)}>Fermer</button>
                            <button type="button" className="btn btn-warning" onClick={handleEditMenu}>Modifier</button>
                        </div>
                    </div>
                </div>
            </div>
            

            {/* Modal pour éditer un plat */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modifier le Plat</h5>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Nom du plat</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={selectedPlat?.nomplat} 
                                    onChange={(e) => setSelectedPlat({ ...selectedPlat, nomplat: e.target.value })} 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea 
                                    className="form-control" 
                                    value={selectedPlat?.descripplat} 
                                    onChange={(e) => setSelectedPlat({ ...selectedPlat, descripplat: e.target.value })} 
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Prix</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    value={selectedPlat?.prixplat} 
                                    onChange={(e) => setSelectedPlat({ ...selectedPlat, prixplat: e.target.value })} 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Image du plat</label>
                                <input 
                                    type="file" 
                                    className="form-control" 
                                    onChange={(e) => setImageFile(e.target.files[0])} 
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Fermer</button>
                            <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Sauvegarder les modifications</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal pour ajouter un plat */}
            <div className={`modal fade ${showAddModal ? 'show' : ''}`} style={{ display: showAddModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Ajouter un Plat</h5>
                            <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Nom du plat</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={newPlat.nomplat} 
                                    onChange={(e) => setNewPlat({ ...newPlat, nomplat: e.target.value })} 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea 
                                    className="form-control" 
                                    value={newPlat.descripplat} 
                                    onChange={(e) => setNewPlat({ ...newPlat, descripplat: e.target.value })} 
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Prix</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    value={newPlat.prixplat} 
                                    onChange={(e) => setNewPlat({ ...newPlat, prixplat: e.target.value })} 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Image du plat</label>
                                <input 
                                    type="file" 
                                    className="form-control" 
                                    onChange={(e) => setImageFile(e.target.files[0])} 
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Fermer</button>
                            <button type="button" className="btn btn-success" onClick={handleAddPlat}>Ajouter le plat</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Menus;
