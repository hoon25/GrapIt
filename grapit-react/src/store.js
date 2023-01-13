import { configureStore } from '@reduxjs/toolkit';
import user from './store/userSlice';
import chat from './store/chatSlice';
import isWhiteBoard from './store/isWhiteBoardSlice';

export default configureStore({
  reducer: {
    user: user.reducer,
    chat: chat.reducer,
    isWhiteBoard: isWhiteBoard.reducer,
  },
});
