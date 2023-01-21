import { Button, Form, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { generateUUID } from 'three/src/math/MathUtils';
// import { figureSlice } from "../../figureSlice";
import { setFigure } from '../../store/figureSlice';
import { useInput } from '../../hooks';

function SphereInputGroup(props) {
  const [positionProps, resetPosition] = useInput('0, 0, 0');
  const [radiusProps, resetRadius] = useInput('');
  const [colorProps, resetColor] = useInput('#000000');

  const figureList = useSelector(state => state.figure.figures);
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    const newFigure = {
      figureId: generateUUID(),
      type: 'sphere',
      color: parseInt('0x' + colorProps.value.slice(1)),
      position: positionProps.value.split(',').map(x => Number(x)),
      radius: Number(radiusProps.value),
    };

    dispatch(setFigure.addFigure(newFigure));

    resetPosition();
    resetRadius();
    resetColor();

    const copy = [...figureList, newFigure];
    //TODO 한개씩 추가로 나중에 바꾸기
    props.sendObjectInfo('FIGURE3D', JSON.stringify(copy));
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
