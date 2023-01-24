import { createSlice } from '@reduxjs/toolkit';

const camera = createSlice({
  name: 'camera',
  initialState: {
    camera: {},
  },
  reducers: {
    updateCamera(state, action) {
      state.camera = action.payload;
      // console.log(state.camera)
    },
    // addGraph(state, action) {
    //   state.graphList.push(action.payload);
    // },
    // removeGraph(state, action2) {
    //   state.graphList.splice(action2.payload, 1);
    // },
  },
});

export const setCamera = camera.actions;

export default camera;
