import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;
const axiosInstance = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.message) {
      console.err(err.response.message);
    } else if (!err.response.message) {
      console.log("Please check your interenet connection");
    } else {
      console.log("Something went wrong");
    }
    return Promise.reject(err);
  }
);


    export const RegisterAPI = async (payload)=>{
        return  axiosInstance.post('/auth/signup',payload)

    }
