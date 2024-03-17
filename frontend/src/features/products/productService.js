import axios from 'axios';
import { base_url, config } from '../../utils/base_url';

const getProducts = async () => {
  const response = await axios.get(`${base_url}product`);
  return response.data;
}

const addToWishlist = async (proId) => {
  const response = await axios.put(`${base_url}product/wishlist`, { proId }, config);
  return response.data;
}


const authService = {
  getProducts,
  addToWishlist,
}

export default authService