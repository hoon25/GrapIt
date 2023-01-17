import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import { useDispatch, useSelector } from 'react-redux';
import { generateUUID } from 'three/src/math/MathUtils';
import { useInput } from '../../../hooks';
import { setTwoDFigure } from '../../../store/TwoDfigureSlice';
import { setTwoDInput } from '../../../store/TwoDInputSlice';
import { MathComponent } from 'mathjax-react';

export default function LineInputGroup({ sendObjectInfo }) {
  const TwoDInput = useSelector(state => state.TwoDInput);
  const TwoDFigureList = useSelector(state => state.TwoDfigure.TwoDfigures);

  const [colorProps, resetColor] = useInput('#ffffff');

  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();
    const newLine = {
      figureId: generateUUID(),
      type: 'Line',
      color: TwoDInput.color,
      firstProps: Number(TwoDInput.firstProps),
      secondProps: Number(TwoDInput.secondProps),
    };
    dispatch(setTwoDFigure.addFigure(newLine));
    dispatch(
      setTwoDInput.resetProps({
        firstProps: '',
        secondProps: '',
        color: '#ffffff',
      }),
    );
    const copy = [...TwoDFigureList, newLine];
    //TODO 한개씩 추가로 나중에 바꾸기
    sendObjectInfo('GRAPH', JSON.stringify(copy));
  };

  return (
    <Form onSubmit={onSubmit}>
      <div className="flex justify-content-between">
        <div className="col-3">
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
        <div className="col-3">
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
        <Form.Control
          onChange={event => {
            dispatch(setTwoDInput.setColor(event.target.value));
          }}
          value={TwoDInput.color}
          type="color"
        />
      </FormGroup>
      <Button variant="primary" type="submit">
        생성
      </Button>
    </Form>
  );
}
