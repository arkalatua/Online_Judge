import axios from 'axios'

export const registerUpload = async (data) => {
  try {
    const response = await axios.post(import.meta.env.VITE_API_URL + '/register', data);
    return response.data;
  } catch (error) {
    console.error("Error details:", {
      request: error.config,
      response: error.response?.data
    });
    throw error;
  }
}

export const loginUpload = async (data) => {
  try {
    const response = await axios.post(import.meta.env.VITE_API_URL + '/login', data);
    return response.data;
  } catch (error) {
    console.error("Error details:", {
      request: error.config,
      response: error.response?.data
    });
    throw error;
  }
}

export const problemUpload = async (data) => {
  try {
    const response = await axios.post(import.meta.env.VITE_API_URL + '/problems', data);
    return response.data;
  } catch (error) {
    console.error("Error details:", {
      request: error.config,
      response: error.response?.data
    });
    throw error;
  }
}