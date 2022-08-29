import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import client from "../../../app/client";
import { pinsQuery } from "../../../utils/data";
import { handleUpdateCategory, handleUpdateSearchBox } from "../../user/userSlice";
import MasonryPins from "./MasonryPins";

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
    <MasonryPins query={query} numberSlice={searchTemp.searchBox ? 0 : 0} />
  );
};

export default PinsHome;
