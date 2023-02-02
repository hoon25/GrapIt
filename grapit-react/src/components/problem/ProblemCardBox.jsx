import React from 'react';
import { Button, Card, Col, Row, Stack } from 'react-bootstrap';
import { Trash3Fill } from 'react-bootstrap-icons';
import { setTwoDInput } from '../../store/TwoDInputSlice';
import { useDispatch } from 'react-redux';
import { setLoad } from '../../store/loadSlice';
import { translate } from '../translate';
import * as Icon from 'react-bootstrap-icons';
export default function ProblemCardBox({ sendObjectInfo }) {
  const dispatch = useDispatch();

  const problems = [
    {
      title: '정글중 1학년 중간고사',
    },
    {
      title: '정글중 1학년 기말고사',
    },
    {
      title: '정글중 2학년',
    },
  ];

  return (
    <Stack
      gap={2}
      style={{
        padding: '0px',
        // backgroundColor: 'whitesmoke',
        height: '55vh',
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
    <Card
      key={i}
      style={{
        border: '1px solid #afafaf',
        borderWidth: '1px 1px 1px 1px',
        boxShadow: '0px 0px 5px 0px #afafaf',
        borderRadius: '10px',
      }}
    >
      <Card.Header
        className="d-flex justify-content-between"
        style={{
          fontWeight: 'bold',
          backgroundColor: '#0d6efd',
          color: 'white',
        }}
      >
        {i + 1 + '번째 문제'}
        <Icon.X lg={2} color="white" size="25px" />
      </Card.Header>
      <Card.Body onClick={onCardClick}>
        <Row className="cardBox2d flex justify-content-between align-content-center">
          <Col className="p-0" lg={12}>
            {problem.title}
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
