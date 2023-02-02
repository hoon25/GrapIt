import { Button, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ProblemCardBox from './ProblemCardBox';

export default function ProblemSideBar({}) {
  const inputColor = useSelector(state => state.TwoDInput.color);

  const sidebarTopStyle = {
    height: '30vh',
    justifyContent: 'center',
    margin: '0px',
    marginTop: '2.35%',
    padding: '10px',
    border: '1px solid #afafaf',
    borderWidth: '1px 1px 1px 1px',
    boxShadow: '0px 0px 5px 0px #afafaf',
    borderRadius: '10px',
  };

  const sidebarBottomStyle = {
    height: '55vh',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0px',
    marginTop: '3.5%',
    padding: '0px',
  };

  return (
    <Row
      style={{
        flexDirection: 'column',
        margin: '0px',
        paddingRight: '10%',
        paddingLeft: '10%',
      }}
    >
      <Row style={sidebarTopStyle}>
        <div className="flex justify-content-center align-content-center">
          <Button
            style={{ height: '50px', borderRadius: '10px', fontWeight: '800' }}
          >
            문제 추가하기
          </Button>
        </div>
      </Row>
      <Row style={sidebarBottomStyle}>
        <ProblemCardBox />
      </Row>
    </Row>
  );
}
