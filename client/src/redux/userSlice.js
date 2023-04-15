import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        subscribe: (state, action) => {
            if(state.currentUser.subcribedUsers?.includes(action.payload)){
                state.currentUser.subcribedUsers.splice(state.currentUser.subcribedUsers.findIndex((channelId)=>channelId === action.payload), 1);
            }else{
                state.currentUser.subcribedUsers.push(action.payload);
            }
        }
    }
})

export const {loginStart, loginSuccess, loginFailure, logout, subscribe} = userSlice.actions;

export default userSlice.reducer;