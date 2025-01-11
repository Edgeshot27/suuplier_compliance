import axios from 'axios';
const BASE_URL = 'https://api.example.com';

export const getSuppliers = async () => {
  const response = await axios.get(`${BASE_URL}/suppliers`);
  return response.data;
};

export const getSupplierDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/suppliers/${id}`);
  return response.data;
};
