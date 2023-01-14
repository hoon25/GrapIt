import { createSlice } from '@reduxjs/toolkit';

const graph = createSlice({
  name: 'graph',
  initialState: {
    graphList: [],
    value: 0
  },
  reducers: {
    addGraph(state, action) {
      state.graphList.push(action.payload);
    },
    removeGraph(state, action2) {
      state.graphList.splice(action2.payload, 1);
    },
  },
});

export const setGraph = graph.actions;

export default graph;
