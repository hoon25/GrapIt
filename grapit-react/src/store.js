import { configureStore } from '@reduxjs/toolkit';
import user from './store/userSlice';
import chat from './store/chatSlice';
import isWhiteBoard from './store/isWhiteBoardSlice';
import graph from './store/graphSlice';
import figure from './store/figureSlice';
import camera from './store/cameraSlice';
import TwoDfigure from './store/TwoDfigureSlice';
import TwoDInput from './store/TwoDInputSlice';
import Draw from './store/DrawSlice';

export default configureStore({
  reducer: {
    user: user.reducer,
    chat: chat.reducer,
    isWhiteBoard: isWhiteBoard.reducer,
    graph: graph.reducer,
    figure: figure.reducer,
    camera: camera.reducer,
    TwoDfigure: TwoDfigure.reducer,
    TwoDInput: TwoDInput.reducer,
    Draw: Draw.reducer,
  },
});

// export const figureStore = configureStore({
//   reducer: {
//   },
//     figure: figure.reducer,
// });
