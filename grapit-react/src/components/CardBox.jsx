import React from 'react';
import { Button, Card, Col, Row, Stack } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function CardBox() {
  const figureStore = useSelector(state => state.figure.figures);

  return (
    <Stack
      gap={2}
      style={{
        backgroundColor: 'whitesmoke',
        height: '50vh',
        overflowY: 'scroll',
      }}
    >
      {figureStore.map(makeCard)}
    </Stack>
  );
}

function makeCard(figure, i) {
  const headerColor = '#' + figure.color.toString(16);

  return (
    <Card>
      <Card.Header style={{ fontWeight: 'bold', backgroundColor: headerColor }}>
        {figure.type}
      </Card.Header>
      <Card.Body>
        <Row>
          <Col lg={9}>{resolveInfo(figure)}</Col>
          <Col lg={3}>
            <Stack direction="horizontal" gap={2}>
              <Button className="btn-sm" variant="secondary">
                투명
              </Button>
              <Button className="btn-sm" variant="danger">
                X
              </Button>
            </Stack>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

function resolveInfo(figure) {
  let info;
  if (figure.type === 'sphere') {
    info = SphereCardInfo(figure);
  } else if (figure.type === 'twoPointedLine') {
    info = TwoPointedLineCardInfo(figure);
  } else if (
    figure.type === 'tetrahedron' ||
    figure.type === 'cube' ||
    figure.type === 'octahedron' ||
    figure.type === 'dodecahedron' ||
    figure.type === 'icosahedron'
  ) {
    info = PlatonicSolidCardInfo(figure);
  }

  return <Card.Text>{info}</Card.Text>;
}

function SphereCardInfo(figure) {
  const [x, y, z] = figure.position;

  return (
    <Card.Text>
      {`반지름 ${figure.radius}`}
      <br />
      {`중심 x: ${x} y: ${y} z: ${z}`}
    </Card.Text>
  );
}

function TwoPointedLineCardInfo(figure) {
  return (
    <Card.Text>
      {`점1: ${figure.point1}`}
      <br />
      {`점2: ${figure.point2}`}
    </Card.Text>
  );
}

function PlatonicSolidCardInfo(figure) {
  const [x, y, z] = figure.position;

  return (
    <Card.Text>
      {`모서리의 길이 ${figure.length}`}
      <br />
      {`중심 x: ${x} y: ${y} z: ${z}`}
    </Card.Text>
  );
}
