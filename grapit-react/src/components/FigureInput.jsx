import { useState } from 'react';
import { Form } from 'react-bootstrap';
import LineInputGroup from './inputs/LineInputGroup';
import PlatonicSolidInputGroup from './inputs/PlatonicSolidInputGroup';
import SphereInputGroup from './inputs/SphereInputGroup';
import { translate } from './translate';

function FigureInput(props) {
  const [figureType, setFigureType] = useState('twoPointedLine');

  const handleSelect = e => {
    setFigureType(e.target.value);
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
            {['twoPointedLine', 'sphere', 'platonicSolid']
              .map(x => [x, x === figureType])
              .map(ResolveOptionRow)}
          </Form.Control>
        </Form.Group>
      </Form>
      <ResolveInputGroup
        figureType={figureType}
        sendObjectInfo={props.sendObjectInfo}
      />
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
      {translate(type)}
    </option>
  );
}

function ResolveInputGroup({ figureType, sendObjectInfo }) {
  switch (figureType) {
    case 'twoPointedLine':
      return <LineInputGroup sendObjectInfo={sendObjectInfo} />;
    case 'sphere':
      return <SphereInputGroup sendObjectInfo={sendObjectInfo} />;
    case 'platonicSolid':
      return <PlatonicSolidInputGroup sendObjectInfo={sendObjectInfo} />;
    default:
      return <LineInputGroup sendObjectInfo={sendObjectInfo} />;
  }
}

export default FigureInput;
