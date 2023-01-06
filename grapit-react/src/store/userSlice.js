import {createSlice} from '@reduxjs/toolkit'

let user = createSlice({
    name: 'user',
    initialState: {nickName: null, email: null},
    reducers: {
        setUser(state, action) {
            state.nickName = action.payload.nickName;
            state.email = action.payload.email;
        }
    }
});

export let {setUser} = user.actions

export default user;

