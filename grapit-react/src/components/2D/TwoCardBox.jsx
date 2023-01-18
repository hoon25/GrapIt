import React from 'react';
import { Button, Card, Col, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setTwoDFigure } from '../../store/TwoDfigureSlice';
import { MathComponent } from 'mathjax-react';
import { Trash3Fill } from 'react-bootstrap-icons';
import { setTwoDInput } from '../../store/TwoDInputSlice';

export default function TwoCardBox({ sendObjectInfo }) {
  const TwoDfigures = useSelector(state => state.TwoDfigure.TwoDfigures);
  const TwoDInput = useSelector(state => state.TwoDInput);

  const dispatch = useDispatch();

  return (
    <Stack
      gap={2}
      style={{
        backgroundColor: 'whitesmoke',
        height: '45vh',
        overflowY: 'scroll',
      }}
    >
      {TwoDfigures.map(x => [x, dispatch, sendObjectInfo, TwoDfigures]).map(
        makeCard,
      )}
    </Stack>
  );
}

function makeCard([TwoDfigure, dispatch, sendObjectInfo, TwoDfigures], i) {
  const headerColor = TwoDfigure.color;

  const onCardMouseDown = () => {
    dispatch(setTwoDFigure.emphasizeFigure(TwoDfigure.figureId));

    // TODO 부채
    const copy = [...TwoDfigures];
    const index = copy.findIndex(x => x.figureId === TwoDfigure.figureId);

    const newTwoDFigure = { ...copy[index] };

    newTwoDFigure.thick += 10;
    copy[index] = newTwoDFigure;

    sendObjectInfo('GRAPH', JSON.stringify(copy));
  };

  const onCardDoubleClick = () => {
    dispatch(setTwoDInput.setProps(TwoDfigure));
  };

  const onCardMouseUp = () => {
    dispatch(setTwoDFigure.deemphasizeFigure(TwoDfigure.figureId));

    // TODO 부채
    const copy = [...TwoDfigures];
    const index = copy.findIndex(x => x.figureId === TwoDfigure.figureId);

    const newTwoDFigure = { ...copy[index] };

    newTwoDFigure.thick -= 10;
    copy[index] = newTwoDFigure;

    sendObjectInfo('GRAPH', JSON.stringify(copy));
  };

  const onDelBtnClick = () => {
    dispatch(setTwoDFigure.removeFigure(TwoDfigure.figureId));
    sendObjectInfo('GRAPH', TwoDfigure);
  };

  const onCardMouseLeave = () => {
    dispatch(setTwoDFigure.resetThick(TwoDfigure.figureId));

    // TODO 부채
    const copy = [...TwoDfigures];
    const index = copy.findIndex(x => x.figureId === TwoDfigure.figureId);

    const newTwoDFigure = { ...copy[index] };

    newTwoDFigure.thick = 3;
    copy[index] = newTwoDFigure;

    sendObjectInfo('GRAPH', JSON.stringify(copy));
  };

  return (
    <Card key={i}>
      <Card.Header
        style={{
          fontWeight: 'bold',
          backgroundColor: headerColor,
          color: contrastColor(headerColor),
        }}
      >
        {TwoDfigure.type}
      </Card.Header>
      <Card.Body
        onMouseLeave={onCardMouseLeave}
        onMouseDown={onCardMouseDown}
        onMouseUp={onCardMouseUp}
        onDoubleClick={onCardDoubleClick}
      >
        <Row className="flex justify-content-between align-content-center">
          <Col lg={8}>{resolveInfo(TwoDfigure)}</Col>
          <Col lg={2}>
            <Button className="btn-sm" variant="danger" onClick={onDelBtnClick}>
              <Trash3Fill />
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

function resolveInfo(TwoDfigure) {
  const info = makeInfo(TwoDfigure);
  return <div>{info}</div>;
}

function contrastColor(colorText) {
  const r = parseInt(colorText.substr(1, 2), 16);
  const g = parseInt(colorText.substr(3, 2), 16);
  const b = parseInt(colorText.substr(5, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
}

function makeInfo(TwoDfigure) {
  const formula = makeFormulaFormat(TwoDfigure);
  return <MathComponent tex={formula} />;
}

function makeFormulaFormat(TwoDfigure) {
  const { firstProps, secondProps, thirdProps } = TwoDfigure;
  let formula;
  switch (TwoDfigure.type) {
    case 'Line':
      formula = LineFormulaFormat(firstProps, secondProps);
      break;
    case 'TwoD':
      formula = TwoDFormulaFormat(firstProps, secondProps, thirdProps);
      break;
    case 'Circle':
      formula = CircleFormulaFormat(firstProps, secondProps, thirdProps);
      break;
    default:
      return 'error';
  }
  formula = formula.replace(/--/g, '+');
  formula = formula.replace(/-+/g, '-');
  return formula;
}
function LineFormulaFormat(first, second) {
  let formula = 'y = ';

  if (first === null || first === undefined || first === 0) {
    //x계수가 없을때
    second === null || second === 0 || second === undefined
      ? (formula += '0')
      : (formula += second);
  } else {
    // 계수가 존재 ( 1일떄)
    first === 1 ? (formula += 'x') : (formula += first + 'x');
    second === null || second === 0 || second === undefined
      ? (formula += '')
      : (formula += ' + ' + second);
  }
  return formula;
}

function CircleFormulaFormat(first, second, third) {
  let formula = '';

  first === null || first === undefined || first === 0
    ? (formula += 'x^2')
    : (formula += '(x-' + first + ')^2');
  second === null || second === undefined || second === 0
    ? (formula += ' + y^2')
    : (formula += ' + (y-' + second + ')^2');
  formula += ' = ' + third + '^2';
  return formula;
}

function TwoDFormulaFormat(first, second, third) {
  let formula = 'y = ';
  first === 1 ? (formula += 'x^2') : (formula += first + 'x^2');
  second === null || second === undefined || second === 0
    ? (formula += '')
    : (formula += ' + ' + second + 'x ');
  third === null || third === undefined || third === 0
    ? (formula += '')
    : (formula += ' + ' + third);
  return formula;
}
