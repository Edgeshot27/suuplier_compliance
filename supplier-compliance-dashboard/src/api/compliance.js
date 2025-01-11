import axios from 'axios';
const BASE_URL = 'https://api.example.com';

export const uploadComplianceData = async (data) => {
  const response = await axios.post(`${BASE_URL}/compliance`, data);
  return response.data;
};
