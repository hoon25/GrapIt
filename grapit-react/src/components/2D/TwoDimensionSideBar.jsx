import { Row } from 'react-bootstrap';
import TwoDGraphInput from './TwoDGraphInput';
import { EquationHandBoard } from '../../routes/equationBoard/EquationHandBoard';
import TwoCardBox from './TwoCardBox';
import CircleColorPicker from '../CircleColorPicker';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import TwoDInput from '../../store/TwoDInputSlice';

export default function TwoDimensionSideBar({
  viewPointX,
  viewPointY,
  sendObjectInfo,
}) {
  const inputColor = useSelector(state => state.TwoDInput.color);

  return (
    <Row>
      <Row style={{ height: '40vh', backgroundColor: '' }}>
        <TwoDGraphInput sendObjectInfo={sendObjectInfo} />
        {/*<CircleColorPicker />*/}
        <EquationHandBoard
          graphColor={inputColor}
          viewPointX={viewPointX}
          viewPointY={viewPointY}
          sendObjectInfo={sendObjectInfo}
        />
      </Row>
      <Row
        style={{
          height: '45vh',
          backgroundColor: '#eeeeee',
        }}
      >
        <TwoCardBox sendObjectInfo={sendObjectInfo} />
      </Row>
    </Row>
  );
}
