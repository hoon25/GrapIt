import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './result.css';
function Result() {
  return (
    <div className="box1" data-aos="zoom-in">
      <Card>
        <Card.Body>
          <Card.Title>
            <h5>맞춤 선생님을 찾았어요</h5>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <h5>"신종우 선생님"</h5>
          </Card.Subtitle>
          <Card.Text>
            "숙제의 종류와 양을 일정하게 줘서 공부 루틴을 만들 수 있도록
            수업해요 부담 갖지 않도록 격려하면서 지도하고 있습니다."
          </Card.Text>

          <Link to="/room">
            <h4>수업하러 가기</h4>
          </Link>
        </Card.Body>
      </Card>
      {/* style={{ width: '20rem' }} */}
    </div>
  );
}

export default Result;
