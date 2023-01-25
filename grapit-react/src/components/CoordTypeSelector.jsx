import { Button, Row, Stack } from 'react-bootstrap';

export default function CoordTypeSelector({ coordType, setCoordType }) {
  return (
    <Row style={{ height: '5vh', backgroundColor: '', paddingLeft: '10%' }}>
      <Stack direction="horizontal" gap={2} style={{ paddingLeft: '0px' }}>
        <Button
          style={{ borderRadius: '10px' }}
          variant={coordType === 'problem' ? 'primary' : 'secondary'}
          onClick={() => setCoordType('problem')}
        >
          문제
        </Button>

        <Button
          style={{ borderRadius: '10px' }}
          variant={coordType === '2D' ? 'primary' : 'secondary'}
          onClick={() => setCoordType('2D')}
        >
          2D
        </Button>
        <Button
          style={{ borderRadius: '10px' }}
          variant={coordType === '3D' ? 'primary' : 'secondary'}
          onClick={() => setCoordType('3D')}
        >
          3D
        </Button>
      </Stack>
    </Row>
  );
}
