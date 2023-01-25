import { Button, Form, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { generateUUID } from 'three/src/math/MathUtils';
import { setFigure } from '../../store/figureSlice';
import { useInput } from '../../hooks';
import { useState } from 'react';
import GraphColorPicker from '../common/GraphColorPicker';

function PlaneInputGroup(props) {
  const [planeTypeProps, resetPlaneType] = useInput('YZ');
  const [offsetProps, resetPosition] = useInput('0');
  // const [colorProps, resetColor] = useInput('#ffffff');
  const [colorProps, setColorProps] = useState('#9e9e9e');

  const figureList = useSelector(state => state.figure.figures);
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    // position={[0, 0, 2]} size={[10, 10, 0.01]} // xy plane
    // position={[0, 2, 0]} size={[10, 0.01, 10]} // xz plane
    // position={[2, 0, 0]} size={[0.01, 10, 10]} // yz plane

    const position =
      planeTypeProps.value === 'YZ'
        ? [Number(offsetProps.value), 0, 0]
        : planeTypeProps.value === 'XZ'
        ? [0, Number(offsetProps.value), 0]
        : [0, 0, Number(offsetProps.value)];

    const size =
      planeTypeProps.value === 'YZ'
        ? [0.01, 10, 10]
        : planeTypeProps.value === 'XZ'
        ? [10, 0.01, 10]
        : [10, 10, 0.01];

    const UUID = generateUUID();
    const newFigure = {
      uniqueId: UUID,
      figureId: UUID,
      type: 'plane',
      position: position,
      size: size,
      radius: 10,
      color: parseInt('0x' + colorProps.slice(1)),
    };

    resetPlaneType();
    resetPosition();
    setColorProps('#9e9e9e');

    const copy = newFigure;
    //TODO 한개씩 추가로 나중에 바꾸기
    props.sendObjectInfo('FIGURE3D', 'ADD', JSON.stringify(copy));
  };
  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Form.Label>평행한 평면</Form.Label>
        <Form.Select as="select" {...planeTypeProps}>
          <option value="YZ" selected>
            YZ 평면
          </option>
          <option value="XZ">XZ 평면</option>
          <option value="XY">XY 평면</option>
        </Form.Select>
      </FormGroup>
      <FormGroup>
        <Form.Label>좌표</Form.Label>
        <Form.Control {...offsetProps} type="text" placeholder="0" />
      </FormGroup>
      {/*<FormGroup>*/}
      {/*  <Form.Label>색상</Form.Label>*/}
      {/*  <Form.Control {...colorProps} type="color" />*/}
      {/*</FormGroup>*/}
      <GraphColorPicker
        type={'3d'}
        color={colorProps}
        setColorProps={setColorProps}
      />
      <Button
        style={{
          display: 'inline-block',
          float: 'right',
          borderRadius: '10px',
          fontWeight: '800',
        }}
        variant="primary"
        type="submit"
      >
        생성
      </Button>
    </Form>
  );
}

export default PlaneInputGroup;
