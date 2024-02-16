import axios from "axios";
export const Axios = axios.create({
    baseURL: 'http://localhost:3002/api/v1/',
    // baseURL: 'https://backend-lovat-beta.vercel.app/api/v1/',

    timeout: 1000,
    withCredentials:true
  });

Axios.interceptors.response.use((config)=>{

  console.log("config:",config.data)
  return config;
})

Axios.interceptors.request.use((config)=>{

  console.log("config:",config)
  return config;
})