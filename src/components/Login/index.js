import React, { useState } from "react";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import { useNavigate, Link, useLocation } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import {TextField, CircularProgress,Button} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { setAlert } from "../../redux/snackbar";
import { APIS, request } from "../../_services";
import { userProfile } from '../../redux/userProfile'


function Login() {
  let navigate = useNavigate();
  const location = useLocation()
  const from = location.state?.from?.pathname || "/ "
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [errors, setErrors] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] =  useState(false);
  const dispatch = useDispatch();
  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const validate = () => {
    let temp = {};
    temp.password = password.length > 5 ? "" : "Minimum 6 characters required";
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
      const { baseUrl, login: { method, path } } = APIS;
      const data ={
          email,
          password
      }
      const url = `${baseUrl}${path}`;
      setLoading(true);
      const response = await request(method, url, data);
      console.log(response);
      if (response.meta && response.meta.status === 200) {
        dispatch(userProfile(response.data))
        console.log(from)
        navigate(from, {replace: true});
        dispatch( setAlert({ open: true,
          severity: "success",
          color: "primary",
          message: "Welcome!"
      }))
      }if(response.meta && response.meta.status >= 400){
          setErrMessage(response.meta.message)
          dispatch(setAlert({ open: true,
            severity: "error",
            color: "error",
            message: response.meta.message
        }))
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
      <div className="login">
      <div className="login__already">
          <p className="login__already--paragraph">Don’t Have An Account? <Link to="/signup">Register</Link>
            </p>
        </div>
        <div className="login__title">
          <h2 className="login__title--heading">Login</h2>
        </div>
        <form className="login__input" onSubmit={submit}>
          <TextField
            placeholder="Email"
            variant="outlined"
            className="login__input--item-a"
            type="email"
            onChange={({ target }) => {
              setEmail(target.value);
            }}
            value={email}
            {...(errors.email && { error: true, helperText: errors.email })}
          />
                <div className="login__already">
          <p className="login__already--paragraph"><Link to="/initpassword">Forgot Password?</Link>
            </p>
        </div>
          <TextField
            placeholder="Password"
            variant="outlined"
            className="login__input--item-a"
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
          <Button variant="contained" color="primary" type="submit"  className="login__input--item-a">
            {loading ? (
              <CircularProgress style={{ color: "#ffffff" }} size={24} />
            ) : (
              "LOG IN"
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

export default Login;
