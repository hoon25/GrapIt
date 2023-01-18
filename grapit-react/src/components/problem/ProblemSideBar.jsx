import { Button, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ProblemCardBox from './ProblemCardBox';

export default function ProblemSideBar({}) {
  const inputColor = useSelector(state => state.TwoDInput.color);

  return (
    <Row>
      <Row style={{ height: '25vh', backgroundColor: '' }}>
        <div className="flex justify-content-center align-content-center">
          <Button style={{ height: '50px', borderRadius: '10px' }}>
            문제 추가하기
          </Button>
        </div>
      </Row>
      <Row
        style={{
          height: '60vh',
          backgroundColor: '#eeeeee',
        }}
      >
        <ProblemCardBox />
      </Row>
    </Row>
  );
}
