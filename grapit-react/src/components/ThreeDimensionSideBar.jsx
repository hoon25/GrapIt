import { Row } from 'react-bootstrap';
import ThreeCardBox from './ThreeCardBox';
import FigureInput from './FigureInput';
import { useState } from 'react';

export default function ThreeDimensionSideBar(props) {
  const [figureType, setFigureType] = useState('twoPointedLine');

  return (
    <Row>
      <Row style={{ height: '40vh', backgroundColor: '' }}>
        <FigureInput
          sendObjectInfo={props.sendObjectInfo}
          figureType={figureType}
          setFigureType={setFigureType}
        />
      </Row>
      <Row
        style={{
          height: '45vh',
          backgroundColor: '#eeeeee',
        }}
      >
        <ThreeCardBox
          sendObjectInfo={props.sendObjectInfo}
          setFigureType={setFigureType}
        />
      </Row>
    </Row>
  );
}
