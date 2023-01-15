import { configureStore } from '@reduxjs/toolkit';
import user from './store/userSlice';
import chat from './store/chatSlice';
import isWhiteBoard from './store/isWhiteBoardSlice';
import graph from './store/graphSlice';
import figure from './store/figureSlice';

export default configureStore({
  reducer: {
    user: user.reducer,
    chat: chat.reducer,
    isWhiteBoard: isWhiteBoard.reducer,
    graph: graph.reducer,
    figure: figure.reducer,
  },
});

// export const figureStore = configureStore({
//   reducer: {
//   },
//     figure: figure.reducer,
// });
