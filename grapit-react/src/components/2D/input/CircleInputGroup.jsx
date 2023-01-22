import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import { useDispatch, useSelector } from 'react-redux';
import { generateUUID } from 'three/src/math/MathUtils';
import { useInput } from '../../../hooks';
import { setTwoDFigure } from '../../../store/TwoDfigureSlice';
import { MathComponent } from 'mathjax-react';
import { setTwoDInput } from '../../../store/TwoDInputSlice';

export default function CircleInputGroup({ sendObjectInfo }) {
  const TwoDInput = useSelector(state => state.TwoDInput);
  const TwoDFigureList = useSelector(state => state.TwoDfigure.TwoDfigures);
  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();

    const newCircle = {
      figureId: generateUUID(),
      type: 'Circle',
      color: TwoDInput.color,
      firstProps: Number(TwoDInput.firstProps),
      secondProps: Number(TwoDInput.secondProps),
      thirdProps: Number(TwoDInput.thirdProps),
    };

    dispatch(setTwoDFigure.addFigure(newCircle));
    dispatch(
      setTwoDInput.resetProps({
        firstProps: '',
        secondProps: '',
        color: '#ffffff',
      }),
    );

    const copy = [...TwoDFigureList, newCircle];
    //TODO 한개씩 추가로 나중에 바꾸기
    sendObjectInfo('GRAPH', '', JSON.stringify(copy));
  };

  return (
    <Form onSubmit={onSubmit}>
      <div className="flex justify-content-between p-0">
        <div className="col-1">
          <MathComponent tex="(y-" />
        </div>
        <div className="col-2">
          <FormGroup>
            <Form.Control
              onChange={event => {
                dispatch(setTwoDInput.setFirstProps(event.target.value));
              }}
              value={TwoDInput.firstProps}
              type="number"
              placeholder=""
            />
          </FormGroup>
        </div>
        <div className="col-3">
          <MathComponent tex=")^2+(x-" />
        </div>
        <div className="col-2">
          <FormGroup>
            <Form.Control
              onChange={event => {
                dispatch(setTwoDInput.setSecondProps(event.target.value));
              }}
              value={TwoDInput.secondProps}
              type="number"
              placeholder=""
            />
          </FormGroup>
        </div>
        <div className="col-1">
          <MathComponent tex=")^2 = " />
        </div>
        <div className="col-2">
          <FormGroup>
            <Form.Control
              onChange={event => {
                dispatch(setTwoDInput.setThirdProps(event.target.value));
              }}
              value={TwoDInput.thirdProps}
              type="number"
              placeholder=""
            />
          </FormGroup>
        </div>
        <div className="col-1">
          <MathComponent tex="^2" />
        </div>
      </div>
      <FormGroup>
        <Form.Label>색상</Form.Label>
        <Form.Control
          style={{ display: 'inline-block' }}
          onChange={event => {
            dispatch(setTwoDInput.setColor(event.target.value));
          }}
          value={TwoDInput.color}
          type="color"
        />
        <Button
          style={{ display: 'inline-block', float: 'right' }}
          variant="primary"
          type="submit"
        >
          생성
        </Button>
      </FormGroup>
    </Form>
  );
}
