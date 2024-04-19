import axios from "axios"; // used to getdata from backend and has multiple features

// define the api which is used in backend to call the register seen
const API_URL = "/api/users"; // from frontend this request will be called from port 3000 to change it write this "proxy": "http://localhost:5000", under version script code in package.json of front end
// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL, userData); //asking for response with axios.post method

  // after getting the response we will store it in local storage in form of string as local storage can store strings only
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login the User
const logIn = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData); // sending post request with userdata to the backend api using axios.post

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout User
const logout = () => localStorage.removeItem("user");

// Exporting the fucntions of authService
const authService = {
  register,
  logout,
  logIn,
};

export default authService;
