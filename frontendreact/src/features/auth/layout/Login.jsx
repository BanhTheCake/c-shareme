import React, { useEffect, useRef } from 'react';
import Video from '../../../assets/share.mp4';
import Logo from '../../../assets/logowhite.png';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { saveDataUserWhenLogin } from '../../user/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    
    const errorMessage = useSelector((state) => state.user.error)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLoginSuccess = (response) => {
        dispatch(saveDataUserWhenLogin(response.credential))
        .unwrap()
        .then(() => {
            return navigate('/')
        })
    }

    return (
        <div>
            <div className="relative w-screen h-screen">
                <video
                    src={Video}
                    type="video/mp4"
                    loop
                    autoPlay={true}
                    controls={false}
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                ></video>
                { errorMessage && <div className='absolute top-[10%] left-[50%] translate-x-[-50%] px-6 py-2 bg-slate-100 rounded-[6px] z-10 flex justify-center items-center w-fit whitespace-nowrap'>Login Failed</div>}
                <div className="absolute inset-0 bg-semiColor flex justify-center items-center flex-col">
                    <div>
                        <img
                            className="max-w-[200px] w-[90%] select-none mb-6 m-auto"
                            src={Logo}
                            alt=""
                        />
                    </div>
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                    ;
                </div>
            </div>
        </div>
    );
};

export default Login;
