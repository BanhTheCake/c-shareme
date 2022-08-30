import React, { useEffect, useRef } from 'react';
import Logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { AiFillHome, AiFillCloseCircle } from 'react-icons/ai';
import { googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { handleLogout } from '../features/user/userSlice';
import { categories } from '../utils/data';

const Sidebar = ({ setToggle, toggle }) => {

    const dispatch = useDispatch();
    const menuRef = useRef(null);
    const countRef = useRef(0);

    const handleClickOutSide = (e) => {
        if (countRef.current === 0) {
            countRef.current++;
            return;
        }
        if (!menuRef.current.contains(e.target)) {
            setToggle(false);
        }
    };

    const handleClose = () => {
        if (toggle) setToggle(false)
    }

    useEffect(() => {
        if (toggle) {
            window.addEventListener('click', handleClickOutSide);
        }
        return () => {
            window.removeEventListener('click', handleClickOutSide);
        };
    });

    const handleLogOut = () => {
        googleLogout();
        dispatch(handleLogout());
    };

    return (
        <div
            ref={menuRef}
            className="fixed top-0 left-0 bottom-0 md:w-full max-w-[100%] w-[300px] md:max-w-[230px] bg-slate-200 p-6 pr-0 overflow-y-auto flex flex-col animate-right z-20"
        >
            <AiFillCloseCircle
                size={38}
                className="absolute top-5 right-2 p-1 md:hidden cursor-pointer"
                onClick={handleClose}
            />
            <NavLink
                to="/"
                className="flex mb-4 pr-6"
                onClick={handleClose}
            >
                <img src={Logo} alt="Logo" className="w-[150px] h-full" />
            </NavLink>

            <NavLink
                to="/"
                className={({ isActive }) => {
                    return `flex items-center py-1 text-[18px] border-r-2 ${
                        isActive
                            ? 'border-black'
                            : 'border-transparent hover:border-black transition-all'
                    }`;
                }}
                onClick={handleClose}
            >
                <AiFillHome size={22} className="mr-3" />
                Home
            </NavLink>
            <p className="mt-3 mb-3">Discover categories</p>
            <div className="hide-scrollbar flex-1 overflow-auto mb-3">
                {categories.length > 0 &&
                    categories.map((category) => {
                        return (
                            <NavLink
                                key={category.name}
                                to={`/pin/category/${category.name}`}
                                className={({ isActive }) => {
                                    return `flex items-center py-1 text-[16px] border-r-2 mb-3 capitalize ${
                                        isActive
                                            ? 'border-black'
                                            : 'border-transparent'
                                    }`;
                                }}
                                onClick={handleClose}
                            >
                                <img
                                    src={ category.image || "https://source.unsplash.com/1600x900" }
                                    alt="random"
                                    className="w-[30px] h-[30px] rounded-full mr-3"
                                />
                                {category.name}
                            </NavLink>
                        );
                    })}
            </div>
            <div
                className="flex py-2 px-4 mr-6 rounded-[4px] bg-white shadow-md justify-center items-center capitalize text-red-600 font-[600] cursor-pointer hover:brightness-90 transition-all select-none"
                onClick={handleLogOut}
            >
                logout
            </div>
        </div>
    );
};

export default Sidebar;
