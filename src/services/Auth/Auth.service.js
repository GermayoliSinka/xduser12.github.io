import { api } from '../../config/site.config.js';

const authLogin = async (userLoginAttempt) => {
  return await api.post('auth/login', userLoginAttempt);
};
const authLogout = () => {};
export { authLogin, authLogout };
