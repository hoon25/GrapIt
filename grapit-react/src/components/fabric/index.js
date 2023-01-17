import React, { Component } from 'react';

import modes from './utils/mode';
import './style.scss';

import {
  getWhiteBoardData,
  loadWhiteBoardData,
  addWhiteBoardObject,
  removeWhiteBoardObjects,
  modifyWhiteBoardObjects,
  clearWhiteBoardContext,
  createWhiteBoardSelection,
  updateWhiteBoardSelection,
  clearWhiteBoardSelection,
} from './utils/handler';

import Board from './board';
import ToolBar from './toolbar';

import './style.scss';
import { useSelector } from 'react-redux';
function WhiteBoard(props) {
  const isWhiteBoard = useSelector(state => state.isWhiteBoard);

  const whiteBoardStyle = {
    pointerEvents: isWhiteBoard.isSelected ? 'auto' : 'none',
  };
  if (props.visible) {
    return (
      <div className="fabric-whiteboard">
        <div style={whiteBoardStyle}>
          <Board
            visible={props.showBoard}
            enabled={props.enableBoard}
            mode={props.mode}
            width={props.width}
            height={props.height}
            fontSize={props.fontSize}
            brushColor={props.brushColor}
            brushThickness={props.brushThickness}
            sendPaintInfo={props.sendPaintInfo}
            drawInfo={props.drawInfo}
          />
        </div>
        <div style={{ position: 'absolute', top: '-50px', right: '130px' }}>
          <ToolBar
            visible={props.showToolbar}
            enabled={props.enableToolbar}
            buttonMode={props.buttonMode}
            fontSize={props.fontSize}
            brushColor={props.brushColor}
            brushColors={props.brushColors}
            brushThickness={props.brushThickness}
            brushThicknessRange={props.brushThicknessRange}
            setBrushColor={props.setBrushColor}
            setBrushThickness={props.setBrushThickness}
            setButtonMode={props.setButtonMode}
          />
        </div>
      </div>
    );
  } else {
    return <React.Component />;
  }
}

WhiteBoard.defaultProps = {
  visible: true,
  className: '',
  width: '400px',
  height: '380px',
  showToolbar: true,
  enableToolbar: true,
  showBoard: true,
  enableBoard: true,
  mode: modes[0],
  fontSize: 22,
  brushColor: '#f44336',
  brushColors: [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
  ],
  brushThickness: 2,
  brushThicknessRange: [2, 3, 4, 5, 6, 7, 8],
  onModeClick: () => {},
  onBrushColorChange: () => {},
  onBrushThicknessChange: () => {},
  onObjectAdded: json => {},
  onObjectsModified: () => {},
  onObjectsRemoved: () => {},
  onSelectionCreated: () => {},
  onSelectionUpdated: () => {},
  onSelectionCleared: () => {},
};

export {
  WhiteBoard as default,
  getWhiteBoardData,
  loadWhiteBoardData,
  addWhiteBoardObject,
  removeWhiteBoardObjects,
  modifyWhiteBoardObjects,
  clearWhiteBoardContext,
  createWhiteBoardSelection,
  updateWhiteBoardSelection,
  clearWhiteBoardSelection,
};
