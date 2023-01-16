import { Row } from 'react-bootstrap';
import TwoDGraphInput from './TwoDGraphInput';
import { EquationHandBoard } from '../../routes/equationBoard/EquationHandBoard';
import TwoCardBox from './TwoCardBox';

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
          graphColor={16777215}
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
        <TwoCardBox />
      </Row>
    </Row>
  );
}
