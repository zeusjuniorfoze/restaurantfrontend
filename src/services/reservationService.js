import axios from 'axios';

//const url = "http://127.0.0.1:8080/api";
const url = "https://restaurantbackend-flax.vercel.app/api";
class Reservation{

    getReservation(){
        const urls = `${url}/reservations`;
        
        return axios.get(urls);
    }

    create(formDate){
        const urls = url+'/reservations-create';
        const config = {
            headers:{
                'Content-Type' : 'application/json'
            }
        };

        return axios.post(urls, formDate, config);

    }

    async updateStatut(idReservation, statut){
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${url}/update-statut/${idReservation}`, statut, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la modification du statut", error);
            throw error;
        }

    }


}

export default new Reservation();
