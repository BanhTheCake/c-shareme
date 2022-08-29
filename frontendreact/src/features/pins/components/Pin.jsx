import React from 'react';
import { Link } from 'react-router-dom';
import { BiArrowFromTop } from 'react-icons/bi';
import { useState } from 'react';
import client from '../../../app/client';
import { useSelector } from 'react-redux';
import { v4 as uuidv4, v4 } from 'uuid';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { debounce, throttle } from 'lodash'
import { useRef } from 'react';

const listUserSave = (save) => {
    const newSave = save?.filter((item) => {
        return item.userId && item.userId
    }).map((item) => {
        return item.userId
    })
    return newSave || []
}

const Pin = ({ pin }) => {
    let newSave = useMemo(() => {
        return listUserSave(pin.save)
    }, [pin.save])

    const [hover, setHover] = useState(false);
    const [save, setSave] = useState(false)
    const [saving, setSaving] = useState(false)
    const [err, setErr] = useState(null)
    
    const userData = useSelector((state) => state.user.data)

    const currentListRef = useRef(newSave)

    useEffect(() => {
        if (newSave?.includes(userData.userId)) {
            setSave(true)
        }
    }, [newSave, userData.userId])

    const handleOnSave = useCallback((id) => {

        if (currentListRef.current?.includes(userData.userId)) {
            const indexSave = currentListRef.current?.indexOf(userData.userId)
            const reviewsToRemove = [`save[${indexSave}]`]
            setSave(false)
            setSaving(true)
            client.patch(id).unset(reviewsToRemove).commit()
            .then(() => {
                currentListRef.current.splice(indexSave, 1)
                setSaving(false)
            })
            .catch(err => {
                setSaving(false)
                setSave(true)
                setErr(err.message)
            })
            return;
        }

        setSave(true)
        setSaving(true)
        client
            .patch(id)
            .setIfMissing({ save: [] })
            .insert('after', 'save[-1]', [
                { _key: uuidv4() ,postedBy: { _type: 'postedBy', _ref: userData.userId }, userId: userData.userId },
            ])
            .commit({})
            .then(() => {
                console.log('done');
                currentListRef.current.push(userData.userId)
                console.log(currentListRef.current);
                setSaving(false)
            })
            .catch(err => {
                console.log(err.message)
                setSaving(false)
                setSave(false);
                setErr(err.message);
            });
    }, [newSave, userData.userId])

    return (
        <div className="w-full px-3">
            <div
                className="relative animate-fadeIn"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <img
                    className="min-h-[200px] h-auto object-cover w-full rounded-[10px]"
                    src={pin?.image?.asset?.url}
                    alt=""
                />
                {hover && (
                    <div className="absolute inset-0 animate-fadeIn">
                        <a
                            className="absolute top-2 left-2 flex w-[30px] h-[30px] rounded-full bg-stone-200 justify-center items-center hover:brightness-90 transition-all"
                            href={`${pin?.image?.asset?.url}?dl=`}
                            download
                        >
                            <BiArrowFromTop size={20} />
                        </a>
                        <button
                            onClick={() => handleOnSave(pin._id)}
                            className={`absolute top-2 right-2 table px-3 bg-red-500 text-white rounded-full  transition-all ${saving ? 'opacity-50' : 'hover:brightness-90'}`}
                            disabled={saving ? true : false}
                        >
                            {save ? 'Saved' : 'Save'}
                        </button>
                        <a
                            href={pin?.destination}
                            className="absolute bottom-2 left-2 table max-w-full px-2 rounded-full bg-stone-200 hover:brightness-90 transition-all"
                        >
                            {pin?.destination?.length > 15
                                ? `${pin?.destination?.slice(0, 15)}...`
                                : pin?.destination}
                        </a>
                        <Link
                            to={`/pinDetails/${pin._id}`}
                            className="w-full h-full border-t-red-400 flex"
                        ></Link>
                    </div>
                )}
            </div>
            <Link
                to={`/user/${pin.userId}`}
                className="flex mt-2 mb-4 items-center px-2"
            >
                <img
                    src={pin?.postedBy?.image}
                    alt="username"
                    className="mr-2 w-[30px] h-[30px] object-cover rounded-full"
                />
                <p>
                    {pin?.postedBy?.userName.length > 11
                        ? `${pin?.postedBy?.userName.slice(0, 11)}...`
                        : pin?.postedBy?.userName}
                </p>
            </Link>
        </div>
    );
};

export default Pin;
