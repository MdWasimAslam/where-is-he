import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from './Config';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem('auth') === 'true');
  

  const login = async (payload) => {
    try {
      const response = await axios.post(`${config.api}/users/login`, payload);
      if (response.status === 200) {
        setAuth(true);
        console.log(response.data);
        localStorage.setItem('auth', 'true');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('coupleId', response.data.coupleId);
      } else {
        setAuth(false);
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuth(false);
    }
  };

  const signup = async (payload) => {
    try {
      const response = await axios.post(`${config.api}/users/register`, payload);
      if (response.status === 200) {
       toast.success('User created successfully');
      } else {
        setAuth(false);
      }
    } catch (error) {
      alert('User already exists');
    }
  };

  const logout = () => {
    setAuth(false);
    localStorage.clear();
  };

  useEffect(() => {
    if (localStorage.getItem('auth') === 'true') {
      const token = localStorage.getItem('token');
      try {
        const decoded = jwtDecode(token);
        // Optional: Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          logout();
        }
      } catch (error) {
        console.error('Token decode error:', error);
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout, signup }}>
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
