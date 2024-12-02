import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UsersService from '../../services/usersService';
import HeaderAdmin from './HeaderAdmin';
import Aside from './Aside';
import FootAdmin from './FootAdmin';
import menuService from "../../services/menuService";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Oval } from 'react-loader-spinner';
import { useTranslation } from 'react-i18next';


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

function Menus() {
    const { t } = useTranslation();
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
    const [loadingDelete, setLoadingDelete] = useState(false);
    

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
            setShowModal(false);
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
    
            console.log(newPlatData);  // Vérification de la structure des données envoyées
    
            await menuService.ajouterPlat(selectedTypePlat || menus.data[0]._id, newPlatData);
            setMessage("Le plat a été ajouté avec succès.");
            
            await fetchMenus(); // Rafraîchir les menus après ajout
        } catch (error) {
            console.error("Erreur lors de l'ajout du plat:", error);
            
            // Ajouter plus de détails pour déboguer l'erreur
            const errorMsg = error.response?.data?.message || error.message || "Erreur inconnue";
            setMessage("Erreur lors de l'ajout du plat : " + errorMsg);
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
                            <li className="breadcrumb-item"><Link to="/dashboard">{t('dashboard')}</Link></li>
                            <li className="breadcrumb-item active">{t('menus')}</li>
                        </ol>
                    </nav>

                    <section className="section" id="arriereplan">
                        <div className="row">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{t('listmenus')}</h5>

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
                                                <option value="">{t('selectmenu')}</option>
                                                {menus.data.length > 0 && 
                                                    menus.data.map(menu => (
                                                        <option value={menu._id} key={menu._id}>{menu.typeplat}</option>
                                                    ))
                                                }
                                            </select>
                                            <label htmlFor="floatingSelect">{t('typemenus')}</label>
                                        </div>
                                        <button 
                                            className="btn btn-success me-3" 
                                            onClick={() => setShowAddTypePlatModal(true)}
                                        >
                                            {t('ajoutmenu')}
                                        </button>
                                        {selectedTypePlat && (
                                            <button 
                                                className="btn btn-warning" 
                                                onClick={() => setShowEditTypePlatModal(true)}
                                            >
                                               {t('modifiermenu')}
                                            </button>
                                        )}
                                    </div>

                                    {selectedTypePlat && (
                                        <div className="col-md-4 mb-3">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder={t('rechercheplat')}
                                                value={searchTerm} 
                                                onChange={(e) => setSearchTerm(e.target.value)} 
                                            />
                                        </div>
                                    )}

                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">{t('nameLabel')}</th>
                                                <th scope="col">{t('description')}</th>
                                                <th scope="col">{t('image')}</th>
                                                <th scope="col">{t('price')}</th>
                                                <th scope="col">{t('actions')}</th> 
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredPlats.length > 0 ? (
                                                filteredPlats.map((plat, platIndex) => (
                                                    <tr key={platIndex}>
                                                        <th scope="row">{platIndex + 1}</th>
                                                        <td>{plat.nomplat}</td>
                                                        <td>{plat.descripplat || t('menu.defaultDescription')}</td>
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
                                                                {t('editer')}
                                                            </button>
                                                            <button 
                                                                className="btn btn-danger" 
                                                                onClick={() => handleDeletePlat(selectedTypePlat, plat.nomplat)}
                                                                disabled={loading}
                                                            >
                                                                {loadingDelete ? (
                                                                            <Loader loading={loadingDelete} /> // Affiche le Loader pendant la suppression
                                                                        ) : (
                                                                            t('Supprimer')
                                                                        )}
                                                                
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center">{t('aucunplat')}</td>
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
                                                    {t('ajoutplat')}
                                                </button>
                                                

                                            )}
                                            <button 
                                                className="btn btn-danger" 
                                                onClick={handleDeleteTypePlat}
                                                disabled={selectedTypePlat === ''}
                                                
                                            >
                                                {loadingDelete ? (
                                                    <Loader loading={loadingDelete} /> // Affiche le Loader pendant la suppression
                                                    ) : (
                                                           "Supprimer ce menu"
                                                        )}
                                              
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
                <Loader loading={loading} />
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{t('modal.addMenuTitle')}</h5>
                            <button type="button" className="btn-close" onClick={() => setShowAddTypePlatModal(false)}
                                
                                ></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">{t('form.menuName')} </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="typeplat"
                                    value={newTypePlat} 
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\s+/g, '');
                                        setNewTypePlat(value);
                                    }}
                                    disabled={loading} 
                                />

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowAddTypePlatModal(false)}
                                disabled={loading}
                                >{t('modal.close')}</button>
                            <button type="button" className="btn btn-success" onClick={handleAddMenus}
                            disabled={loading}
                            >{t('modal.add')}</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className={`modal fade ${showEditTypePlatModal ? 'show' : ''}`} style={{ display: showEditTypePlatModal ? 'block' : 'none' }}>
                <Loader loading={loading} />
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{t('modal.editMenuTitle')}</h5>
                            <button type="button" className="btn-close" onClick={() => setShowEditTypePlatModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">{t('form.newMenuName')}</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="typeplat"
                                    value={updatedTypePlat} 
                                    onChange={(e) => setUpdatedTypePlat(e.target.value)}
                                    disabled={loading} 
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowEditTypePlatModal(false)}
                                disabled={loading}
                                >{t('modal.close')}</button>
                            <button type="button" className="btn btn-warning" onClick={handleEditMenu}
                            disabled={loading}
                            >{t('modal.edit')}</button>
                        </div>
                    </div>
                </div>
            </div>
            

            {/* Modal pour éditer un plat */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
                <Loader loading={loading} />
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{t('modal.editDishTitle')}</h5>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)} disabled={loading}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">{t('form.dishName')}</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={selectedPlat?.nomplat} 
                                    onChange={(e) => setSelectedPlat({ ...selectedPlat, nomplat: e.target.value })} 
                                    disabled={loading}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">{t('form.description')}</label>
                                <textarea 
                                    className="form-control" 
                                    value={selectedPlat?.descripplat} 
                                    onChange={(e) => setSelectedPlat({ ...selectedPlat, descripplat: e.target.value })} 
                                    disabled={loading}
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">{t('form.price')}</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    value={selectedPlat?.prixplat} 
                                    onChange={(e) => setSelectedPlat({ ...selectedPlat, prixplat: e.target.value })} 
                                    disabled={loading}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">{t('form.dishImage')}</label>
                                <input 
                                    type="file" 
                                    className="form-control" 
                                    onChange={(e) => setImageFile(e.target.files[0])} 
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={() => setShowModal(false)} 
                                disabled={loading}
                            >
                                {t('modal.close')}
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                onClick={handleSaveChanges} 
                                disabled={loading}
                            >
                                {t('modal.saveChanges')}
                            </button>
                        </div>
                    </div>
                </div>
</div>

            {/* Modal pour ajouter un plat */}
            <div className={`modal fade ${showAddModal ? 'show' : ''}`} style={{ display: showAddModal ? 'block' : 'none' }}>
                <Loader loading={loading} />
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{t('modal.addDishTitle')}</h5>
                            <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">{t('form.dishName')}</label>
                                <input 
                                    type="text"
                                    className="form-control" 
                                    value={newPlat.nomplat} 
                                    onChange={(e) => setNewPlat({ ...newPlat, nomplat: e.target.value })} 
                                    disabled={loading}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">{t('form.description')}</label>
                                <textarea 
                                    className="form-control"
                                    value={newPlat.descripplat} 
                                    onChange={(e) => setNewPlat({ ...newPlat, descripplat: e.target.value })}
                                    disabled={loading} 
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">{t('form.price')}</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    value={newPlat.prixplat} 
                                    onChange={(e) => setNewPlat({ ...newPlat, prixplat: e.target.value })}
                                    disabled={loading} 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">{t('form.dishImage')}</label>
                                <input 
                                    type="file" 
                                    className="form-control" 
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                    disabled={loading} 
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}
                                disabled={loading}
                                >{t('modal.close')}</button>
                            <button type="button" className="btn btn-success" onClick={handleAddPlat}
                            disabled={loading}
                            >{t('modal.addDish')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Menus;
