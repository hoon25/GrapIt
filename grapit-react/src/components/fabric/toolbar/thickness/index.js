import React, { Component, useEffect, useState } from 'react';
import classNames from 'class-names';
import PropTypes from 'prop-types';

import './style.scss';
import { map } from 'react-bootstrap/ElementChildren';

function Thickness(props) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    map(props.brushThicknessRange, (range, index) => {
      if (range === props.brushThickness) {
        setIndex(props.index);
      }
    });
  }, [props.index]);

  function handleClick() {
    console.log('in handle click');
    console.log(props.enabled);
    if (props.enabled === false) return;
    let tempIndex = index + 1;
    console.log(tempIndex);
    if (tempIndex > props.brushThicknessRange.length - 1) tempIndex = 0;
    setIndex(tempIndex);
    props.setBrushThickness(props.brushThicknessRange[tempIndex]);
  }

  return (
    <div
      className={classNames({
        'fabric-whiteboard-thickness': true,
        'fabric-whiteboard-thickness-hide': false,
      })}
      onClick={handleClick}
    >
      <div
        style={{
          backgroundColor: props.brushColor,
          width: `${props.brushThickness * 2}px`,
          height: `${props.brushThickness * 2}px`,
          borderRadius: '50%',
        }}
      />
    </div>
  );
}

Thickness.propTypes = {
  visible: PropTypes.bool,
  enabled: PropTypes.bool,
  color: PropTypes.string,
  value: PropTypes.number,
  range: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
};

export default Thickness;
