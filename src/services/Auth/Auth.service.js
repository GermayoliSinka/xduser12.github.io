import { api } from '../../config/site.config.js';
import { storageDelete, storageGet } from '../Storage/Storage.js';

const authLogin = async (userLoginAttempt) => {
  return await api.post('auth/login', userLoginAttempt);
};
const authLogout = () => {
  storageDelete('user');
  storageDelete('token');
};

const authCurrentUser = () => {
  return { ...storageGet('user'), token: storageGet('token') };
};

export { authLogin, authLogout, authCurrentUser };
