import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import { useDispatch, useSelector } from 'react-redux';
import { generateUUID } from 'three/src/math/MathUtils';
import { useInput } from '../../../hooks';
import { setTwoDFigure } from '../../../store/TwoDfigureSlice';
import { setTwoDInput } from '../../../store/TwoDInputSlice';
import { MathComponent } from 'mathjax-react';
import { CirclePicker } from 'react-color';
import React from 'react';
import GraphColorPicker from '../../common/GraphColorPicker';

export default function LineInputGroup({ sendObjectInfo }) {
  const TwoDInput = useSelector(state => state.TwoDInput);
  const TwoDFigureList = useSelector(state => state.TwoDfigure.TwoDfigures);

  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();

    const UUID = generateUUID();
    const newLine = {
      uniqueId: UUID,
      figureId: UUID,
      type: 'Line',
      color: TwoDInput.color,
      firstProps: Number(TwoDInput.firstProps),
      secondProps: Number(TwoDInput.secondProps),
      thick: 3,
    };
    // dispatch(setTwoDFigure.addFigure(newLine));
    dispatch(
      setTwoDInput.resetProps({
        firstProps: '',
        secondProps: '',
        color: '#f44336',
      }),
    );
    // const copy = [...TwoDFigureList, newLine];
    //TODO 한개씩 추가로 나중에 바꾸기
    sendObjectInfo('GRAPH2D', 'ADD', JSON.stringify(newLine));
  };

  return (
    <Form onSubmit={onSubmit}>
      <div className="flex justify-content-center Line pt-3 pb-3">
        {/*<div className="col-3">*/}
        <MathComponent tex="y = " />
        {/*</div>*/}
        <div className="col-2 ps-1 pe-1">
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
        {/*<div className="col-3">*/}
        <MathComponent tex="x + " />
        {/*</div>*/}
        <div className="col-2 ps-1 pe-1">
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
        <GraphColorPicker color={TwoDInput.color} type={'2D'} />
        <Button
          style={{
            display: 'inline-block',
            float: 'right',
            borderRadius: '10px',
            fontWeight: '800',
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
