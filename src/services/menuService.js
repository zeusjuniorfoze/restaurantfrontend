import axios from 'axios';

/* const url = "http://127.0.0.1:8080/api"; */
const url = "https://restaurantbackend-flax.vercel.app/api";
class Menus{

    getMenu(){
        const urls = url+'/menus-get';
        
        return axios.get(urls);

    }


}

export default new Menus();
