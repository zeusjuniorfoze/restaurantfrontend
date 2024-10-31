import axios from 'axios';

const url = "http://localhost:8080/api";
//const url = "https://restaurantbackend-flax.vercel.app/api";

class User {

  // Fonction de connexion (login) déjà existante
  async login(formData) {
    const loginUrl = `${url}/login/`;

    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(formData)) {
      params.append(key, value);
    }

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    try {
      const response = await axios.post(loginUrl, params, config);
      const token = response.data.token; 
      localStorage.setItem('token', token); 
      return response; 
    } catch (error) {
      console.error("Erreur lors de la connexion");
      throw error; 
    }
  }

  
  async verifyToken() {
    const verifyUrl = `${url}/verify-token/`;
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error("Aucun token trouvé");
    }

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      const response = await axios.post(verifyUrl, {}, config); 
      return response.data; 
    } catch (error) {
      console.error("Erreur lors de la vérification du token");
      throw error;
    }
  }

  async getLogin() {
    const verifyUrl = `${url}/getlogin/`;
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error("Aucun token trouvé");
    }

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      return await axios.get(verifyUrl, config); 
  
    } catch (error) {
      console.error("Erreur lors de la vérification du token");
      throw error;
    }
  }


  
}

export default new User();
