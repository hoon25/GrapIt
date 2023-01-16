import { Col, Container, Row } from 'react-bootstrap';
import { DataPusher } from '../DataPusher';

import ThreeDimensionCanvas from './ThreeDimensionCanvas';
import GraphTypeSelector from './GraphTypeSelector';
import ThreeDimensionSideBar from './ThreeDimensionSideBar';

function BaseCanvas() {
  return (
    <Container fluid>
      <DataPusher />
      <Row>
        <Col lg={9}>
          <ThreeDimensionCanvas />
        </Col>
        <Col lg={3} style={{ backgroundColor: '', height: '90vh' }}>
          <GraphTypeSelector />
          <ThreeDimensionSideBar />
        </Col>
      </Row>
    </Container>
  );
}

export default BaseCanvas;
