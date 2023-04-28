import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://reservasrestfullapp.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const get = async (url) => {
    try {
      const response = await instance.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching data');
    }
  };
  const post = async (url, data) => {
    try {
      const response = await instance.post(url, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating resource');
    }
  };
  
  const put = async (url, data) => {
    try {
      const response = await instance.put(url, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Error updating resource');
    }
  };
  
  const del = async (url) => {
    try {
      const response = await instance.delete(url);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting resource');
    }
  };
  export default {
    get,
    post,
    put,
    del,
  };