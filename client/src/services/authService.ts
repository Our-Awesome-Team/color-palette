import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

// Signup user
const signup = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Signin user
const signin = async (userData: { email: string; password: string }) => {
  const response = await axios.post(API_URL + 'login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  signup,
  signin,
  logout,
};

export default authService;
