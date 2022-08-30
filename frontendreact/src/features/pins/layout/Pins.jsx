import React from "react";
import Search from "../components/Search";
import {
  Routes,
  Route,
} from "react-router-dom";
import PinsCategory from "./PinsCategory";
import PinsHome from "./PinsHome";

const Pins = () => {
  return (
    <div className="bg-slate-100 min-h-screen">
    <Search />
    <Routes>
        <Route path="/pin/category/:tag" element={<PinsCategory />} />
        <Route path="/" element={<PinsHome />} />
    </Routes>
  </div>
  );
};

export default Pins;
