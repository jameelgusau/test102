// MdOutlineMarkEmailRead
import React, { useEffect, useState } from "react";
import { APIS, request } from "../../_services";
import { IconContext } from "react-icons";
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import { RiMailCloseLine } from 'react-icons/ri';
import { NavLink } from "react-router-dom";
import logo2 from '../../assets/img/whitelogo.svg'
import {
  useParams
} from "react-router-dom";
import Loading from "../Loading";

function ConfirmEmail() {
  // const 
  let params = useParams();
  const [ loading, setLoading ] = useState(false);
  const [ err, setErr ] = useState(false);
  const [ errMessage, setErrMessage ] = useState("");

    useEffect(() => {
      verifyEmail()
       // eslint-disable-next-line
  }, [])

  const verifyEmail = async () => {
    setLoading(true);
    const { baseUrl, verifytoken: { method, path } } = APIS;
    const data ={
        token: params.id
    }
    const url = `${baseUrl}${path}`;
    const response = await request(method, url, data);
    if (response.meta && response.meta.status === 200) {
        setErrMessage(response.meta.message)
    }else if(response.meta && response.meta.status >= 400){
        setErrMessage(response.meta.message)
        setErr(true)
        setLoading(false);
    }
    setLoading(false);
  };

  return (
   <>
   {
     loading ?(
       <Loading />
     ):(
      <div className="container">
      <img src={logo2} alt="Logo" className="logowhite"/>
      <div className="confirm">
 
        <div className="confirm__email">
       {
         !err ? (
          <IconContext.Provider
          value={{ color: "green", size: "70px" }}             
        >
          <div>
            <MdOutlineMarkEmailRead />
          </div>
        </IconContext.Provider>
         ):(
          <IconContext.Provider
          value={{ color: "red", size: "70px" }}             
        >
          <div>
            <RiMailCloseLine />
          </div>
        </IconContext.Provider>
         )
       }
      </div>
       <p className="checkmail__paragraph">
           {errMessage}
      </p>
      <div className="confirm__btn">
        <NavLink   className="confirm__btn--link" to="/">Log In</NavLink>
      </div>
     
    </div>
    </div>
     )
   }
   </>
  );
}

export default ConfirmEmail;
