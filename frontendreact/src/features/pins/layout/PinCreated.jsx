import React from 'react';
import { useState } from 'react';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import client from '../../../app/client';
import ScaleLoader from 'react-spinners/ScaleLoader';
import FormPinCreated from '../components/FormPinCreated';
import { useNavigate } from 'react-router-dom';

const PinCreated = () => {
    const userData = useSelector((state) => state.user.data);
    const [imgPath, setImgPath] = useState('');
    const [wrongImageType, setWrongImageType] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const user = useSelector((state) => state.user.data);

    const handleUploadFile = (e) => {
        const selectedFile = e.target.files[0];
        if (
            selectedFile.type === 'image/png' ||
            selectedFile.type === 'image/svg' ||
            selectedFile.type === 'image/jpeg' ||
            selectedFile.type === 'image/gif' ||
            selectedFile.type === 'image/tiff'
        ) {
            setWrongImageType('');
            setLoading(true);
            client.assets
                .upload('image', selectedFile, {
                    contentType: selectedFile.type,
                    filename: selectedFile.name,
                })
                .then((document) => {
                    setImgPath(document);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log('Upload failed:', error.message);
                    setWrongImageType('Something Wrong');
                });
        } else {
            setLoading(false);
            setWrongImageType('Wrong File Type');
            setImgPath('');
        }
    };

    const handleCreateDataToServer = (data) => {
        if (!imgPath?._id) {
            return setWrongImageType('Image Is Required');
        }
        const { title, destination, about, category } = data;
        const doc = {
            _type: 'pin',
            title,
            about,
            destination,
            image: {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: imgPath?._id,
                },
            },
            userId: user.userId,
            postedBy: {
                _type: 'postedBy',
                _ref: user.userId,
            },
            category,
        };
        client
            .create(doc)
            .then(() => {
                navigate('/');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="bg-slate-100 w-full min-h-screen flex p-4">
            <div className="flex max-w-[800px] w-[100%] m-auto bg-white p-4 flex-col lg:flex-row">
                <div className="w-full lg:w-[350px] flex flex-col flex-shrink-0 h-full">
                    <label
                        className="bg-gray-200 p-3 h-[250px] lg:min-h-[450px] cursor-pointer"
                        htmlFor="file"
                    >
                        {loading && (
                            <div className="h-full flex">
                                <ScaleLoader
                                    className="m-auto"
                                    loading={loading}
                                />
                            </div>
                        )}
                        {!loading &&
                            (imgPath.length === 0 ? (
                                <div className="border-2 border-dashed h-full border-gray-300 flex flex-col justify-evenly items-center p-4">
                                    <div className="flex flex-col items-center">
                                        <AiOutlineCloudDownload size={28} />
                                        <p className="font-semibold text-[18px]">
                                            Click To Upload
                                        </p>
                                    </div>
                                    <p className="text-gray-400 mt-4">
                                        Recommendation: Use high-quality JPG,
                                        JPEG, SVG, PNG, GIF or TIFF less than
                                        20MB
                                    </p>
                                </div>
                            ) : (
                                <img
                                    src={imgPath?.url}
                                    className="w-full h-full object-cover"
                                    alt=""
                                />
                            ))}
                    </label>
                    {wrongImageType && (
                        <p className="text-red-500 text-[14px] mx-auto mt-2">
                            {wrongImageType}
                        </p>
                    )}
                    <input
                        className="w-0 h-0"
                        id="file"
                        type="file"
                        onChange={handleUploadFile}
                    />
                </div>
                <FormPinCreated
                    handleCreateDataToServer={handleCreateDataToServer}
                    userData={userData}
                />
            </div>
        </div>
    );
};

export default PinCreated;
