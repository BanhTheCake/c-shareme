import React from "react";
import {
    Routes,
    Route,
  } from "react-router-dom";
import { memo } from "react";
import PinDetails from "./layout/PinDetails";
import PinCreated from "./layout/PinCreated";
import PinsCategory from "./layout/PinsCategory";
import PinsHome from "./layout/PinsHome";

const PinsRouter = () => {
  return (
    <>
    <Routes>
        <Route path="/*" element={<PinsHome />} />
        <Route path="/pin/details/:id" element={<PinDetails />} />
        <Route path="/pin/create" element={<PinCreated />} />
        <Route path="/pin/category/:tag" element={<PinsCategory />} />
    </Routes>
    </>
  );
};

export default memo(PinsRouter);
