import React from "react";
import Sidebar from "../../../components/Sidebar";
import {
  Routes,
  Route,
  Link,
} from "react-router-dom";
import UserProfile from "./UserProfile";
import PinsRouter from "../../pins/PinsRouter";
import Pins from "../../pins/layout/Pins";
import { AiOutlineMenuUnfold } from 'react-icons/ai'
import logo from '../../../assets/logo.png'
import { useSelector } from "react-redux";
import { useState } from "react";

const Home = () => {

  const [toggle, setToggle] = useState(false)

  const userData = useSelector((state) => state.user.data)

  const handleClose = () => {
    if (toggle) setToggle(false)
  }

  return <div>
    <div className="md:flex hidden">
      <Sidebar />
    </div>
    <div className="flex md:hidden justify-between items-center p-2">
      <div className="cursor-pointer" onClick={() => setToggle(true)}>
        <AiOutlineMenuUnfold size={38}  />
      </div>
      <Link to='/' className="w-[150px]" onClick={handleClose}>
        <img className="w-full" src={logo} alt="" />
      </Link>
      <Link to={`/user/${userData.userId}`} className="w-[46px] h-[46px]" onClick={handleClose}>
        <img className='w-full h-full object-cover rounded-[6px]' src={userData?.image || 'https://source.unsplash.com/1600x900'} alt="" />
      </Link>
    </div>
    <div className="flex md:hidden">
      { toggle && <Sidebar toggle={toggle} setToggle={setToggle} />}
    </div>
    <div className="md:pl-[230px]">
    <Routes>
      <Route path="/user/:id" element={<UserProfile />} />
      <Route path="*" element={<PinsRouter />} />
    </Routes>
    </div>
  </div>;
};

export default Home;
