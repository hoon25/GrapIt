import { Button, Form, FormGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { generateUUID } from 'three/src/math/MathUtils';
// import { figureSlice } from "../../figureSlice";
import { setFigure } from '../../store/figureSlice';
import { useInput } from '../../hooks';

function SphereInputGroup() {
  const [positionProps, resetPosition] = useInput('');
  const [radiusProps, resetRadius] = useInput('');
  const [colorProps, resetColor] = useInput('#000000');

  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    dispatch(
      setFigure.addFigure({
        figureId: generateUUID(),
        type: 'sphere',
        color: parseInt('0x' + colorProps.value.slice(1)),
        position: positionProps.value.split(',').map(x => Number(x)),
        radius: Number(radiusProps.value),
      }),
    );
    resetPosition();
    resetRadius();
    resetColor();
    // useMemo 를 사용해서 point1, point2 를 저장해두고
    // point1, point2 가 바뀔때만 계산하도록 하면 좋을듯
  };
  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Form.Label>중심</Form.Label>
        <Form.Control {...positionProps} type="text" placeholder="x1, y1, z1" />
      </FormGroup>
      <FormGroup>
        <Form.Label>반지름</Form.Label>
        <Form.Control {...radiusProps} type="text" placeholder="r" />
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
export default SphereInputGroup;