import { Button, Row, Stack } from 'react-bootstrap';

export default function GraphTypeSelector() {
  return (
    <Row style={{ height: '5vh', backgroundColor: '' }}>
      <Stack direction="horizontal" gap={2}>
        <Button variant="secondary">2D</Button>
        <Button>3D</Button>
      </Stack>
    </Row>
  );
}
