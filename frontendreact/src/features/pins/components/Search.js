import { debounce } from 'lodash';
import React from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { handleUpdateSearchBox } from '../../user/userSlice';

const Search = () => {
    const userImage = useSelector((state) => state.user.data.image);
    const userId = useSelector((state) => state.user.data.userId);
    const searchBox = useSelector((state) => state.user.searchTerm.searchBox)

    const [valueInit, setValueInit] = useState(searchBox)
    
    const dispatch = useDispatch()

    const handleSearch = useMemo(() => {
        const func = (data) => {
            const searchBox = data
            dispatch(handleUpdateSearchBox(searchBox.toLowerCase()))
        }
        return debounce(func, 300)
    }, [dispatch])

    const handleOnInput = (e) => {
        setValueInit(e.target.value)
        handleSearch(e.target.value)
    }

    const handleDelete = () => {
        if (valueInit) {
            setValueInit('')
            dispatch(handleUpdateSearchBox(''))
        }
    }


    return (
        <div className="flex w-full p-4">
            <div className='flex-1 relative shadow-md bg-white rounded-[4px]'>
            <AiOutlineSearch
                size={28}
                className="absolute top-[50%] translate-y-[-50%] left-2"
            />
            <input
                type="text"
                className="w-full px-4 py-2 pl-12 pr-16 outline-none bg-transparent shadow-md rounded-[4px] text-inherit"
                placeholder="Search ..."
                onChange={(e) => handleOnInput(e)}
                value={valueInit}
            />
            <button
                onClick={handleDelete}
                className='absolute top-[50%] translate-y-[-50%] right-3 leading-normal px-2 rounded-[2px] cursor-pointer text-red-500 font-semibold'>Delete</button>
            </div>
            <NavLink to={`/user/${userId}`} className='hidden md:flex ml-4'>
            <img
                className="w-[40px] h-[40px] rounded-[4px] object-cover"
                src={userImage || 'https://source.unsplash.com/1600x900'}
                alt=""
            />
            </NavLink>
            <NavLink to='/pin/create'>
            <button className="w-[40px] h-[40px] rounded-[4px] flex justify-center items-center bg-black text-white ml-3">
                <AiOutlinePlus />
            </button>
            </NavLink>
        </div>
    );
};

export default Search;
