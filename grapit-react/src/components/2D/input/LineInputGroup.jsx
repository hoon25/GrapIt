import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import { useDispatch, useSelector } from 'react-redux';
import { generateUUID } from 'three/src/math/MathUtils';
import { useInput } from '../../../hooks';
import { setTwoDFigure } from '../../../store/TwoDfigureSlice';

export default function LineInputGroup(props) {
  const [firstProps, resetFirstProps] = useInput('');
  const [secondProps, resetSecondProps] = useInput('');
  const [colorProps, resetColor] = useInput('#ffffff');

  const dispatch = useDispatch();
  let TwoDfigure = useSelector(state => state.TwoDfigure.TwoDfigures);
  const onSubmit = e => {
    e.preventDefault();

    dispatch(
      setTwoDFigure.addFigure({
        figureId: generateUUID(),
        type: 'Line',
        color: colorProps.value,
        firstProps: Number(firstProps.value),
        secondProps: Number(secondProps.value),
      }),
    );
    resetFirstProps();
    resetSecondProps();
    resetColor();
    // useMemo 를 사용해서 point1, point2 를 저장해두고
    // point1, point2 가 바뀔때만 계산하도록 하면 좋을듯

    console.log(TwoDfigure);
  };

  return (
    <Form onSubmit={onSubmit}>
      <div style={{ display: 'flex' }}>
        <div className="col-1">
          <span> y = </span>
        </div>
        <div className="col-3">
          <FormGroup>
            <Form.Control {...firstProps} type="text" placeholder="" />
          </FormGroup>
        </div>
        <div className="col-1">
          <span>x + </span>
        </div>
        <div className="col-3">
          <FormGroup>
            <Form.Control {...secondProps} type="text" placeholder="상수" />
          </FormGroup>
        </div>
      </div>
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
