import React, { Component } from 'react';
import classNames from 'class-names';
import PropTypes from 'prop-types';

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

ColorPicker.propTypes = {
  visible: PropTypes.bool,
  color: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
  pos: PropTypes.objectOf(
    PropTypes.shape({
      x: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
      y: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    }),
  ),
  onChange: PropTypes.func,
};

export default ColorPicker;
