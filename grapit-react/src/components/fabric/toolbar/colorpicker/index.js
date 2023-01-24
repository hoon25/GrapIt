import React, { Component, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { CirclePicker } from 'react-color';

import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeIsWhiteBoard } from '../../../../store/isWhiteBoardSlice';

function ColorPicker(props) {
  const brushColors = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
  ];

  const [showColor, setShowColor] = useState(false);
  const [paintPosition, setPaintPosition] = useState({ x: 300, y: 300 });
  const dispatch = useDispatch();
  const colorPickerStyle = {
    display: showColor ? 'flex' : 'none',
    top: paintPosition.y,
    left: paintPosition.x,
  };

  function mouseEvent(e) {
    if (!showColor) {
      setPaintPosition({ x: e.clientX, y: e.clientY });
    }
  }

  useEffect(() => {
    window.addEventListener('mousemove', mouseEvent);

    window.addEventListener('keydown', e => {
      window.removeEventListener('mousemove', mouseEvent);
      if (e.key === ' ') {
        setShowColor(true);
      }
    });

    window.addEventListener('keyup', e => {
      window.addEventListener('mousemove', mouseEvent);

      if (e.key === ' ' || e.code === 'Space') {
        setShowColor(false);
      }
    });
    return () => {
      setShowColor(false);
    };
  }, []);

  function handleOnBrushColorChange(color) {
    props.setBrushColor(color.hex);
  }

  return (
    <div className="whiteboard-colorpicker" style={colorPickerStyle}>
      <CirclePicker
        colors={props.colors}
        color={props.color}
        onChange={handleOnBrushColorChange}
        width="170px"
      />
      <div
        style={{
          justifyContent: 'center',
          alignSelf: 'start',
          paddingTop: '10px',
        }}
      >
        <Form.Range
          value={props.brushThickness}
          min={3}
          max={15}
          onChange={e => {
            props.setBrushThickness(Number(e.target.value));
          }}
        />
      </div>
    </div>
  );
}

export default ColorPicker;
