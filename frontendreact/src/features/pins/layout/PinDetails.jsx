import React from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import client from '../../../app/client';
import { currentPinQuery, getMorePinQuery } from '../../../utils/data';
import { BiArrowFromTop } from 'react-icons/bi';
import { useState } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import MasonryPins from '../components/MasonryPins';

const PinDetails = () => {
    const { id } = useParams();
    const [pinData, setPinData] = useState({});
    const [morePinQuery, setMorePinQuery] = useState();
    const [isLoading, setIsLoading] = useState(false)

    
    useEffect(() => {
        const query = currentPinQuery(id);
        setIsLoading(true)
        client
            .fetch(query)
            .then((data) => {
                setPinData(data[0])
                setTimeout(() => {
                    setIsLoading(false)
                }, 300);
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            });
    }, [id]);

    useEffect(() => {
        if (Object.keys(pinData).length) {
            const moreQuery = getMorePinQuery(pinData?._id, pinData?.category)
            setMorePinQuery(moreQuery)
        }
    }, [pinData])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [morePinQuery])

    return (
        <div className='flex'>
        { isLoading ? <div className='mx-auto mt-8'><ScaleLoader loading={isLoading} /></div> : 
        <div className='w-full'>
        <div className="flex flex-col lg:flex-row animate-fadeIn">
            <div className="p-4 flex-shrink-0">
                <img
                    className="rounded-[12px] object-cover lg:w-[400px] min-h-[400px]"
                    src={pinData?.image?.asset?.url}
                    alt="Pin"
                />
            </div>
            <div>
            <div className="p-4 pt-0 lg:pt-4 sticky top-0">
                <a
                    className="w-[40px] h-[40px] rounded-full bg-slate-200 flex hover:brightness-90 transition-all"
                    href={`${pinData?.image?.asset?.url}?dl=`}
                    download
                >
                    <BiArrowFromTop size={26} className="m-auto" />
                </a>
                <h4 className='mt-6 font-semibold text-[30px] leading-none -tracking-tight capitalize'>{pinData?.title}</h4>
                <p className='capitalize mt-2 mb-2 text-[16px] leading-6'>{pinData?.about}</p>
                <div className='flex items-center mb-4'>
                    <p>Category: </p>
                    <Link to={`/pin/category/${pinData.category}`} className="px-2 ml-2 rounded-[2px] text-white font-medium bg-slate-400">{pinData.category}</Link>
                </div>
                <Link to={`/user/${pinData?.userId}`} className='inline-flex px-2 items-center'>
                    <img className='w-[36px] h-[36px] object-cover mr-3 rounded-full' src={pinData?.postedBy?.image} alt="" />
                    <p className='capitalize'>banhthecake</p>
                </Link>
                <p className='mt-3'>Destination: <a href={pinData?.destination} target="_blank" rel="noreferrer">{pinData?.destination}</a></p>
            </div>
            </div>
        </div>
        <div className='flex flex-col px-4 pb-8 w-full'>
            <div className='w-full h-[2px] bg-gray-400 mb-3 rounded-full' />
            <p className='mx-auto font-semibold text-[26px]'>More Like This:</p>
            <div className='mt-2'>
                <MasonryPins query={morePinQuery} />
            </div>
        </div>
        </div> }
        </div>
    );
};

export default PinDetails;
