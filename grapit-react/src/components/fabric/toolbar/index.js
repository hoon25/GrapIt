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
import ColorPicker from './colorpicker';

function Toolbar(props) {
  const [toolButtons, setToolButtons] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const imageInput = useRef();
  const toolbox = useRef();

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
    const keyDownHandler = event => {
      console.log(event);
      if (event.key === 'q' || event.key === 'ㅂ' || event.key === 'Q') {
        event.preventDefault();
        escFunction();
      }
    };
    document.addEventListener('keypress', keyDownHandler);

    return () => {
      setIsEnabled(false);
      document.removeEventListener('keypress', keyDownHandler);
    };
  }, []);

  function escFunction() {
    toggleState();
    dispatch(changeIsWhiteBoard.toggleIsWhiteBoard());
  }

  return (
    <div>
      <label className="toggle-menu-wrapper" htmlFor="toggle-menu">
        <div
          className={`toggle-menu ${isEnabled ? 'open' : 'close'}`}
          style={{ zIndex: '999' }}
          onClick={() => {
            toolbox.current.blur();
          }}
        >
          <div className="icons">
            <PencilFill />
            <ArrowsMove />
          </div>
          <input
            ref={toolbox}
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
                '',
                JSON.stringify({ action: 'remove-all' }),
              );
            }}
          >
            <Trash3Fill />
          </a>
        </div>
      </label>

      <ColorPicker
        buttonMode={props.buttonMode}
        visible={showColorPicker}
        color={props.brushColor}
        setBrushColor={props.setBrushColor}
        setBrushThickness={props.setBrushThickness}
        brushThickness={props.brushThickness}
      />
    </div>
  );
}

export default Toolbar;
