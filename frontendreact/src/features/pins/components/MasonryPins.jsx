import React, { useState } from 'react';
import { useEffect } from 'react';
import Masonry from 'react-masonry-css';
import client from '../../../app/client';
import Pin from './Pin';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { memo } from 'react';

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
};

const MasonryPins = ({ query, numberSlice = 0 }) => {

    const [pins, setPins] = useState([]);
    const [err, setErr] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let clearTime;
        const getData = async () => {
            try {
                setIsLoading(true);
                const data = await client.fetch(query);
                setPins(data);
                clearTime = setTimeout(() => {
                    setIsLoading(false);
                }, 300)
            } catch (error) {
                setIsLoading(false);
                setErr(error);
            }
        };
        if (query) getData();
        return () => {
            if (clearTime) clearTimeout(clearTime)
        }
    }, [query]);

    return (
        <>
            {!isLoading && <div>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid flex"
                    columnClassName="my-masonry-grid_column"
                >
                    {pins &&
                        pins.length > 0 &&
                        pins.slice(0, pins.length - numberSlice).map((pin) => {
                            return (
                                <Pin
                                    pin={pin}
                                    key={pin._id}
                                />
                            );
                        })}
                </Masonry>
            </div>}
            {pins && pins.length === 0 && !isLoading ? (
                <div className="mx-auto w-fit mt-8">No Pins Yet ... </div>
            ) : <div className='mx-auto w-fit mt-8'><ScaleLoader loading={isLoading} /></div>}
        </>
    );
};

export default memo(MasonryPins);
