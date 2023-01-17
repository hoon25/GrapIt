import { createSlice } from '@reduxjs/toolkit';

const TwoDInput = createSlice({
  name: 'TwoDInput',
  initialState: {
    type: 'Line',
    firstProps: '',
    secondProps: '',
    thirdProps: '',
    color: 16777215,
  },
  reducers: {
    setFirstProps: (state, action) => {
      state.firstProps = action.payload;
    },

    setSecondProps: (state, action) => {
      state.secondProps = action.payload;
    },

    setThirdProps: (state, action) => {
      state.thirdProps = action.payload;
    },

    setProps: (state, action) => {
      state.firstProps = action.payload.firstProps;
      state.secondProps = action.payload.secondProps;
      state.thirdProps = action.payload.thirdProps;
    },

    setType: (state, action) => {
      state.type = action.payload;
    },

    resetProps: (state, action) => {
      state.firstProps = action.payload.firstProps;
      state.secondProps = action.payload.secondProps;
      state.thirdProps = action.payload;
    },
  },
});

export const setTwoDInput = TwoDInput.actions;

export default TwoDInput;
