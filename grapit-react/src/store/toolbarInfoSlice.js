import { createSlice } from '@reduxjs/toolkit';

let toolbar = createSlice({
  name: 'toolbar',
  initialState: {
    visible: true,
    enabled: true,
    mode: '',
    fontSize: '',
    brushColor: '',
    brushColors: '',
    brushThickness: '',
    brushThicknessRange: '',
    onModeClick: '',
    onBrushColorChange: '',
    onBrushThicknessChange: '',
  },
  reducers: {
    setIsWhiteBoard(state, action) {
      state.visible = action.payload.visible;
      state.enabled = action.payload.enabled;
      state.mode = action.payload.mode;
      state.fontSize = action.payload.fontSize;
      state.brushColor = action.payload.brushColor;
      state.brushColors = action.payload.brushColors;
      state.brushThickness = action.payload.brushThickness;
      state.brushThicknessRange = action.payload.brushThicknessRange;
      state.onModeClick = action.payload.onModeClick;
      state.onBrushColorChange = action.payload.onBrushColorChange;
      state.onBrushThicknessChange = action.payload.onBrushThicknessChange;
    },
  },
});

export let { setToolbar } = toolbar.actions;

export default toolbar;
