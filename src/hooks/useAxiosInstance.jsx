import axios from "axios";


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
});


const useAxiosInstance =()=>{
return axiosInstance
}

export default useAxiosInstance;