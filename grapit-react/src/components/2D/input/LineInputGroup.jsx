import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import { useDispatch, useSelector } from 'react-redux';
import { generateUUID } from 'three/src/math/MathUtils';
import { useInput } from '../../../hooks';
import { setTwoDFigure } from '../../../store/TwoDfigureSlice';
import { MathComponent } from 'mathjax-react';
import { setTwoDInput } from '../../../store/TwoDInputSlice';

export default function LineInputGroup(props) {
  const TwoDInput = useSelector(state => state.TwoDInput);

  // const [firstProps, resetFirstProps] = useInput('');
  // const [secondProps, resetSecondProps] = useInput('');
  const [colorProps, resetColor] = useInput('#ffffff');

  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();

    dispatch(
      setTwoDFigure.addFigure({
        figureId: generateUUID(),
        type: 'Line',
        color: TwoDInput.color,
        firstProps: Number(TwoDInput.firstProps),
        secondProps: Number(TwoDInput.secondProps),
      }),
    );
    // resetFirstProps();
    // resetSecondProps();
    // resetColor();
    dispatch(
      setTwoDInput.resetProps({
        firstProps: '',
        secondProps: '',
        color: '#ffffff',
      }),
    );
  };

  return (
    <Form onSubmit={onSubmit}>
      <div className="flex justify-content-between">
        <div className="col-1">
          <MathComponent tex="y = " />
        </div>
        <div className="col-3">
          <FormGroup>
            <Form.Control
              onChange={event => {
                dispatch(setTwoDInput.setFirstProps(event.target.value));
              }}
              value={TwoDInput.firstProps}
              type="text"
              placeholder=""
            />
          </FormGroup>
        </div>
        <div className="col-1">
          <MathComponent tex="x + " />
        </div>
        <div className="col-3">
          <FormGroup>
            <Form.Control
              onChange={event => {
                dispatch(setTwoDInput.setSecondProps(event.target.value));
              }}
              value={TwoDInput.secondProps}
              type="text"
              placeholder=""
            />
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
