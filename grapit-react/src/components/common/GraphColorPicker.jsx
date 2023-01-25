import { CirclePicker } from 'react-color';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setTwoDInput } from '../../store/TwoDInputSlice';

export default function GraphColorPicker({ type, color, setColorProps }) {
  const graphColor = [
    '#f44336',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#009688',
    '#8bc34a',
    '#ffeb3b',
    '#ff9800',
    '#9e9e9e',
  ];
  const dispatch = useDispatch();
  function setColor2D(color) {
    dispatch(setTwoDInput.setColor(color.hex));
  }

  function setColor3D(color) {
    console.log(color);
    setColorProps(color.hex);
  }

  const setColors = type === '2D' ? setColor2D : setColor3D;
  return (
    <div className="flex justify-content-center p-3">
      <CirclePicker colors={graphColor} color={color} onChange={setColors} />
    </div>
  );
}
