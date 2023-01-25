import { CirclePicker } from 'react-color';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setTwoDInput } from '../../store/TwoDInputSlice';

export default function GraphColorPicker({ type, color }) {
  const graphColor = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
  ];
  const dispatch = useDispatch();
  function setColor2D(color) {
    dispatch(setTwoDInput.setColor(color.hex));
  }

  const setColor = type === '2D' ? setColor2D : '';
  return (
    <div className="flex justify-content-center p-3">
      <CirclePicker colors={graphColor} color={color} onChange={setColor} />
    </div>
  );
}
