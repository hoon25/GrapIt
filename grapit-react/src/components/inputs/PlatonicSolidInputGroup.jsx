import { Button, Form, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { generateUUID } from 'three/src/math/MathUtils';
import { setFigure } from '../../store/figureSlice';
import { useInput } from '../../hooks';

function PlatonicSolidInputGroup(props) {
  const [figureTypeProps, resetFigureType] = useInput('tetrahedron');
  const [positionProps, resetPosition] = useInput('0, 0, 0');
  const [lengthProps, resetLength] = useInput('');
  const [colorProps, resetColor] = useInput('#000000');

  const figureList = useSelector(state => state.figure.figures);
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    const UUID = generateUUID();
    const newFigure = {
      uniqueId: UUID,
      figureId: UUID,
      type: figureTypeProps.value,
      position: positionProps.value.split(',').map(x => Number(x)),
      length: Number(lengthProps.value),
      color: parseInt('0x' + colorProps.value.slice(1)),
    };

    // dispatch(setFigure.addFigure(newFigure));

    resetFigureType();
    resetPosition();
    resetLength();
    resetColor();

    const copy = newFigure;
    //TODO 한개씩 추가로 나중에 바꾸기
    props.sendObjectInfo('FIGURE3D', 'ADD', JSON.stringify(copy));
  };
  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Form.Label>정다면체</Form.Label>
        <Form.Control as="select" {...figureTypeProps}>
          <option value="tetrahedron" selected>
            정사면체
          </option>
          <option value="cube">정육면체</option>
          <option value="octahedron">정팔면체</option>
          <option value="dodecahedron">정십이면체</option>
          <option value="icosahedron">정이십면체</option>
        </Form.Control>
      </FormGroup>
      <FormGroup>
        <Form.Label>중심</Form.Label>
        <Form.Control {...positionProps} type="text" placeholder="x1, y1, z1" />
      </FormGroup>
      <FormGroup>
        <Form.Label>한 변의 길이</Form.Label>
        <Form.Control {...lengthProps} type="text" placeholder="r" />
      </FormGroup>
      <FormGroup>
        <Form.Label>색상</Form.Label>
        <Form.Control {...colorProps} type="color" />
      </FormGroup>
      <Button variant="primary" type="submit">
        생성
      </Button>
    </Form>
  );
}

export default PlatonicSolidInputGroup;
