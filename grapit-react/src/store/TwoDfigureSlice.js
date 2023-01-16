import { createSlice } from '@reduxjs/toolkit';

const TwoDfigure = createSlice({
  name: 'TwoDfigures',
  initialState: { TwoDfigures: [] },
  reducers: {
    addFigure: (state, action) => {
      if (action.payload.type === 'Line') {
        state.TwoDfigures.push({
          ...action.payload,
          thirdProps: null,
          thick: 3,
        });
      } else {
        state.figures.push({
          ...action.payload,
          polish: false,
          transparent: false,
        });
      }
    },

    removeFigure: (state, action) => {
      const index = state.figures.findIndex(
        figure => figure.figureId === action.payload,
      );

      state.figures.splice(index, 1);
    },
    transparentFigure: (state, action) => {
      const index = state.figures.findIndex(
        figure => figure.figureId === action.payload,
      );

      state.figures[index].transparent = !state.figures[index].transparent;
    },
    emphasizeFigure: (state, action) => {
      const index = state.figures.findIndex(
        figure => figure.figureId === action.payload,
      );
      if (state.figures[index].type === 'twoPointedLine') {
        state.figures[index].thick = true;
      } else {
        state.figures[index].polish = true;
      }
    },
    deemphasizeFigure: (state, action) => {
      const index = state.figures.findIndex(
        figure => figure.figureId === action.payload,
      );
      if (state.figures[index].type === 'twoPointedLine') {
        state.figures[index].thick = false;
      } else {
        state.figures[index].polish = false;
      }
    },
  },
});

export const setTwoDFigure = TwoDfigure.actions;

export default TwoDfigure;
