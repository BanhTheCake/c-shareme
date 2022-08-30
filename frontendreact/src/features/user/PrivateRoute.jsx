import React from "react";
import { useSelector } from "react-redux";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./layout/Home";

const PrivateRoute = () => {

  const isUser = !!useSelector((state) => state.user.accessToken)
  if (!isUser) return <Navigate to='/login' />

  return (
    <>
    <Routes>
        <Route path='/*'  element={<Home />}/>
    </Routes>
    </>
  );
};

export default PrivateRoute;
