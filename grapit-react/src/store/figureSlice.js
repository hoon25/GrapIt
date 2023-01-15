import { createSlice } from "@reduxjs/toolkit";

const figure = createSlice({
  name: "figures",
  initialState: { figures: [] },
  reducers: {
    addFigure: (state, action) => {
      state.figures.push({ ...action.payload, polish: false, transparent: false })
    },
    removeFigure: (state, action) => {
    },
  },
});

export const setFigure = figure.actions;

export default figure;
