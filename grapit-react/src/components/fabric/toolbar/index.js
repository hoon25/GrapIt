import React, { useEffect, useState } from 'react';
import Thickness from './thickness';
import classNames from 'class-names';
import ColorPicker from './colorpicker';
import PropTypes from 'prop-types';
import modes from '../utils/mode';
import './style.scss';

function Toolbar(props) {
  const [toolButtons, setToolButtons] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontsize, setShowFontsize] = useState(false);
  const [toolChange, setToolChange] = useState(undefined);

  useEffect(() => {
    const toolButtons = [];
    modes.forEach(mode => {
      toolButtons.push({
        key: mode,
        title: mode,
      });
    });
    setToolButtons(toolButtons);
  }, []);

  return (
    <div className="fabric-whiteboard-toolbar">
      <ul
        id="fabric-whiteboard-toolbar-ul"
        className="fabric-whiteboard-toolbar-ul"
      >
        <li className="toolbar-ul-li" title="thickness">
          <Thickness
            visible={props.showToolbar}
            enabled={props.enabled}
            brushColor={props.brushColor}
            brushThickness={props.brushThickness}
            brushThicknessRange={props.brushThicknessRange}
            setBrushThickness={props.setBrushThickness}
          />
        </li>

        {toolButtons.map((btn, index) => (
          <li
            key={index}
            className={classNames(
              'toolbar-ul-li',
              btn.key === props.buttonMode ? 'active' : '',
            )}
            // data={btn.key}
            title={btn.title}
            onClick={() => {
              if (props.enabled === false) return;
              // props.setMode(btn.key);
              props.setButtonMode(btn.key);
            }}
          >
            <i
              className={classNames(
                `toolbar-ul-${btn.key}`,
                btn.key === props.buttonMode ? 'active' : '',
              )}
            />
          </li>
        ))}

        <li
          className="toolbar-ul-li"
          title="brush"
          onClick={() => {
            if (props.enabled === false) return;
            setShowColorPicker(!showColorPicker);
          }}
        >
          <i className="toolbar-ul-brush" />
        </li>

        <ColorPicker
          visible={showColorPicker}
          color={props.brushColor}
          colors={props.brushColors}
          setBrushColor={props.setBrushColor}
        />
      </ul>
    </div>
  );
}

Toolbar.propTypes = {
  visible: PropTypes.bool,
  enabled: PropTypes.bool,
  mode: PropTypes.oneOf(modes),
  fontSize: PropTypes.number,
  brushColor: PropTypes.string,
  brushColors: PropTypes.arrayOf(PropTypes.string),
  brushThickness: PropTypes.number,
  brushThicknessRange: PropTypes.arrayOf(PropTypes.number),
  onModeClick: PropTypes.func,
  onBrushColorChange: PropTypes.func,
  onBrushThicknessChange: PropTypes.func,
};

export default Toolbar;
