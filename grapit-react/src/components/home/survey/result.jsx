import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './result.css';
function Result() {
  return (
    <div className="box1">
      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title>맞춤 선생님을 찾았어요</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Card Subtitle
          </Card.Subtitle>
          <Card.Text>
            "숙제의 종류와 양을 일정하게 줘서 공부 루틴을 만들 수 있도록
            수업해요 부담 갖지 않도록 격려하면서 지도하고 있습니다."
          </Card.Text>

          <Link to="/room">수업하러 가기</Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Result;