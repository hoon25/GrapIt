import { createSlice } from '@reduxjs/toolkit';

let chat = createSlice({
  name: 'chat',
  initialState: { roomId: null, roomName: null },
  reducers: {
    setChat(state, action) {
      state.roomId = action.payload.roomId;
      state.roomName = action.payload.roomName;
    },
    setRoomId(state, action) {
      state.roomId = action.payload.roomId;
    },
  },
});

export let { setChat, setRoomId } = chat.actions;

export default chat;
