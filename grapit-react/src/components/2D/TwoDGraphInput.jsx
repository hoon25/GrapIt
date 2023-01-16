import { useState } from 'react';
import { Form } from 'react-bootstrap';
import LineInputGroup from './input/LineInputGroup';
import QuadraticInputGroup from './input/QuadraticInputGroup';
import CircleInputGroup from './input/CircleInputGroup';

export default function TwoDGraphInput() {
  const [twoDFigureType, setTwoDFigureType] = useState('일차함수');

  const handleSelect = e => {
    setTwoDFigureType(e.target.value);
  };

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Control
            className="mb-2"
            as="select"
            style={{ height: '2.8rem', fontSize: '1.2rem', fontWeight: 'bold' }}
            onChange={handleSelect}
          >
            {['일차함수', '이차함수', '원']
              .map(x => [x, x === twoDFigureType])
              .map(ResolveOptionRow)}
          </Form.Control>
        </Form.Group>
      </Form>
      <ResolveTwoFGraphInput twoDFigureType={twoDFigureType} />
    </div>
  );
}

function ResolveOptionRow([type, selected], i) {
  return (
    <option
      key={i}
      style={{ fontWeight: 'bold' }}
      value={type}
      selected={selected}
    >
      {type}
    </option>
  );
}

function ResolveTwoFGraphInput({ twoDFigureType }) {
  console.log(twoDFigureType);
  switch (twoDFigureType) {
    case '일차함수':
      return <LineInputGroup />;
    case '이차함수':
      return <QuadraticInputGroup />;
    case '원':
      return <CircleInputGroup />;
    default:
      return <LineInputGroup />;
  }
}
