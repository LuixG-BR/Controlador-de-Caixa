import axios from "axios";


const api = axios.create({

    baseURL:"https://controlador-de-caixa.onrender.com"

});

export default api;