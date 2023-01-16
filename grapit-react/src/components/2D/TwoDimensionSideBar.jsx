import { Row } from 'react-bootstrap';
import ThreeCardBox from '../ThreeCardBox';
import TwoDGraphInput from './TwoDGraphInput';
import { EquationHandBoard } from '../../routes/equationBoard/EquationHandBoard';

export default function TwoDimensionSideBar(
  viewPointX,
  viewPointY,
  sendObjectInfo,
) {
  return (
    <Row>
      <Row style={{ height: '40vh', backgroundColor: '' }}>
        <TwoDGraphInput />

        <EquationHandBoard
          graphColor={'#ffffff'}
          viewPointX={viewPointX}
          viewPointY={viewPointY}
          sendGraphInfo={sendObjectInfo}
        />
      </Row>
      <Row
        style={{
          height: '45vh',
          backgroundColor: '#eeeeee',
        }}
      >
        <ThreeCardBox />
      </Row>
    </Row>
  );
}
