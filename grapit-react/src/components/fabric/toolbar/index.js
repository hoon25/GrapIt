import React, { useEffect, useState } from 'react';
import Thickness from './thickness';
import classNames from 'class-names';
import ColorPicker from './colorpicker';
import modes from '../utils/mode';
import './style.scss';
import '../../../css/floatingButton.css';
import '../../../css/Button3D.css';
import {
  setIsWhiteBoard,
  toggleIsWhiteBoard,
} from '../../../store/isWhiteBoardSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowClockwise,
  ArrowsMove,
  Brush,
  BrushFill,
  CardText,
  Dash,
  DashLg,
  EraserFill,
  GraphUp,
  PaletteFill,
  Square,
  Trash3Fill,
  TypeUnderline,
  VectorPen,
} from 'react-bootstrap-icons';

function Toolbar(props) {
  const [toolButtons, setToolButtons] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontsize, setShowFontsize] = useState(false);
  const [toolChange, setToolChange] = useState(undefined);

  const dispatch = useDispatch();
  const isWhiteBoard = useSelector(state => state.isWhiteBoard);

  const Icon = {
    select: <ArrowsMove />,
    pen: <BrushFill />,
    line: <DashLg />,
    text: <CardText />,
    rectangle: <Square />,
    eraser: <EraserFill />,
  };

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
    <div className="menu">
      <input
        type="checkbox"
        onClick={() => {
          dispatch(toggleIsWhiteBoard());
        }}
        className="menu-open"
        name="menu-open"
        id="menu-open"
      />
      <label
        className="menu-item button-3d menu-open-button"
        htmlFor="menu-open"
      >
        {isWhiteBoard.isSelected ? <VectorPen /> : <GraphUp />}
      </label>

      {toolButtons.map((btn, index) => (
        <a
          key={index}
          href="#"
          className="menu-item button-3d"
          title={btn.title}
          onClick={() => {
            if (props.enabled === false) return;
            props.setButtonMode(btn.key);
          }}
        >
          {/*<li*/}
          {/*  className={classNames(*/}
          {/*    'tool',*/}
          {/*    btn.key === props.buttonMode ? 'active' : '',*/}
          {/*  )}*/}
          {/*  // data={btn.key}*/}
          {/*  title={btn.title}*/}
          {/*  onClick={() => {*/}
          {/*    if (props.enabled === false) return;*/}
          {/*    props.setButtonMode(btn.key);*/}
          {/*  }}*/}
          {/*>*/}
          {Icon[btn.key]}
          {/*  <i*/}
          {/*    className={classNames(*/}
          {/*      `toolbar-ul-${btn.key}`,*/}
          {/*      btn.key === props.buttonMode ? 'active' : '',*/}
          {/*    )}*/}
          {/*  />*/}
          {/*</li>*/}
        </a>
      ))}

      <a
        href="#"
        className="menu-item button-3d"
        onClick={() => {
          props.setClear(true);
          props.sendPaintInfo(
            'PAINT',
            JSON.stringify({ action: 'remove-all' }),
          );
        }}
      >
        <Trash3Fill />
      </a>

      {/*<a href="#" className="menu-item button-3d">*/}
      {/*  <li*/}
      {/*    className="tool"*/}
      {/*    title="brush"*/}
      {/*    onClick={() => {*/}
      {/*      if (props.enabled === false) return;*/}
      {/*      setShowColorPicker(!showColorPicker);*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <i className="toolbar-ul-brush" />*/}
      {/*  </li>*/}
      {/*  <PaletteFill />*/}
      {/*  <ColorPicker*/}
      {/*    visible={showColorPicker}*/}
      {/*    color={props.brushColor}*/}
      {/*    colors={props.brushColors}*/}
      {/*    setBrushColor={props.setBrushColor}*/}
      {/*  />*/}
      {/*</a>*/}
      {/*<a href="#" className="menu-item button-3d">*/}
      {/*  <label className="menu-item button-3d">*/}
      {/*    <span className="hamburger hamburger-1"></span>*/}
      {/*    <span className="hamburger hamburger-2"></span>*/}
      {/*    <span className="hamburger hamburger-3"></span>*/}
      {/*  </label>*/}

      {/*  <Thickness*/}
      {/*    visible={props.showToolbar}*/}
      {/*    enabled={props.enabled}*/}
      {/*    brushColor={props.brushColor}*/}
      {/*    brushThickness={props.brushThickness}*/}
      {/*    brushThicknessRange={props.brushThicknessRange}*/}
      {/*    setBrushThickness={props.setBrushThickness}*/}
      {/*  />*/}
      {/*</a>*/}
    </div>
  );
}

export default Toolbar;
