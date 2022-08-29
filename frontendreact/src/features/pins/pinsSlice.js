import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";
import client from '../../app/client';

const getDataPins = createAsyncThunk('pins/getdata', async (data, { dispatch, rejectWithValue }) => {
    try {
        
    } catch (error) {
        rejectWithValue(error.message)
    }
})


const initialState = []

export const userSlice = createSlice({
    name: 'pins',
    initialState,
    reducers: {
        
    },
    extraReducers: {
        
    }
});

// Action creators are generated for each case reducer function
export const { } = userSlice.actions;

export default userSlice.reducer;
