import axios from 'axios';
import { authCurrentUser, authLogout } from '../services/Auth/Auth.service.js';

/**
 * Creates an axios instance from the .env file
 * @type {AxiosInstance}
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_DOMAIN,
});
api.interceptors.request.use(
  (config) => {
    const user = authCurrentUser();
    if (user.token !== null) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
// Response interceptor
api.interceptors.response.use(
  (response) => {
    if (typeof response.data.status !== 'undefined') {
      if (response.data.status === 'Token is Expired') {
        // alert('Por favor inicia sesión de nuevo.')
        authLogout();
      }
    }
    if (typeof response.data.success !== 'undefined' && response.data.message === 'No Autorizado') {
      // alert('Por favor inicia sesión de nuevo.')
      authLogout();
    }
    return response;
  },
  (err) => {
    if (err.response) {
      if (err.response.status === 401) {
        authLogout();
        let public_url = import.meta.env.BASE_URL;
        history.push({ pathname: public_url + '/login' });
        window.location.reload();
      } else if (err.response.status === 405 || err.response.status === 500) {
        // alert('Hubo un error con su pedido.')
      } else {
        // alert('Error de conexión, por favor trata de nuevo.')
      }
    } else {
      // alert('Error de conexión, por favor trata de nuevo.')
    }
    return Promise.reject(err);
  },
);
export { api };
