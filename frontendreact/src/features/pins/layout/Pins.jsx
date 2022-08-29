import React from "react";
import Search from "../components/Search";
import MasonryPins from "./MasonryPins";
import {
  Routes,
  Route,
} from "react-router-dom";
import PinsCategory from "./PinsCategory";
import PinsHome from "./PinsHome";
import UserProfile from "../../user/layout/UserProfile";
import PinDetails from "./PinDetails";

const Pins = () => {
  return (
    <div className="bg-slate-100 min-h-screen">
    <Search />
    <Routes>
        <Route path="/category/:tag" element={<PinsCategory />} />
        <Route path="/" element={<PinsHome />} />
    </Routes>
  </div>
  );
};

export default Pins;
