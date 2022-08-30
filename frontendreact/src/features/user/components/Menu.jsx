import React, { useState } from 'react';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import logo from '../../../assets/logo.png';

const Menu = () => {
    const [toggle, setToggle] = useState(false);

    const userData = useSelector((state) => state.user.data);

    const handleClose = () => {
        if (toggle) setToggle(false);
    };

    return (
        <>
            <div className="md:flex hidden">
                <Sidebar />
            </div>
            <div className="flex md:hidden justify-between items-center p-2">
                <div className="cursor-pointer" onClick={() => setToggle(true)}>
                    <AiOutlineMenuUnfold size={38} />
                </div>
                <Link to="/" className="w-[150px]" onClick={handleClose}>
                    <img className="w-full" src={logo} alt="" />
                </Link>
                <Link
                    to={`/user/${userData.userId}`}
                    className="w-[46px] h-[46px]"
                    onClick={handleClose}
                >
                    <img
                        className="w-full h-full object-cover rounded-[6px]"
                        src={
                            userData?.image ||
                            'https://source.unsplash.com/1600x900'
                        }
                        alt=""
                    />
                </Link>
            </div>
            <div className="flex md:hidden">
                {toggle && <Sidebar toggle={toggle} setToggle={setToggle} />}
            </div>
        </>
    );
};

export default Menu;
