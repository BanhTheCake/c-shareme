import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import client from "../../../app/client";
import { pinsQuery } from "../../../utils/data";
import { handleUpdateCategory, handleUpdateSearchBox } from "../../user/userSlice";
import MasonryPins from "../components/MasonryPins";
import Search from "../components/Search";

const PinsHome = () => {

    const [query, setQuery] = useState(null)

    const searchTemp = useSelector(state => state.user.searchTerm)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(handleUpdateCategory(''))
    }, [dispatch])

    useEffect(() => {
        const currentQuery = pinsQuery(searchTemp)
        setQuery(currentQuery)
    }, [searchTemp])

  return (
    <>
    <div className="bg-slate-100 min-h-screen">
    <Search />
    <MasonryPins query={query} numberSlice={searchTemp.searchBox ? 0 : 0} />
    </div>
    </>
  );
};

export default PinsHome;
