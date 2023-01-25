import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import { useDispatch, useSelector } from 'react-redux';
import { generateUUID } from 'three/src/math/MathUtils';
import { useInput } from '../../../hooks';
import { setTwoDFigure } from '../../../store/TwoDfigureSlice';
import { MathComponent } from 'mathjax-react';
import React, { useEffect } from 'react';
import { setTwoDInput } from '../../../store/TwoDInputSlice';
import GraphColorPicker from '../../common/GraphColorPicker';

export default function TwoDInputGroup({ sendObjectInfo }) {
  const TwoDInput = useSelector(state => state.TwoDInput);
  const TwoDFigureList = useSelector(state => state.TwoDfigure.TwoDfigures);
  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();

    const UUID = generateUUID();
    const newTwoD = {
      uniqueId: UUID,
      figureId: UUID,
      type: 'TwoD',
      color: TwoDInput.color,
      firstProps: Number(TwoDInput.firstProps),
      secondProps: Number(TwoDInput.secondProps),
      thirdProps: Number(TwoDInput.thirdProps),
      thick: 3,
    };

    // dispatch(setTwoDFigure.addFigure(newTwoD));
    dispatch(
      setTwoDInput.resetProps({
        firstProps: '',
        secondProps: '',
        color: '#f44336',
      }),
    );
    // const copy = [...TwoDFigureList, newTwoD];
    //TODO 한개씩 추가로 나중에 바꾸기
    sendObjectInfo('GRAPH2D', 'ADD', JSON.stringify(newTwoD));
  };

  return (
    <Form onSubmit={onSubmit}>
      <div className="flex justify-content-between p-0">
        <div className="col-1">
          <MathComponent tex="y = " />
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
        <div className="col-1">
          <MathComponent tex="x^2 + " />
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
          <MathComponent tex="x + " />
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
      </div>
      <FormGroup>
        <GraphColorPicker color={TwoDInput.color} type={'2D'} />
        <Button
          style={{
            display: 'inline-block',
            float: 'right',
            borderRadius: '10px',
          }}
          variant="primary"
          type="submit"
        >
          생성
        </Button>
      </FormGroup>
    </Form>
  );
}
