import { axiosPrivate } from "../_services/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useSelector } from "react-redux";

const useAxiosPrevate = () => {
  const refresh = useRefreshToken();
  const user = useSelector((state) => state.userProfile.value);
    useEffect(()=>{

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config =>{
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] =  `Bearer ${user?.jwtToken}`;

                }
                return config

            }, (error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response =>{ 
            console.log(response)
            return response },
            async (error)=> {
                console.log(error);
                const prevRequest = error?.config;
                 if((error?.response?.status === 403 || error?.response?.status === 401) && !prevRequest?.sent){
                     prevRequest.sent = true;
                     const newAccessToken =  await refresh()
                     prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                     return axiosPrivate(prevRequest)
                 }
                return  (error) => Promise.reject(error)
            }
        );
        return () =>{
            axiosPrivate.interceptors.request.eject(requestIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }
    }, [user, refresh])
  return axiosPrivate;
};

export default useAxiosPrevate;