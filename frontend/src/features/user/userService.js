import axios from 'axios';
import { base_url } from '../../utils/base_url';

const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);
  return response.data;
}


const authService = {
  register
}

export default authService