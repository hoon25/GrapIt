import React from 'react';
import { Button, Card, Col, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setTwoDFigure } from '../../store/TwoDfigureSlice';
import { MathComponent } from 'mathjax-react';
import { Trash3Fill } from 'react-bootstrap-icons';

export default function TwoCardBox() {
  const TwoDfigure = useSelector(state => state.TwoDfigure.TwoDfigures);

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
      {TwoDfigure.map(x => [x, dispatch]).map(makeCard)}
    </Stack>
  );
}

function makeCard([TwoDfigure, dispatch], i) {
  const headerColor = '#' + TwoDfigure.color.toString(16);

  const onCardMouseDown = () => {
    dispatch(setTwoDFigure.emphasizeFigure(TwoDfigure.figureId));
  };

  const onCardMouseUp = () => {
    dispatch(setTwoDFigure.deemphasizeFigure(TwoDfigure.figureId));
  };

  const onDelBtnClick = () => {
    dispatch(setTwoDFigure.removeFigure(TwoDfigure.figureId));
  };

  const onCardMouseLeave = () => {
    dispatch(setTwoDFigure.resetThick(TwoDfigure.figureId));
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
      >
        <Row className="flex justify-content-between align-content-center">
          <Col lg={8}>{resolveInfo(TwoDfigure)}</Col>
          <Col lg={2}>
            {/* <Stack direction="horizontal" gap={2}> */}
            {/* <Button className="btn-sm" variant="secondary">
              투명
            </Button> */}
            <Button className="btn-sm" variant="danger" onClick={onDelBtnClick}>
              <Trash3Fill />
            </Button>
            {/* </Stack> */}
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
  const color = parseInt(colorText.substring(1), 16); // convert rrggbb to decimal

  const r = (color >> 16) & 0xff;
  const g = (color >> 8) & 0xff;
  const b = color & 0xff;

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? 'black' : 'white';
}

function makeInfo(TwoDfigure) {
  const formula = makeFormulaFormat(TwoDfigure);
  return <MathComponent tex={formula} />;
}

function makeFormulaFormat(TwoDfigure) {
  const { firstProps, secondProps, thirdProps } = TwoDfigure;
  switch (TwoDfigure.type) {
    case 'Line':
      return LineFormulaFormat(firstProps, secondProps);
    case 'TwoD':
      return TwoDFormulaFormat(firstProps, secondProps, thirdProps);
    case 'Circle':
      return CircleFormulaFormat(firstProps, secondProps, thirdProps);
    default:
      return 'error';
  }
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
