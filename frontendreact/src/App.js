import { useState } from 'react'
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './features/auth/layout/Login'
import Home from './features/user/layout/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PrivateRoute from './features/user/PrivateRoute';

function App() {

  // ${import.meta.env.VITE_APP_CLIENT_GOOGLE}

  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<PrivateRoute />} />
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
