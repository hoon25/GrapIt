import {
  CartesianCoordinates,
  FunctionGraph,
  Mafs,
  Line,
  Circle,
} from 'mafs';
import 'mafs/build/index.css';
import React, { } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export function TwoDGraph({
  graphList,
  viewPointX,
  viewPointY,
  ratio,
  setRatio,
  sendObjectInfo,
  childWidth,
  childHeight,
}) {

  const store = useSelector((state) => state.graph);

  // todo store 기반으로 변경
  console.log(store)
  // 스크롤 이벤트 제어. 나중에 쓸수 있음.
  function removeWindowWheel() {
    window.addEventListener('wheel', preventWheelEvent, { passive: false });
  }

  function addWindowWheel() {
    window.removeEventListener('wheel', preventWheelEvent, { passive: true });
  }

  function preventWheelEvent(e) {
    e.preventDefault();

    console.log('x = ' + e.deltaX);
    console.log('y = ' + e.deltaY);

    if (e.deltaY % 1 < 0 && e.deltaX === 0) {
      console.log('축소');
      setRatio(ratio - 1);
      console.log('현재 비율' + ratio);
    } else if (e.deltaY % 1 > 0 && e.deltaX === 0) {
      console.log('확대');
      setRatio(ratio + 1);
      console.log('현재 비율' + ratio);
    }
  }

  function mouseMovingHandler(event) {
    // console.log("viewPointX[0] = "+ viewPointX[0])
    // console.log("viewPointX[1] = "+ viewPointX[1])
    // console.log("mousePoint[0] = "+ mousePoint[0])
    // console.log("mousePoint[1] = "+ mousePoint[1])
    // console.log("pageX = "+ event.pageX)
    // console.log((Number(mousePoint[0]) - Number(event.pageX)))
    // console.log((Number(mousePoint[1]) - Number(event.pageX)))
    // let firstX = viewPointX[0] + Math.floor((Number(mousePoint[0]) - Number(event.pageX))/100)
    // let secondX = viewPointX[1] - Math.floor((Number(mousePoint[0]) - Number(event.pageX))/100)
    // console.log(firstX)
    // console.log(secondX)
    // setViewPointX([firstX,secondX])
    // setMousePoint([event.pageX, event.pageY])
  }



  return (
    <div className="test-parent">
      <div className="test-child">
        <Button
          onClick={() => {
            sendObjectInfo('RATIO', ratio - 0.5);
            setRatio(ratio - 0.5);
          }}
        >
          확대
        </Button>
        <Button
          onClick={() => {
            sendObjectInfo('RATIO', ratio + 0.5);
            setRatio(ratio + 0.5);
          }}
        >
          축소
        </Button>
        <div>
          <Form.Range
            value={ratio}
            onChange={e => {
              sendObjectInfo('RATIO', Number(e.target.value));
              setRatio(Number(e.target.value));
            }}
            tooltip="auto"
          />
        </div>
      </div>
      <div
      // onMouseDown={(event) => {
      //     // console.log("마우스 다운")
      //     // console.log("page x = " + event.pageX)
      //     // console.log("page y = " + event.pageY)
      //     setMousePoint([event.pageX, event.pageY])
      //     setMouseMovingEvent(true)
      //     // console.log(canvasGraph)
      //     // console.log(canvasGraph.viewBox)
      //     // console.log(this)
      // }}

      // onMouseMove={(event) => {
      //     if (mouseMovingEvent) {
      //         mouseMovingHandler(event)
      //
      //     }
      // }
      // }

      // onMouseUp={(event) => {
      //     // console.log("마우스 업")
      //     // console.log("page x = " + event.pageX)
      //     // console.log("page y = " + event.pageY)
      //     setMousePoint([event.pageX, event.pageY])
      //     setMouseMovingEvent(false)
      // }}
      >
        <Mafs
          width={childWidth}
          height={childHeight}
          viewBox={{ x: viewPointX, y: viewPointY, padding: ratio }}
        >
          <CartesianCoordinates
            xAxis={{ lines: Math.floor(Math.abs(ratio) / 5) + 1 }}
            yAxis={{ lines: Math.floor(Math.abs(ratio) / 5) + 1 }}
            subdivisions={
              Math.floor(Math.abs(ratio) / 5) + 1 > 5
                ? 5
                : Math.floor(Math.abs(ratio) / 5) + 1
            }
          />
          {graphList.map((graph, index) => resolveGraph(graph, index))}
        </Mafs>
      </div>
    </div>
  );
}


function resolveGraph(graph, index) {
  const [color, type] = graph;
  const [first, second, third] = graph.slice(2, 5).map(Number);

  if (type === 'Line') {
    return (
      <Line.PointAngle
        key={index}
        point={[0, second]}
        color={color}
        angle={Math.atan(first)}
        weight={4}
      />
    );
  }
  else if (type === 'Circle') {
    return (
      <Circle
        key={index}
        center={[first, second]}
        radius={third}
        color={color}
      />
    );
  }
  else if (type === 'TwoD') {
    return (
      <FunctionGraph.OfX
        key={index}
        color={color}
        y={x => {
          const _x = x;
          return first * _x * _x + second * _x + third;
        }} />
    );
  }
}
