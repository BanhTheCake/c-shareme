import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import client from '../../../app/client';
import {
    userCreatedQuery,
    userData,
    userSavedQuery,
} from '../../../utils/data';
import ScaleLoader from 'react-spinners/ScaleLoader';
import MasonryPins from '../../pins/components/MasonryPins';

const UserProfile = () => {
    const { id } = useParams();

    const { username, image, userId } = useSelector((state) => state.user.data);
    const [isOwner] = useState(() => {
        return id === userId;
    });

    const [isLoading, setIsLoading] = useState(false);

    const [switchTag, setSwitchTag] = useState('Created');
    const [currentScale, setCurrentScale] = useState(0);
    const [widthInit, setWidthInit] = useState(0);
    const [query, setQuery] = useState('');

    const [currentUser, setCurrentUser] = useState({});

    const createdBtnRef = useRef(null);
    const saveBtnRef = useRef(null);
    const btnGroupRef = useRef(null);

    useEffect(() => {
        setIsLoading(true);
        if (isOwner) {
            console.log(1);
            setCurrentUser({ username, image });
            setTimeout(() => {
                setIsLoading(false);
            }, 300);
        } else {
            const userQuery = userData(id);
            client
                .fetch(userQuery)
                .then((data) => {
                    setCurrentUser({
                        username: data[0].userName,
                        image: data[0].image,
                    });
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 300);
                })
                .catch((err) => {
                    console.log(err);
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 300);
                });
        }
    }, [isOwner, username, image, id]);

    useEffect(() => {
        let currentQuery;
        if (switchTag === 'Created') {
            currentQuery = userCreatedQuery(id);
        } else {
            currentQuery = userSavedQuery(id);
        }
        setQuery(currentQuery);
    }, [id, switchTag]);

    useEffect(() => {
        if (switchTag === 'Created') {
            const width = createdBtnRef.current?.getBoundingClientRect()?.width;
            setWidthInit(width);
            setCurrentScale(0);
        } else {
            const widthBtnGroup =
                btnGroupRef.current?.getBoundingClientRect()?.width;
            const widthBtn = saveBtnRef.current?.getBoundingClientRect()?.width;
            const currentTransform = widthBtnGroup - widthBtn;
            setCurrentScale(currentTransform);

            setWidthInit(widthBtn);
        }
    }, [switchTag]);

    return (
       <>
         <div className='flex'>
          { isLoading ? <div className='mx-auto mt-8'><ScaleLoader loading={isLoading} /></div>: <div className="flex flex-col w-full animate-fadeIn">
            <div className="w-full h-[250px] shadow-lg">
                <img
                    className="w-full h-full object-cover"
                    src="https://source.unsplash.com/1600x900"
                    alt="Background"
                />
            </div>
            <div className="w-[70px] h-[70px] mx-auto -mt-8 rounded-full border-8 border-white">
                <img
                    className="w-full h-full rounded-full object-cover"
                    src={
                        currentUser.image ||
                        'https://source.unsplash.com/1600x900'
                    }
                    alt="User"
                />
            </div>
            <p className="mx-auto mt-2 font-semibold text-[20px] capitalize -tracking-tight">
                {currentUser.username || 'Unknown'}
            </p>
            <div ref={btnGroupRef} className="mx-auto mt-4 relative">
                <div
                    style={{
                        width: widthInit || 0,
                        transform: `translateX(${currentScale || 0}px)`,
                    }}
                    className={`absolute top-0 h-full bg-red-500 rounded-full transition-all duration-200`}
                />
                <button
                    ref={createdBtnRef}
                    onClick={() => setSwitchTag('Created')}
                    style={switchTag === 'Created' ? { color: 'white' } : {}}
                    className="px-4 py-1 font-semibold text-[18px] capitalize relative z-10 transition-all"
                >
                    Created
                </button>
                {isOwner && (
                    <button
                        ref={saveBtnRef}
                        onClick={() => setSwitchTag('Saved')}
                        style={switchTag === 'Saved' ? { color: 'white' } : {}}
                        className="px-4 py-1 font-semibold text-[18px] capitalize relative z-10 transition-all"
                    >
                        Saved
                    </button>
                )}
            </div>
            <div className="mt-8">
                <MasonryPins query={query} />
            </div>
        </div> }
        </div>
       </>
    );
};

export default UserProfile;
