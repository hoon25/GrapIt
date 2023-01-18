import React from 'react';
import { Button, Card, Col, Row, Stack } from 'react-bootstrap';
import { Trash3Fill } from 'react-bootstrap-icons';
import { setTwoDInput } from '../../store/TwoDInputSlice';
import { useDispatch } from 'react-redux';
import { setLoad } from '../../store/loadSlice';
export default function ProblemCardBox({ sendObjectInfo }) {
  const dispatch = useDispatch();

  const problems = [
    {
      title: 'Problem 1',
      src: '../../resource/cat.png',
    },
    {
      title: 'Problem 2',
      src: '../../resource/cat.png',
    },
    {
      title: 'Problem 3',
      src: '../../resource/cat.png',
    },
  ];

  return (
    <Stack
      gap={2}
      style={{
        backgroundColor: 'whitesmoke',
        height: '45vh',
        overflowY: 'scroll',
      }}
    >
      {problems.map(x => [x, dispatch]).map(makeCard)}
    </Stack>
  );
}

function makeCard([problem, dispatch], i) {
  const headerColor = '#64b5f6';

  const onCardClick = () => {
    if (i === 0) {
      dispatch(setLoad.setFirst());
    } else if (i === 1) {
      dispatch(setLoad.setSecond());
    } else {
      dispatch(setLoad.setThird());
    }
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
        {i + 1 + '번째 문제'}
      </Card.Header>
      <Card.Body onClick={onCardClick}>
        <Row className="flex justify-content-between align-content-center">
          <Col lg={8}>{problem.title}</Col>
          <Col lg={2}>
            <Button className="btn-sm" variant="danger">
              <Trash3Fill />
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

function contrastColor(colorText) {
  const r = parseInt(colorText.substr(1, 2), 16);
  const g = parseInt(colorText.substr(3, 2), 16);
  const b = parseInt(colorText.substr(5, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
}
