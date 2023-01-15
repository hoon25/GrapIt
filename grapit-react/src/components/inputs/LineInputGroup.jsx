import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import { setFigure } from '../../store/figureSlice';
import { useDispatch } from 'react-redux';
import { useInput } from '../../hooks';
import { generateUUID } from 'three/src/math/MathUtils';

function LineInputGroup(props) {
  const [point1Props, resetPoint1] = useInput('');
  const [point2Props, resetPoint2] = useInput('');
  const [colorProps, resetColor] = useInput('#ffffff');

  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    dispatch(
      setFigure.addFigure({
        figureId: generateUUID(),
        type: 'twoPointedLine',
        color: parseInt('0x' + colorProps.value.slice(1)),
        point1: point1Props.value.split(',').map(x => Number(x)),
        point2: point2Props.value.split(',').map(x => Number(x)),
      }),
    );
    resetPoint1();
    resetPoint2();
    resetColor();
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

export default LineInputGroup;
