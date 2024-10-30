import axios from 'axios';

const url = "http://127.0.0.1:8080/api"; 
/* const url = "https://restaurantbackend-flax.vercel.app/api"; */
class Menus{

    getMenu(){
        const urls = url+'/menus-get';
        
        return axios.get(urls);
    }

    //pour les plat 

    async deletePlat(menuId, nomplat){    
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${url}/plat-delete/${menuId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    nomplat
                }
            });
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la suppression du plat:", error);
            throw error;
        }

    }

    async modifierPlat(menuId, platId, updatedData) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${url}/plat-update/${menuId}/${platId}`, updatedData, {
                headers: {
                    'Authorization': token, // Inclure le token dans les en-têtes
                },
            });
            return response.data; // Retourner les données de la réponse
        } catch (error) {
            throw error.response ? error.response.data : new Error('Erreur lors de la mise à jour du plat');
        }
    }

    async ajouterPlat(menuId, updatedData) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${url}/plat-ajouter/${menuId}`, updatedData, {
                headers: {
                    'Authorization': token, // Inclure le token dans les en-têtes
                },
            });
            return response.data; // Retourner les données de la réponse
        } catch (error) {
            throw error.response ? error.response.data : new Error('Erreur lors de la mise à jour du plat');
        }
    }

    //pour le menus

    async deleteMenus(menuId){    
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${url}/menus-delete/${menuId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la suppression du menu:", error);
            throw error;
        }

    }

    async ajouterMenus(typeplat){    
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${url}/menus-create/`, {
                typeplat
            }
                ,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Erreur lors de l'ajout du menu:", error);
            throw error;
        }

    }

    async modifierMenus(menuid,typeplat){    
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${url}/menus-update/${menuid}`, {
                typeplat
            }
                ,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Erreur lors de l'ajout du menu:", error);
            throw error;
        }

    }




}

export default new Menus();
