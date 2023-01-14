import { Button, Form, InputGroup } from 'react-bootstrap';

export function GraphInputGroup({
  formulaFirst,
  setFormulaFirst,
  formulaSecond,
  setFormulaSecond,
  formulaThird,
  setFormulaThird,
  graphColor,
  setGraphColor,
  graphInfo,
  setGraphInfo,
  graphType,
  setGraphType,
  graphList,
  setGraphList,
  viewPointX,
  setViewPointX,
  viewPointY,
  setViewPointY,
  sendGraphInfo,
}) {
  let firstPlaceHolder = {
    Line: 'X',
    Circle: '중심X',
    TwoD: 'x^2',
    Trigonometric: 'x계수?',
  };

  let secondPlaceHolder = {
    Line: '상수',
    Circle: '중심y',
    TwoD: 'x',
    Trigonometric: 'x평행?',
  };

  let thirdPlaceHolder = {
    Line: '',
    Circle: '반지름',
    TwoD: '상수',
    Trigonometric: '상수',
  };

  return (
    <InputGroup className="mb-3">
      <Form.Control
        type="color"
        id="colorInput"
        defaultValue="#ffffff"
        onChange={function (e) {
          setGraphColor(e.target.value);
        }}
        // value={graphColor}

        title="Choose your color"
      />

      <Form.Control
        placeholder={
          graphType === 'Line'
            ? firstPlaceHolder.Line
            : graphType === 'Circle'
            ? firstPlaceHolder.Circle
            : graphType === 'TwoD'
            ? firstPlaceHolder.TwoD
            : graphType === 'Trigonometric'
            ? firstPlaceHolder.Trigonometric
            : ''
        }
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        type="number"
        id="gradientInput"
        onChange={function (e) {
          setFormulaFirst(e.target.value);
        }}
        value={formulaFirst}
      />

      <Form.Control
        placeholder={
          graphType === 'Line'
            ? secondPlaceHolder.Line
            : graphType === 'Circle'
            ? secondPlaceHolder.Circle
            : graphType === 'TwoD'
            ? secondPlaceHolder.TwoD
            : graphType === 'Trigonometric'
            ? secondPlaceHolder.Trigonometric
            : ''
        }
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        type="number"
        id="yPointInput"
        onChange={function (e) {
          setFormulaSecond(e.target.value);
        }}
        value={formulaSecond}
      />

      <Form.Control
        placeholder={
          graphType === 'Line'
            ? thirdPlaceHolder.Line
            : graphType === 'Circle'
            ? thirdPlaceHolder.Circle
            : graphType === 'TwoD'
            ? thirdPlaceHolder.TwoD
            : graphType === 'Trigonometric'
            ? thirdPlaceHolder.Trigonometric
            : ''
        }
        hidden={graphType === 'Line'}
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        type="number"
        id="yPointInput"
        onChange={function (e) {
          setFormulaThird(e.target.value);
        }}
        value={formulaThird}
      />

      <Button
        onClick={() => {
          let copyGraphInfo = [...graphInfo];
          copyGraphInfo = [
            graphColor,
            graphType,
            formulaFirst,
            formulaSecond,
            formulaThird,
          ];
          setGraphInfo(copyGraphInfo);
          let copyGraphList = [...graphList, copyGraphInfo];
          setGraphList(copyGraphList);

          let copyViewPointX = [...viewPointX];
          let copyViewPointY = [...viewPointY];
          copyViewPointX = [Number(formulaFirst) - 3, Number(formulaFirst) + 3];
          copyViewPointY = [
            Number(formulaSecond) - 3,
            Number(formulaSecond) + 3,
          ];
          setViewPointX(copyViewPointX);
          setViewPointY(copyViewPointY);
          sendGraphInfo('GRAPH', copyGraphList);
          setFormulaSecond('');
          setFormulaFirst('');
          setFormulaThird('');
        }}
        variant="outline-secondary"
        id="button-addon2"
      >
        생성
      </Button>
    </InputGroup>
  );
}
