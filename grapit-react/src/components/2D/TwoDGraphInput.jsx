import { useState } from 'react';
import { Form } from 'react-bootstrap';
import LineInputGroup from './input/LineInputGroup';
import TwoDInputGroup from './input/TwoDInputGroup';
import CircleInputGroup from './input/CircleInputGroup';
import { useDispatch, useSelector } from 'react-redux';
import { setTwoDInput } from '../../store/TwoDInputSlice';

export default function TwoDGraphInput({ sendObjectInfo }) {
  const TwoDInputType = useSelector(state => state.TwoDInput.type);
  const dispatch = useDispatch();
  const handleSelect = e => {
    dispatch(setTwoDInput.setType(e.target.value));
    dispatch(
      setTwoDInput.resetProps({
        firstProps: '',
        secondProps: '',
        color: '#ffffff',
      }),
    );
  };

  return (
    <div style={{ padding: '0px' }}>
      <Form>
        <Form.Group>
          <Form.Control
            className="mb-2"
            as="select"
            style={{ height: '2.8rem', fontSize: '1.2rem', fontWeight: 'bold' }}
            onChange={handleSelect}
          >
            {['일차함수', '이차함수', '원']
              .map(x => [x, x === TwoDInputType])
              .map(ResolveOptionRow)}
          </Form.Control>
        </Form.Group>
      </Form>
      <ResolveTwoDGraphInput
        TwoDInputType={TwoDInputType}
        sendObjectInfo={sendObjectInfo}
      />
    </div>
  );
}

function ResolveOptionRow([type, selected], i) {
  return (
    <option key={i} style={{ fontWeight: 'bold' }} value={type}>
      {type}
    </option>
  );
}

function ResolveTwoDGraphInput({ TwoDInputType, sendObjectInfo }) {
  switch (TwoDInputType) {
    case '일차함수':
      return <LineInputGroup sendObjectInfo={sendObjectInfo} />;
    case '이차함수':
      return <TwoDInputGroup sendObjectInfo={sendObjectInfo} />;
    case '원':
      return <CircleInputGroup sendObjectInfo={sendObjectInfo} />;
    default:
      return <LineInputGroup sendObjectInfo={sendObjectInfo} />;
  }
}
