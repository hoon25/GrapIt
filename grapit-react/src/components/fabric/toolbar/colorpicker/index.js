import React, { Component } from 'react';
import classNames from 'class-names';

import { TwitterPicker, CirclePicker } from 'react-color';

import './style.scss';

function ColorPicker(props) {
  function handleOnBrushColorChange(color) {
    props.setBrushColor(color.hex);
  }

  return (
    <div
      className={classNames({
        'fabric-whiteboard-colorpicker': true,
        'fabric-whiteboard-colorpicker-hide': !props.visible,
      })}
    >
      <CirclePicker
        colors={props.colors}
        color={props.color}
        onChange={handleOnBrushColorChange}
        width="400px"
      />
    </div>
  );
}

export default ColorPicker;
