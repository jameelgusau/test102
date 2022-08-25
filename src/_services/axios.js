import axios from "axios";
// import { APIS } from './config'

// const { baseURL } =  APIS
const baseURL = "http://localhost:4000";
// const baseURL = "https://hommesestate.herokuapp.com";
export default axios.create({
  baseURL,
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
