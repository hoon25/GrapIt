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
        state.TwoDfigures.push({
          ...action.payload,
          thick: 3,
        });
      }
    },

    // setTwoDFigureToEdit: (state, action) => {
    //   state.TwoDfigures = state.TwoDfigures.map(figure => {
    //     if (figure.id === action.payload.id) {
    //       return {
    //         ...figure,
    //         isEdit: true,
    //       };
    //     }
    //     return figure;
    //   });
    // },

    removeFigure: (state, action) => {
      const index = state.TwoDfigures.findIndex(
        TwoDfigure => TwoDfigure.figureId === action.payload,
      );

      state.TwoDfigures.splice(index, 1);
    },
    emphasizeFigure: (state, action) => {
      const index = state.TwoDfigures.findIndex(
        TwoDfigure => TwoDfigure.figureId === action.payload,
      );
      state.TwoDfigures[index].thick += 10;
    },
    deemphasizeFigure: (state, action) => {
      const index = state.TwoDfigures.findIndex(
        TwoDfigure => TwoDfigure.figureId === action.payload,
      );
      state.TwoDfigures[index].thick -= 10;
    },
    resetThick: (state, action) => {
      const index = state.TwoDfigures.findIndex(
        TwoDfigure => TwoDfigure.figureId === action.payload,
      );
      state.TwoDfigures[index].thick = 3;
    },

    switchFigure: (state, action) => {
      state.TwoDfigures = action.payload;
    },
  },
});

export const setTwoDFigure = TwoDfigure.actions;

export default TwoDfigure;
