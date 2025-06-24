import axios from 'axios';

export const registerUpload = async (data) => {
  try {
    const response = await axios.post(`http://localhost:5000/register`, data);
    return response.data;
  } catch (error) {
    console.error("Error details:", {
      request: error.config,
      response: error.response?.data
    });
    throw error;
  }
}