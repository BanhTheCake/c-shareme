import React from 'react';
import Select from 'react-select';
import { categories } from '../../../utils/data';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const options = categories.map((category) => {
    const newItem = {};
    newItem.value = category.name;
    newItem.label = category.name;
    return newItem;
});

const schema = yup.object({
    title: yup.string().required('Title Is Required'),
    destination: yup.string().required('Destination Is Required'),
    about: yup.string().required('About Is Required'),
    category: yup.string().required('Category Is Required'),
  }).required();

const FormPinCreated = ({ handleCreateDataToServer, userData, setFormData }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({ resolver: yupResolver(schema) });
    const onSubmit = (data) => {
        handleCreateDataToServer(data)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-3">
            <input
                className="outline-none px-3 py-1 w-full text-inherit text-[26px] placeholder:text-gray-400 border-b-2 border-gray-300"
                type="text"
                placeholder="Add Your Title"
                {...register('title')}
            />
            <p className='text-red-500 text-[15px] px-2 py-1'>{errors.title?.message}</p>
            <div className="flex items-center my-4">
                <img
                    className="w-[40px] h-[40px] object-cover rounded-full mr-2"
                    src={
                        userData?.image ||
                        'https://source.unsplash.com/1600x900'
                    }
                    alt="User"
                />
                <p>{userData?.username || 'Unknown'}</p>
            </div>
            <input
                className="outline-none px-3 py-1 w-full text-inherit text-[18px] placeholder:text-gray-400 border-b-2 border-gray-300"
                type="text"
                placeholder="Add A Destination Link"
                {...register('destination')}
            />
            <p className='text-red-500 text-[15px] px-2 py-1'>{errors.destination?.message}</p>
            <textarea
                className="flex w-full resize-y min-h-[120px] mt-5 p-3 outline-none border-2 border-gray-300 border-dashed"
                placeholder="Tell Everyone What Your Pin Is About"
                {...register('about')}
            ></textarea>
            <p className='text-red-500 text-[15px] px-2 py-1'>{errors.about?.message}</p>
            <p className="mb-2 mt-5">Choose Pin Category</p>
            <Controller
                control={control}
                name="category"
                render={({ field: { onChange, value, ref, name } }) => (
                    <Select
                        inputRef={ref}
                        options={options}
                        value={options.filter((c) => c.value === value)}
                        onChange={(val) => onChange(val.value)}
                        menuPlacement="top"
                    />
                )}
            />
            <p className='text-red-500 text-[15px] px-2 py-1'>{errors.category?.message}</p>
            <div className="w-full flex mt-3">
                <button
                    className="ml-auto px-4 py-1 bg-red-500 rounded-[4px] text-white hover:brightness-90 transition-all text-base"
                    type="submit"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

export default FormPinCreated;
