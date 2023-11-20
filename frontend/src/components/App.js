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
  useEffect(() => {
    tokenCheck();
  }, []);

  const [userData, setUserData] = useState('');

  function handleLogin() {
    tokenCheck();
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getContent(token).then(({ data }) => {
        setUserData(data);
        setLoggedIn(true);
        navigate('/');
      });
    }
  }

  // ------------------JSX-------------------------
  return (
    <AppContext.Provider value={{ state: loggedIn, user: userData }}>
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setUserData={setUserData}
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
