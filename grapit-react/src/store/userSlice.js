import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name: 'user',
  initialState: { nickName: null, email: null },
  reducers: {
    setUser(state, action) {
      state.nickName = action.payload.nickName;
      state.email = action.payload.email;
    },
    resetUser(state, action) {
      state.nickName = null;
      state.email = null;
    },
  },
});

export let { setUser, resetUser } = user.actions;

export default user;
