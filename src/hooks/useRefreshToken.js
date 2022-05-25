// import axios from "../_services/axios";
import { userProfile } from "../redux/userProfile";
import { APIS, request } from "../_services";

import { useDispatch } from "react-redux";
const useRefreshToken = () => {
    
  
  // const user = useSelector((state) => state.userProfile.value);
  const dispatch = useDispatch();
  // const refresh = async()=>{
  //     const response =  await axios.post("/api/refresh-token", {
  //         withCredentials: true,

  //     });
  //     // dispatch(userProfile(response.data))
  //     console.log(response.data, "refresh")

  // }
  const refresh = async () => {
    // const url = `${baseUrl}${path}`;
    const {
      baseUrl,
      refreshtoken: { method, path },
    } = APIS;
    const url = `${baseUrl}${path}`;
    // setLoading(true);
    const data = {};
    const response = await request(method, url, data);
    dispatch(userProfile(response.data));
    // console.log(response.data.jwtToken);
    return response.data.jwtToken;
  };

  return refresh;
};

export default useRefreshToken;
