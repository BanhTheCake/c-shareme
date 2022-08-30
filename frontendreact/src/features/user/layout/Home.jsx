import React from "react";
import Sidebar from "../../../components/Sidebar";
import {
  Routes,
  Route,
  Link,
} from "react-router-dom";
import UserProfile from "./UserProfile";
import PinsRouter from "../../pins/PinsRouter";
import { AiOutlineMenuUnfold } from 'react-icons/ai'
import logo from '../../../assets/logo.png'
import { useSelector } from "react-redux";
import { useState } from "react";
import Menu from "../components/Menu";

const Home = () => {
  return (
    <div>
    <Menu />
    <div className="md:pl-[230px]">
    <Routes>
      <Route path="/user/:id" element={<UserProfile />} />
      <Route path="/*" element={<PinsRouter />} />
    </Routes>
    </div>
  </div>
  )
};

export default Home;
