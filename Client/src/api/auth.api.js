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
    if (err.response) {
      console.log("if error response got", err.response);
    } else if (!err.response) {
      console.log("Please check your interenet connection");
    } else {
      console.log("Something went wrong");
    }

    if (err.response.status == 401) {

      console.log("ready to get navigate to authentication route");
      window.location.href = "/login";
    }
    return Promise.reject(err.response?.data);
  }
);

export const RegisterAPI = async (payload) => {
  return await axiosInstance.post("/auth/signup", payload);
};

export const LoginAPI = async (payload) => {
  return await axiosInstance.post("/auth/signin", payload, {
    withCredentials: true,
  });
};
export const GoogleAuthApi = async (payload) => {
  return await axiosInstance.post("/auth/google", payload, {
    withCredentials: true,
  });
};

export const UpdateUser = async (payload, id) => {
  return await axiosInstance.patch(`/user/update/${id}`, payload, {
    withCredentials: true,
  });
};

export const deleteUser = async(id)=>{
  return await axiosInstance.delete(`/user/delete/${id}`,{withCredentials:true})
}

export const userSignout = async()=>{
  return await axiosInstance.get('/auth/signout')
}

export const createListingApi = async (payload)=>{
  return await axiosInstance.post('/listing/create',payload,{withCredentials:true,headers:{'Content-Type':'multipart/form-data'}}
  )
}


export const getListings = async(id)=>{
  return await axiosInstance.get(`/listing/get/${id}`,{withCredentials:true})
}


export const deleteListing = async (id)=>{
  return await axiosInstance.delete(`/listing/delete/${id}`,{withCredentials:true})
}
export const getListing = async (id)=>{
  return await axiosInstance.delete(`/listing/get/${id}`,{withCredentials:true})
}

export const updateListing = async(payload,id)=>{
  return await axiosInstance.patch(`/listing/update/${id}`,payload,{withCredentials:true, headers:{'Content-Type':'multipart/form-data'}})
}

