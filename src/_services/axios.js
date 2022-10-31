import axios from "axios";
// import { APIS } from './config'

// const { baseURL } =  APIS
// const baseURL = "http://localhost:9090";
const baseURL = "https://api.hommesestate.com:9090";
// const baseURL = "https://hommesestate.herokuapp.com";
export default axios.create({
  baseURL,
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
