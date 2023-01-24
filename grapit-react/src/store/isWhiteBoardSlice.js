import { createSlice } from '@reduxjs/toolkit';

const isWhiteBoard = createSlice({
  name: 'isWhiteBoard',
  initialState: { isSelected: false },
  reducers: {
    setIsWhiteBoard(state, action) {
      state.isSelected = action.payload;
    },
    toggleIsWhiteBoard(state) {
      state.isSelected = !state.isSelected;
    },
  },
});

// export const setIsWhiteBoard = isWhiteBoard.actions.setIsWhiteBoard;
export const changeIsWhiteBoard = isWhiteBoard.actions;

export default isWhiteBoard;
