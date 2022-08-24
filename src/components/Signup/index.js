import React, { useState } from "react";
import MuiPhoneNumber from "material-ui-phone-number";
import { useNavigate, Link } from "react-router-dom";
import { APIS, request } from "../../_services";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { TextField, CircularProgress, Button } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo2 from '../../assets/img/whitelogo.svg'

function Signup() {
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

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
    temp.name = name.length > 2 ? "" : "Minimum 3 characters required";
    temp.password = password.length > 5 ? "" : "Minimum 6 characters required";
    temp.confirmPassword =
      password === confirmPassword ? "" : "Password mismatch!";
    temp.email =
      /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/.test(
        email
      )
        ? ""
        : "Email is not valid";
    temp.phone =
      /^\(*\+*[1-9]{0,3}\)*-*[1-9]{0,3}[-. /]*\(*[2-9]\d{2}\)*[-. /]*\d{3}[-. /]*\d{4} *e*x*t*\.* *\d{0,4}$/.test(
        phone
      )
        ? ""
        : "Phone is not valid";
    temp.address =
      address.length > 2 && address.length < 250
        ? ""
        : "Minimum of 3 characters and less than 250 characters required";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log(validate(), "login");
    if (validate()) {
      const {
        baseUrl,
        initSignup: { method, path },
      } = APIS;
      const data = {
        email,
        phone,
        name,
        address,
        password,
        confirmPassword,
      };
      const url = `${baseUrl}${path}`;
      setLoading(true);
      const response = await request(method, url, data);
      console.log(response);
      if (response.meta && response.meta.status === 200) {
        navigate("/checkmail");
      }
      if (response.meta && response.meta.status >= 400) {
        setErrMessage(response.meta.message);
        setErr(true);
        setLoading(false);
        setTimeout(() => {
          setErr(false);
        }, 2000);
      }
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <img src={logo2} alt="Logo" className="logowhite"/>
      <div className="signup">
        <div className="signup__already">
          <p className="signup__already--paragraph">
            Already Have An Account? <Link to="/">Login</Link>
          </p>
        </div>
        <div className="signup__title">
          <h2 className="signup__title--heading">Create Account</h2>
        </div>
        <form className="signup__input" onSubmit={submit}>
          <TextField
            placeholder="Name"
            className="signup__input--item-a"
            variant="outlined"
            type="text"
            onChange={({ target }) => {
              setName(target.value);
            }}
            value={name}
            {...(errors.email && { error: true, helperText: errors.name })}
          />
          <TextField
            placeholder="Email"
            variant="outlined"
            className="signup__input--item-b"
            type="email"
            onChange={({ target }) => {
              setEmail(target.value);
            }}
            value={email}
            {...(errors.email && { error: true, helperText: errors.email })}
          />
          <MuiPhoneNumber
            defaultCountry={"ng"}
            className="signup__input--item-b"
            onChange={(e) => {
              setPhone(e);
            }}
            value={phone}
            required
            {...(errors.phone && { error: true, helperText: errors.phone })}
            placeholder="Phone Number"
            variant="outlined"
          />
          <TextField
            placeholder="Address"
            className="signup__input--item-a"
            variant="outlined"
            multiline
            rows={4}
            type="text"
            onChange={({ target }) => {
              setAddress(target.value);
            }}
            value={address || ""}
            {...(errors.address && {
              error: true,
              helperText: errors.address,
            })}
          />
          <TextField
            placeholder="Password"
            variant="outlined"
            className="signup__input--item-b"
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
            placeholder="Confirm password"
            variant="outlined"
            className="signup__input--item-b"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
            {...(errors.confirmPassword && {
              error: true,
              helperText: errors.confirmPassword,
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="signup__input--item-a"
          >
            {loading ? (
              <CircularProgress style={{ color: "#ffffff" }} size={24} />
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
        <p style={{ display: "flex", justifyContent: "center", color: "red" }}>
          {err ? errMessage : ""}
        </p>
        <p className="signup__text">
          By creating an account, you have read, understood and agree to the{" "}
          <Link to="/">Terms & Conditions</Link> and{" "}
          <Link to="/">Privacy Policy</Link>.
        </p>
        <div className="copyright">
          <p className="copyright__paragraph">
            &copy; {new Date().getFullYear()} STETiS Limited. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
