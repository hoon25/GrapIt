import { Row } from 'react-bootstrap';
import ThreeCardBox from './ThreeCardBox';
import FigureInput from './FigureInput';
import { useState } from 'react';

export default function ThreeDimensionSideBar(props) {
  const [figureType, setFigureType] = useState('twoPointedLine');

  const sidebarTopStyle = {
    height: '40vh',
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
    height: '45vh',
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
        <FigureInput
          sendObjectInfo={props.sendObjectInfo}
          figureType={figureType}
          setFigureType={setFigureType}
        />
      </Row>
      <Row style={sidebarBottomStyle}>
        <ThreeCardBox
          sendObjectInfo={props.sendObjectInfo}
          setFigureType={setFigureType}
        />
      </Row>
    </Row>
  );
}
