import { Row } from 'react-bootstrap';
import ThreeCardBox from '../ThreeCardBox';
import TwoDGraphInput from './TwoDGraphInput';
import { EquationHandBoard } from '../../routes/equationBoard/EquationHandBoard';

export default function TwoDimensionSideBar(
  graphType,
  setGraphType,
  setGraphColor,
  graphColor,
  formulaFirst,
  setFormulaFirst,
  formulaSecond,
  setFormulaSecond,
  formulaThird,
  setFormulaThird,
  graphInfo,
  setGraphInfo,
  graphList,
  setGraphList,
  viewPointX,
  setViewPointX,
  viewPointY,
  setViewPointY,
  sendObjectInfo,
) {
  return (
    <Row>
      <Row style={{ height: '40vh', backgroundColor: '' }}>
        <TwoDGraphInput />

        <EquationHandBoard
          graphColor={'#ffffff'}
          setGraphColor={setGraphColor}
          graphType={graphType}
          setGraphType={setGraphType}
          formulaFirst={formulaFirst}
          setFormulaFirst={setFormulaFirst}
          formulaSecond={formulaSecond}
          setFormulaSecond={setFormulaSecond}
          formulaThird={formulaThird}
          setFormulaThird={setFormulaThird}
          graphInfo={graphInfo}
          setGraphInfo={setGraphInfo}
          graphList={graphList}
          setGraphList={setGraphList}
          viewPointX={viewPointX}
          setViewPointX={setViewPointX}
          viewPointY={viewPointY}
          setViewPointY={setViewPointY}
          sendGraphInfo={sendObjectInfo}
        />
      </Row>
      <Row
        style={{
          height: '45vh',
          backgroundColor: '#eeeeee',
        }}
      >
        <ThreeCardBox />
      </Row>
    </Row>
  );
}
