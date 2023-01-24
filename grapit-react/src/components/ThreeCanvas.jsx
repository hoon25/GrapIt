import { Col, Container, Row } from 'react-bootstrap';
import { DataPusher } from '../DataPusher';

import ThreeCardBox from './ThreeCardBox';
import FigureInput from './FigureInput';
import ThreeDimensionCanvas from './ThreeDimensionCanvas';

function ThreeCanvas() {
  return (
    <Container fluid>
      <DataPusher />
      <Row>
        <Col className="" lg={9}>
          <ThreeDimensionCanvas />
        </Col>
        <Col
          className=""
          lg={3}
          style={{ backgroundColor: '#CCCCCC', height: '90vh' }}
        >
          <Row style={{ height: '40%' }}>
            <FigureInput />
          </Row>
          <Row style={{ height: '60%' }}>
            <ThreeCardBox />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ThreeCanvas;
