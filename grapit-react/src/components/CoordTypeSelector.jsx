import { Button, Row, Stack } from 'react-bootstrap';

export default function CoordTypeSelector({ coordType, setCoordType }) {
  return (
    <Row style={{ height: '5vh', backgroundColor: '' }}>
      <Stack direction="horizontal" gap={2}>
        <Button
          variant={coordType === '2D' ? 'primary' : 'secondary'}
          onClick={() => setCoordType('2D')}
        >
          2D
        </Button>
        <Button
          variant={coordType === '3D' ? 'primary' : 'secondary'}
          onClick={() => setCoordType('3D')}
        >
          3D
        </Button>
      </Stack>
    </Row>
  );
}
