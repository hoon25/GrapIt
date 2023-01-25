import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import { setFigure } from '../../store/figureSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../../hooks';
import { generateUUID } from 'three/src/math/MathUtils';
import GraphColorPicker from '../common/GraphColorPicker';
import { useState } from 'react';

function LineInputGroup(props) {
  const [point1Props, resetPoint1] = useInput('0, 0, 0');
  const [point2Props, resetPoint2] = useInput('');
  // const [colorProps, resetColor, setColor] = useInput('#ffffff');
  const [colorProps, setColorProps] = useState('#9e9e9e');

  const figureList = useSelector(state => state.figure.figures);
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    const UUID = generateUUID();
    const newFigure = {
      uniqueId: UUID,
      figureId: UUID,
      type: 'twoPointedLine',
      color: parseInt('0x' + colorProps.slice(1)),
      point1: point1Props.value.split(',').map(x => Number(x)),
      point2: point2Props.value.split(',').map(x => Number(x)),
    };

    // dispatch(setFigure.addFigure(newFigure));

    resetPoint1();
    resetPoint2();
    setColorProps('#9e9e9e');
    // resetColor();

    const copy = newFigure;
    //TODO 한개씩 추가로 나중에 바꾸기
    props.sendObjectInfo('FIGURE3D', 'ADD', JSON.stringify(copy));
    // useMemo 를 사용해서 point1, point2 를 저장해두고
    // point1, point2 가 바뀔때만 계산하도록 하면 좋을듯
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Form.Label>점 1</Form.Label>
        <Form.Control {...point1Props} type="text" placeholder="x1, y1, z1" />
      </FormGroup>
      <FormGroup>
        <Form.Label>점 2</Form.Label>
        <Form.Control {...point2Props} type="text" placeholder="x2, y2, z2" />
      </FormGroup>
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

export default LineInputGroup;
