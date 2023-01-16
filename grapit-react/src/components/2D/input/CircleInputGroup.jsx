import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import { useDispatch, useSelector } from 'react-redux';
import { generateUUID } from 'three/src/math/MathUtils';
import { useInput } from '../../../hooks';
import { setTwoDFigure } from '../../../store/TwoDfigureSlice';
import { MathComponent } from 'mathjax-react';

export default function QuadraticInputGroup(props) {
  const [firstProps, resetFirstProps] = useInput('');
  const [secondProps, resetSecondProps] = useInput('');
  const [thirdProps, resetThirdProps] = useInput('');
  const [colorProps, resetColor] = useInput('#ffffff');

  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();

    dispatch(
      setTwoDFigure.addFigure({
        figureId: generateUUID(),
        type: 'Circle',
        color: parseInt('0x' + colorProps.value.slice(1)),
        firstProps: Number(firstProps.value),
        secondProps: Number(secondProps.value),
        thirdProps: Number(thirdProps.value),
      }),
    );
    resetFirstProps();
    resetSecondProps();
    resetThirdProps();
    resetColor();
  };

  return (
    <Form onSubmit={onSubmit}>
      <div className="flex justify-content-between p-0">
        <div className="col-1">
          <MathComponent tex="(y-" />
        </div>
        <div className="col-2">
          <FormGroup>
            <Form.Control {...firstProps} type="number" placeholder="" />
          </FormGroup>
        </div>
        <div className="col-3">
          <MathComponent tex=")^2+(x-" />
        </div>
        <div className="col-2">
          <FormGroup>
            <Form.Control {...secondProps} type="number" placeholder="" />
          </FormGroup>
        </div>
        <div className="col-1">
          <MathComponent tex=")^2 = " />
        </div>
        <div className="col-2">
          <FormGroup>
            <Form.Control {...thirdProps} type="number" placeholder="" />
          </FormGroup>
        </div>
        <div className="col-1">
          <MathComponent tex="^2" />
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
