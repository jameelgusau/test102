import React, { useState } from "react";
import {useNavigate,
  useParams
} from "react-router-dom";
import { APIS, request } from "../../_services";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import {TextField, CircularProgress,Button} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function PasswordReset() {
  let params = useParams();
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] =  useState(false);

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const validate = () => {
    let temp = {};
    temp.password = password.length > 5 ? "" : "Minimum 6 characters required";
    temp.confirmPassword = password === confirmPassword ? "" : "Password mismatch!";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const submit = async (e) => {
    e.preventDefault();
    if(validate()){
      const { baseUrl, passwordReset: { method, path } } = APIS;
      const data ={
          password,
          confirmPassword,
          token: params.id
      }
      const url = `${baseUrl}${path}`;
      setLoading(true);
  
      const response = await request(method, url, data);
      console.log(response);
      if (response.meta && response.meta.status === 200) {
        navigate("/");
      }if(response.meta && response.meta.status === 400){
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
      <div className="password">
        <div className="password__title">
          <h2 className="password__title--heading">New Password</h2>
        </div>
        <form className="password__input" onSubmit={submit}>
          <TextField
            placeholder="Password"
            variant="outlined"
            className="password__input--item-a"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            {...(errors.password && {
              error: true,
              helperText: errors.password,
            })}
            //onBlur={props.handleBlur('name')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            placeholder="Comfirm Password"
            variant="outlined"
            className="password__input--item-a"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
            {...(errors.confirmPassword  && {
              error: true,
              helperText: errors.confirmPassword ,
            })}
            //onBlur={props.handleBlur('name')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="primary" type="submit"  className="password__input--item-a">
            {loading ? (
              <CircularProgress style={{ color: "#ffffff" }} size={24} />
            ) : (
              "RESET PASSWORD"
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

export default PasswordReset;
