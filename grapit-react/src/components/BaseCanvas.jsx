import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import { DataPusher } from '../DataPusher';

import CardBox from './CardBox';
import FigureInput from './FigureInput';
import ThreeDimensionCanvas from './ThreeDimensionCanvas';

function BaseCanvas() {
  return (
    <Container fluid>
      <DataPusher />
      <Row>
        <Col lg={9}>
          <ThreeDimensionCanvas />
        </Col>
        <Col lg={3} style={{ backgroundColor: '', height: '90vh' }}>
          <Row style={{ height: '5vh', backgroundColor: '' }}>
            <Stack direction="horizontal" gap={2}>
              <Button variant="secondary">2D</Button>
              <Button>3D</Button>
            </Stack>
          </Row>
          <Row style={{ height: '40vh', backgroundColor: '' }}>
            <FigureInput />
          </Row>
          <Row
            style={{
              height: '45vh',
              backgroundColor: '#eeeeee',
            }}
          >
            <CardBox />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default BaseCanvas;
