import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-7f03e-default-rtdb.firebaseio.com/'
});

export default instance;