import { Col, Container, Row } from 'react-bootstrap';
import { DataPusher } from '../DataPusher';

import ThreeDimensionCanvas from './ThreeDimensionCanvas';
import ThreeDimensionSideBar from './ThreeDimensionSideBar';
import CoordTypeSelector from './CoordTypeSelector';

function BaseCanvas() {
  return (
    <Container fluid>
      <DataPusher />
      <Row>
        <Col lg={9}>
          <ThreeDimensionCanvas />
        </Col>
        <Col lg={3} style={{ backgroundColor: '', height: '90vh' }}>
          <CoordTypeSelector />
          <ThreeDimensionSideBar />
        </Col>
      </Row>
    </Container>
  );
}

export default BaseCanvas;
