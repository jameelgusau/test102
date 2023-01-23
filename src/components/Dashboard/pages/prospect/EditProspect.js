import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button, CircularProgress, MenuItem } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import { APIS, requestJwt } from "../../../../_services";
import { displayEditProspect } from '../../../../redux/display'
import allCountry from '../../../../data.json'

const EditProspect = (props) => {
    const {getProspect, account } = props
    const myRef = useRef();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [ gender, setGender] = useState("Male");
    const [ country, setCountry ] = useState("Nigeria");
    const [ address, setAddress ] = useState("");
    const [ apartment, setApartment ] = useState("");
    const [ regions, setRegions ] = useState([]);
    const [ state, setState ] = useState("");
    const [ city, setCity ] = useState("");
    const [ zipcode, setZipcode ] = useState();
    const [err, setErr] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [errors, setErrors] = useState({});
    const user = useSelector((state) => state.userProfile.value);
    const display = useSelector((state) => state.displays.openEditProspect);
  
    useEffect(()=>{
      setName(account?.name);
      setEmail(account?.email);
      setPhone(account?.phone);
      setGender(account?.gender);
      setApartment(account?.apartment);
      setCountry(account?.country);
      setAddress(account?.address);
      setZipcode(account?.zipcode);
      setCity(account?.city);
      setState(account?.state);
    
  }, [account])

  useEffect(()=>{
    let selected = allCountry.find(e => e?.countryName === country);
    setRegions(selected?.regions)
    setState(selected?.regions[0]?.name)

  }, [country])
    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (validate()) {
          const {
            baseUrl,
            editProspect: { method, path },
          } = APIS;
          const data = {
            id: account.id,
            name,
            phone,
            email,
            address,
            apartment,
            zipcode,
            state,
            country,
            city,
            gender
          };
          const url = `${baseUrl}${path}`;
          const response = await requestJwt(method, url, data, user.jwtToken);
          if (response.meta && response.meta.status === 200) {
            await getProspect(user.jwtToken);
            closeDialog()
          }
          if (response.meta && response.meta.status >= 400) {
            setLoading(false);
            setErrMessage(response.meta.message);
            setErr(true);
            setTimeout(() => {
              setErr(false);
            }, 2000);
          }
          setLoading(false);
        }
        setLoading(false);
      };

      const gen = [
        {
          id: 1,
          name: "Male",
        },
        {
          id: 2,
          name: "Female",
        },
      ];

      const validate = () => {
        let temp = {};
        temp.name = name.length > 2 ? "" : "Minimum 3 characters required";
        temp.city = city.length > 2 ? "" : "Minimum 3 characters required";
        temp.country = country.length > 2 ? "" : "Minimum 3 characters required";
        temp.zipcode = zipcode.length > 2 ? "" : "Minimum 3 characters required";
        temp.state = state.length > 2 ? "" : "Minimum 3 characters required";
        temp.apartment = apartment.length > 2 ? "" : "Minimum 3 characters required";
        temp.gender = gender.length > 2 ? "" : "Minimum 3 characters required";
        temp.address = address.length > 2 && address.length < 250 ? "" : "Minimum of 3 characters and less than 250 characters required";
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
    
        setErrors({
          ...temp,
        });
        return Object.values(temp).every((x) => x === "");
      };
      
      const closeDialog = () => {
        dispatch(displayEditProspect("none"));
      };

  return (
      <>
        <div className="modal" style={{ display: `${display}` }}>
        <div className="modal__content" ref={myRef}>
          <div className="close">
            <span className="close__icon" onClick={closeDialog}>
              &times;
            </span>
          </div>
          <div className="model-title">
            <h2 className="num model-title__header">Edit Prospect</h2>
          </div>
          <form onSubmit={submit}>
            <div className="property-input">
              <label >Client name*:</label>
            <TextField
                placeholder="Client name"
                className="signup__input--item-a"
                variant="outlined"
                type="text"
                name="Client name"
                // label="Name"
                onChange={({ target }) => {
                  setName(target.value);
                }}
                value={name || ''}
                {...(errors.name && { error: true, helperText: errors.name })}
              />
              <label >Email*:</label>
              <TextField
                placeholder="Email"
                variant="outlined"
                name="email"
                disabled
                className="signup__input--item-b"
                type="email"
                onChange={({ target }) => {
                  setEmail(target.value);
                }}
                value={email || ''}
                {...(errors.email && { error: true, helperText: errors.email })}
              />
              <label >Phone*:</label>
              <MuiPhoneNumber
                defaultCountry={"ng"}
                className="signup__input--item-b"
                onChange={(e) => {
                  setPhone(e);
                }}
                value={phone || ''}
                required
                {...(errors.phone && { error: true, helperText: errors.phone })}
                placeholder="Phone Number"
                variant="outlined"
              />
                            <label>Select gender*:</label>
              <TextField
                placeholder="Select gender"
                select
                name="gender"
                id="select"
                variant="outlined"
                value={gender}
                // label="Select gender"
                defaultValue={"Male"}
                size="small"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                {...(errors.gender && {
                  error: true,
                  helperText: errors.gender,
                })}
              >
                {gen.map(({ name }) => (
                  <MenuItem value={name} key={name}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
              <label >Apartment*:</label>
              <TextField
                placeholder="Apartment"
                className="signup__input--item-a"
                variant="outlined"
                type="text"
                name="apartment"
                // label="Name"
                onChange={({ target }) => {
                  setApartment(target.value);
                }}
                value={apartment}
                {...(errors.apartment && { error: true, helperText: errors.apartment })}
              />
              <label >Address*:</label>
              <TextField
                placeholder="Address"
                className="signup__input--item-a"
                variant="outlined"
                multiline
                rows={4}
                type="text"
                name="address"
                onChange={({ target }) => {
                  setAddress(target.value);
                }}
                value={address || ""}
                {...(errors.address && {
                  error: true,
                  helperText: errors.address,
                })}
              />
              <label >City*:</label>
              <TextField
                placeholder="City"
                className="signup__input--item-a"
                variant="outlined"
                type="text"
                name="city"
                // label="Name"
                onChange={({ target }) => {
                  setCity(target.value);
                }}
                value={city}
                {...(errors.city && { error: true, helperText: errors.city })}
              />
              <label >Country*:</label>
              <TextField
                placeholder="Select Country"
                select
                name="country"
                id="select country"
                variant="outlined"
                value={country}
                // label="Select gender"
                defaultValue={"Nigeria"}
                size="small"
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                {...(errors.country && {
                  error: true,
                  helperText: errors.country,
                })}
              >
                {allCountry.map(({ countryName }) => (
                  <MenuItem value={countryName} key={countryName}>
                    {countryName}
                  </MenuItem>
                ))}
              </TextField>
              <label >Regions/States*:</label>
              <TextField
                placeholder="Select Country"
                select
                name="country"
                id="select country"
                variant="outlined"
                value={state}
                // label="Select gender"
                defaultValue={"Abia"}
                size="small"
                onChange={(e) => {
                  setState(e.target.value);
                }}
                {...(errors.region && {
                  error: true,
                  helperText: errors.region,
                })}
              >
                {regions && regions.map(({ name }) => (
                  <MenuItem value={name} key={name}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
              <label >Zipcode*:</label>
              <TextField
                placeholder="Zipcode"
                className="signup__input--item-a"
                variant="outlined"
                type="number"
                name="zipcode"

                // label="Name"
                onChange={({ target }) => {
                  setZipcode(target.value);
                }}
                value={zipcode}
                {...(errors.zipcode && { error: true, helperText: errors.zipcode })}
              />
              <div className="property-input__btn">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  // className="password__input--item-a"
                >
                  {loading ? (
                    <CircularProgress style={{ color: "#ffffff" }} size={24} />
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "red",
                  marginBottom: "10px",
                }}
              >
                {err ? errMessage : ""}
              </p>
            </div>
          </form>
        </div>
      </div>
      </>
  );
};

export default EditProspect;
