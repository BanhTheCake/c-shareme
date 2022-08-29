import React from "react";
import {
    Routes,
    Route,
  } from "react-router-dom";
import Pins from "./layout/Pins";
import { memo } from "react";
import PinDetails from "./layout/PinDetails";
import PinCreated from "./layout/PinCreated";

const PinsRouter = () => {
  return (
    <>
    <Routes>
        <Route path="/*" element={<Pins />} />
        <Route path="/pinDetails/:id" element={<PinDetails />} />
        <Route path="/pin/create" element={<PinCreated />} />
    </Routes>
    </>
  );
};

export default memo(PinsRouter);
