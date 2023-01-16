import { createSlice } from '@reduxjs/toolkit';

const isWhiteBoard = createSlice({
  name: 'isWhiteBoard',
  initialState: { isSelected: false },
  reducers: {
    setIsWhiteBoard(state, action) {
      state.isSelected = action.payload;
    },
  },
});

export const { setIsWhiteBoard } = isWhiteBoard.actions;
export const { toggleIsWhiteBoard } = isWhiteBoard.actions;

export default isWhiteBoard;
