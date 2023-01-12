import React, { Component, useEffect, useState } from 'react';
import WhiteBoard, {
  addWhiteBoardObject,
  clearWhiteBoardSelection,
  createWhiteBoardSelection,
  modifyWhiteBoardObjects,
  removeWhiteBoardObjects,
  updateWhiteBoardSelection,
} from '../component/fabric/index';

let tempRoom;

function Canvas(props) {
  const [width, setWidth] = useState(props.childWidth.toString());
  const [height, setHeight] = useState(props.childHeight.toString());
  const [buttonMode, setButtonMode] = useState('select');

  const [mode, setMode] = useState();
  const [brushColor, setBrushColor] = useState('#f44336');
  const [brushThickness, setBrushThickness] = useState(2);
  console.log('canvas start');
  console.log(mode);
  console.log(buttonMode);
  console.log('canvas end');

  useEffect(() => {
    setMode(buttonMode);
  }, [buttonMode]);

  return (
    <div className="questioncontent">
      <div
        className="whiteboard"
        id="whiteboard"
        style={{ height: '100%', width: '100%' }}
      >
        <WhiteBoard
          width={width}
          height={height}
          showToolbar={true}
          enableToolbar={true}
          showBoard={true}
          mode={mode}
          buttonMode={buttonMode}
          setButtonMode={setButtonMode}
          brushColor={brushColor}
          brushColors={[
            '#f44336',
            '#e91e63',
            '#9c27b0',
            '#673ab7',
            '#3f51b5',
            '#2196f3',
            '#000000',
          ]}
          brushThickness={brushThickness}
          setBrushThickness={setBrushThickness}
          setBrushColor={setBrushColor}
          sendPaintInfo={props.sendPaintInfo}
          drawInfo={props.drawInfo}
        />
      </div>
    </div>
  );
}
export default Canvas;
