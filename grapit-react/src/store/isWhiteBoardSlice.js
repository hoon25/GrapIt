import { createSlice } from '@reduxjs/toolkit';

let isWhiteBoard = createSlice({
  name: 'isWhiteBoard',
  initialState: { isSelected: false },
  reducers: {
    setIsWhiteBoard(state, action) {
      state.isSelected = action.payload;
    },
  },
});

export let { setIsWhiteBoard } = isWhiteBoard.actions;

export default isWhiteBoard;
