import { createSlice } from '@reduxjs/toolkit';

const Draw = createSlice({
  name: 'Draw',
  initialState: { DrawsReset: null },
  reducers: {
    resetThick: (state, action) => {
      state.DrawsReset = action.payload;
    },
  },
});

export const setDraw = Draw.actions;

export default Draw;
