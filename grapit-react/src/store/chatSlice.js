import { createSlice } from '@reduxjs/toolkit';

let chat = createSlice({
  name: 'chat',
  initialState: { roomId: null, roomName: null },
  reducers: {
    setChat(state, action) {
      state.roomId = action.payload.roomId;
      state.roomName = action.payload.roomName;
    },
  },
});

export let { setChat } = chat.actions;

export default chat;
