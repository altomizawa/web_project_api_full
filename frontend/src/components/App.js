import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

//---------------IMPORTING COMPONENTS-----------------
import Main from './Main';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import { AppContext } from './AppContext';

//---------------------------------------------------------------------------------------------------------------------

export default function App() {
  
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'))
  //const token = localStorage.getItem('token')

//Check for previous authorization on app start (token)
useEffect(() => {
  tokenCheck();
}, []);

//check if there's a token
function tokenCheck() {
  if (token) {
    handleLogin()
  }
}

//Handle successful login
function handleLogin() {
  auth.getContent(localStorage.getItem('token')).then((data) => {
    setUserData(data);
    setLoggedIn(true);
    navigate('/')
  })
}


  // ------------------JSX-------------------------
  return (
    <AppContext.Provider value={{ state: loggedIn, user: userData }}>
      <Header
        setLoggedIn={setLoggedIn}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
      <Footer />
    </AppContext.Provider>
  );
}
