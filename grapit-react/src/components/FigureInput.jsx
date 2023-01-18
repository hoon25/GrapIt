import { useState } from 'react';
import { Form } from 'react-bootstrap';
import LineInputGroup from './inputs/LineInputGroup';
import PlatonicSolidInputGroup from './inputs/PlatonicSolidInputGroup';
import SphereInputGroup from './inputs/SphereInputGroup';
import { translate } from './translate';

function FigureInput(props) {
  // TODO Redux
  const handleSelect = e => {
    props.setFigureType(e.target.value);
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
            {['twoPointedLine', 'plane']
              .map(x => [x, x === props.figureType])
              .map(ResolveOptionRow)}
            <option disabled style={{ fontWeight: 'bold' }}>
              --------------------
            </option>
            {['cylinder', 'cone', 'truncatedCone']
              .map(x => [x, x === props.figureType])
              .map(ResolveOptionRow)}
            <option disabled style={{ fontWeight: 'bold' }}>
              --------------------
            </option>
            {['prism', 'pyramid', 'frustum']
              .map(x => [x, x === props.figureType])
              .map(ResolveOptionRow)}
            <option disabled style={{ fontWeight: 'bold' }}>
              --------------------
            </option>
            {['sphere', 'platonicSolid']
              .map(x => [x, x === props.figureType])
              .map(ResolveOptionRow)}
          </Form.Control>
        </Form.Group>
      </Form>
      <ResolveInputGroup
        figureType={props.figureType}
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
