import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useParams } from "react-router-dom";
import { pinsQuery } from "../../../utils/data";
import { handleUpdateCategory } from "../../user/userSlice";
import MasonryPins from "../components/MasonryPins";
import Search from "../components/Search";

const PinsCategory = () => {

  const [query, setQuery] = useState(null)

  const searchTemp = useSelector(state => state.user.searchTerm)

  const tagRef = useRef(null)

  const dispatch = useDispatch()

  const { tag } = useParams()

  useEffect(() => {
      dispatch(handleUpdateCategory(tag))
  }, [tag, dispatch])
  
  useEffect(() => {
    if(searchTemp.category) {
      const currentQuery = pinsQuery(searchTemp)
      setQuery(currentQuery)
    }
  }, [JSON.stringify(searchTemp)])

  return (
    <div className="bg-slate-100 min-h-screen">
    <Search />
    <MasonryPins query={query}/>
  </div>
  );
};

export default PinsCategory;
