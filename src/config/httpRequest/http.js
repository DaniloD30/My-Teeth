import axios from 'axios';
// import { addInterceptors } from './interceptors';

const _instance = null;

const getInstance = () => {
  if (_instance !== null) return _instance;

  const config = {
    baseURL: process.env.REACT_APP_API_URL
    // headers: { 'tenantId': 'tpc' } 
  };

  // if (process.env.NODE_ENV !== 'development') {
  //   config['timeout'] = process.env.TIMEOUT || 5000;
  // }

  let newInstance = axios.create(config);

//   newInstance = addInterceptors(newInstance);

  return newInstance;
};

export default getInstance();
