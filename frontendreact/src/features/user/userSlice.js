import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";
import client from '../../app/client';

export const saveDataUserWhenLogin = createAsyncThunk('user/saveData', 
    async (data, { dispatch, rejectWithValue }) => {
       try {
            const dataDecode = jwt_decode(data)
            const user = {
                _id: dataDecode.sub,
                _type: 'user',
                userName: dataDecode.name,
                image: dataDecode.picture,
            }
            await client.createIfNotExists(user)
            return dataDecode
       } catch (error) {
            rejectWithValue(error.message)
       }
})


const initialState = {
    data: {
        username: '',
        image: '',
        userId: '',
    },
    accessToken: '',
    searchTerm: {
        searchBox: '',
        category: '',
    },
    error: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        handleLogout(state) {
            const newState = {
                data: {
                    username: '',
                    image: '',
                    userId: '',
                },
                accessToken: '',
                searchTerm: {
                    searchBox: '',
                    category: '',
                },
                error: null
            }
            return newState
        },
        handleUpdateSearchBox(state, action) {
            const newState = {...state.searchTerm}
            newState.searchBox = action.payload
            return {
                ...state,
                searchTerm: newState
            }
        },
        handleUpdateCategory(state, action) {
            const newState = {...state.searchTerm}
            newState.category = action.payload
            return {
                ...state,
                searchTerm: newState
            }
        },
    },
    extraReducers: {
        [saveDataUserWhenLogin.fulfilled]: (state, action) => {
            state.data.username = action.payload.name
            state.data.image = action.payload.picture
            state.accessToken = action.payload.jti
            state.data.userId = action.payload.sub
            state.error = null
            return state
        },
        [saveDataUserWhenLogin.rejected]: (state, action) => {
            state.error = action.payload
        }
    }
});

// Action creators are generated for each case reducer function
export const { handleUpdateSearchBox, handleUpdateCategory, handleLogout } = userSlice.actions;

export default userSlice.reducer;
