import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import modes from '../utils/mode';
import './style.scss';
import '../../../css/Button3D.css';
import '../../../css/switchStyles.css';
import { changeIsWhiteBoard } from '../../../store/isWhiteBoardSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowsMove,
  ArrowUpRight,
  BrushFill,
  DashLg,
  EraserFill,
  GraphUp,
  Square,
  Trash3Fill,
  Image,
  VectorPen,
  PencilFill,
} from 'react-bootstrap-icons';

function Toolbar(props) {
  const [toolButtons, setToolButtons] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontsize, setShowFontsize] = useState(false);
  const [toolChange, setToolChange] = useState(undefined);
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const isWhiteBoard = useSelector(state => state.isWhiteBoard);
  const imageInput = useRef();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleState = () => {
    setIsEnabled(prevState => !prevState);
  };

  const Icon = {
    select: <ArrowsMove />,
    pen: <PencilFill />,
    line: <DashLg />,
    arrow: <ArrowUpRight />,
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

    return () => {
      setIsEnabled(false);
    };
  }, []);

  return (
    <div>
      <label className="toggle-menu-wrapper" htmlFor="toggle-menu">
        <div
          className={`toggle-menu ${isEnabled ? 'open' : 'close'}`}
          style={{ zIndex: '999' }}
        >
          <div className="icons">
            <PencilFill />
            <ArrowsMove />
          </div>
          <input
            id="toggle-menu"
            name="toggle-menu"
            type="checkbox"
            className="toggle-checkbox"
            checked={isEnabled}
            onClick={() => {
              toggleState();
              dispatch(changeIsWhiteBoard.toggleIsWhiteBoard());
            }}
          />

          <a
            className="toggle-child button-3d"
            onClick={() => {
              console.log(props.board);
              imageInput.current.click();
            }}
          >
            <input
              ref={imageInput}
              value={image}
              type="file"
              accept="image/*"
              hidden={true}
              onChange={event => {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = event => {
                  const data = event.target.result;
                  fabric.Image.fromURL(data, function (img) {
                    const oImg = img
                      .set({
                        left: 100,
                        top: 100,
                        angle: 0,
                      })
                      .scale(0.7);
                    props.board.add(oImg).renderAll();
                  });
                };
                reader.readAsDataURL(file);
                setImage(null);
              }}
            />
            <Image />
          </a>

          {toolButtons.map((btn, index) => (
            <a
              key={index}
              href="#"
              className="toggle-child button-3d"
              title={btn.title}
              onClick={e => {
                e.preventDefault();
                if (props.enabled === false) return;
                props.setButtonMode(btn.key);
              }}
            >
              {Icon[btn.key]}
            </a>
          ))}

          <a
            href="#"
            className="toggle-child button-3d"
            onClick={e => {
              e.preventDefault();
              props.setClear(true);
              props.sendPaintInfo(
                'PAINT',
                JSON.stringify({ action: 'remove-all' }),
              );
            }}
          >
            <Trash3Fill />
          </a>
        </div>
      </label>

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
