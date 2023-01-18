import { createSlice } from '@reduxjs/toolkit';

let load = createSlice({
  name: 'load',
  initialState: { first: false, second: false, third: false },
  reducers: {
    setFirst(state, action) {
      state.first = !state.first;
    },
    setSecond(state, action) {
      state.second = !state.second;
    },
    setThird(state, action) {
      state.third = !state.third;
    },
  },
});

export let setLoad = load.actions;

export default load;
