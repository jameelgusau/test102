import React, { useState } from "react";
import {TextField, CircularProgress,Button} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { APIS, request } from "../../_services";
import logo2 from '../../assets/img/whitelogo.svg'



function InitReset() {
  let navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [errors, setErrors] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] =  useState(false);

  const validate = () => {
    let temp = {};
    temp.email =
      /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/.test(
        email
      )
        ? ""
        : "Email is not valid";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const submit = async (e) => {
    e.preventDefault();
    if(validate()){
      const { baseUrl, initreset: { method, path } } = APIS;
      const data ={
          email,
      }
      const url = `${baseUrl}${path}`;
      setLoading(true);
      
      const response = await request(method, url, data);
      console.log(response);
      if (response.meta && response.meta.status === 200) {
        navigate("/resetmail");
      }if(response.meta && response.meta.status >= 400){
          setErrMessage(response.meta.message)
          setErr(true)
          setLoading(false);
          setTimeout(() => {
              setErr(false) 
          }, 2000);
      }
      setLoading(false);
  }
  };
  return (
    <div className="container">
      <img src={logo2} alt="Logo" className="logowhite"/>
      <div className="initpassword">
      <div className="login__already">
          <p className="login__already--paragraph"><Link to="/">back to Login</Link>
            </p>
        </div>
        <div className="initpassword__title">
          <h2 className="initpassword__title--heading">Reset Password</h2>
        </div>
        <form className="initpassword__input" onSubmit={submit}>
          <TextField
            placeholder="Email"
            variant="outlined"
            className="initpassword__input--item-a"
            type="email"
            onChange={({ target }) => {
              setEmail(target.value);
            }}
            value={email}
            {...(errors.email && { error: true, helperText: errors.email })}
          />
          <Button variant="contained" color="primary" type="submit"  className="initpassword__input--item-a">
            {loading ? (
              <CircularProgress style={{ color: "#ffffff" }} size={24} />
            ) : (
              "SEND INSTRUCTIONS"
            )}
          </Button>
        </form>
        <p style = {{display: "flex", justifyContent: "center", color: "red", marginBottom: "10px"}} 
            >{ err ? errMessage: ""}</p>
        <div className="copyright">
              <p className="copyright__paragraph">&copy; {new Date().getFullYear()} STETiS Limited. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default InitReset;
