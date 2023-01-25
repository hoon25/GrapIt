import { Button, Row, Stack } from 'react-bootstrap';

export default function CoordTypeSelector({ coordType, setCoordType }) {
  return (
    <Row style={{ height: '5vh', backgroundColor: '', paddingLeft: '10%' }}>
      <Stack direction="horizontal" gap={2} style={{ paddingLeft: '0px' }}>
        <Button
          style={{ borderRadius: '10px', fontWeight: '800' }}
          variant={coordType === 'problem' ? 'primary' : 'secondary'}
          onClick={() => setCoordType('problem')}
        >
          문제
        </Button>

        <Button
          style={{ borderRadius: '10px', fontWeight: '800' }}
          variant={coordType === '2D' ? 'primary' : 'secondary'}
          onClick={() => setCoordType('2D')}
        >
          &nbsp;2D&nbsp;
        </Button>
        <Button
          style={{ borderRadius: '10px', fontWeight: '800' }}
          variant={coordType === '3D' ? 'primary' : 'secondary'}
          onClick={() => setCoordType('3D')}
        >
          &nbsp;3D&nbsp;
        </Button>
      </Stack>
    </Row>
  );
}
