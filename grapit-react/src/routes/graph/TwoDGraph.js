import { Coordinates, Mafs, Line, Circle, Debug, Plot } from 'mafs';
import '../../css/Button3D.css';
import '../../css/TwoDGraph.css';
import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Dpad, Inboxes, ZoomIn, ZoomOut } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { Leva, useControls } from 'leva';
import ReactDOM from 'react-dom/client';

export function TwoDGraph({
  viewPointX,
  viewPointY,
  ratio,
  setRatio,
  sendObjectInfo,
  childWidth,
  childHeight,
}) {
  const [openController, setOpenController] = React.useState(false);
  const TwoDgraphList = useSelector(state => state.TwoDfigure.TwoDfigures);
  // todo store 기반으로 변경
  // 스크롤 이벤트 제어. 나중에 쓸수 있음.
  function removeWindowWheel() {
    window.addEventListener('wheel', preventWheelEvent, { passive: false });
  }

  function addWindowWheel() {
    window.removeEventListener('wheel', preventWheelEvent, { passive: true });
  }

  function preventWheelEvent(e) {
    e.preventDefault();

    if (e.deltaY % 1 < 0 && e.deltaX === 0) {
      setRatio(ratio - 1);
    } else if (e.deltaY % 1 > 0 && e.deltaX === 0) {
      setRatio(ratio + 1);
    }
  }

  const controller = useRef();
  const debug = useRef();
  const config = useControls({
    x: {
      value: 32,
      min: -50,
      max: 50,
      step: 0.5,
    },
    y: {
      value: 32,
      min: -50,
      max: 50,
      step: 0.5,
    },
  });
  const levaStyle = {
    position: 'fix',
    top: '0',
    left: '0',
  };
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

  const mafsContainer = useRef();

  let mafsView;
  let translateY;
  let translateX;
  let rangeX;
  let rangeY;

  const [isLoaded, setIsLoaded] = useState(false);
  const [stringX, setStringX] = useState('');
  const [stringY, setStringY] = useState('');

  const mouseDownHandler = () => {
    mafsView = document.getElementsByClassName('MafsView')[0];
    window.addEventListener('mousemove', () => {
      setStringX(mafsView.children[0].children[0].children[0].innerHTML);
      setStringY(mafsView.children[0].children[0].children[1].innerHTML);
    });
  };

  useEffect(() => {
    setIsLoaded(true);
    mafsContainer.current.addEventListener('mousedown', mouseDownHandler);
    setIsLoaded(true);
    return () => {};
  }, []);

  useEffect(() => {
    if (isLoaded) {
      translateX = stringX.match(/x: \((-?\d+\.\d+), (-?\d+\.\d+)\)/);
      translateY = stringY.match(/y: \((-?\d+\.\d+), (-?\d+\.\d+)\)/);
      rangeX = [parseFloat(translateX[1]), parseFloat(translateX[2])];
      rangeY = [parseFloat(translateY[1]), parseFloat(translateY[2])];
      if (rangeX !== undefined && rangeY !== undefined) {
        sendObjectInfo(
          'CAMERA2D',
          JSON.stringify({ rangeX: rangeX, rangeY: rangeY }),
        );
      }
    }
  }, [stringX, stringY]);

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          top: '20px',
          left: '10px',
        }}
      >
        <div>
          <div
            className="button-3d"
            onClick={() => {
              sendObjectInfo('RATIO', ratio === 0 ? 0 : ratio - 0.5);
              setRatio(ratio === 0 ? 0 : ratio - 0.5);
            }}
          >
            <ZoomIn />
          </div>
          <div
            className="button-3d mt-3"
            onClick={() => {
              sendObjectInfo('RATIO', ratio + 0.5);
              setRatio(ratio + 0.5);
            }}
          >
            <ZoomOut />
          </div>
          <div
            className="button-3d mt-3"
            onClick={() => {
              setOpenController(!openController);
            }}
          >
            <Dpad />
          </div>
        </div>
        <div className="ratio-slider-container">
          <Form.Range
            className="ratio-slider"
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
        className="Leva-container"
        id="Leva-container"
        style={{
          position: 'absolute',
          bottom: '0px',
          left: '0px',
          zindex: '10000',
        }}
      >
        <Leva fill={true} hidden={!openController} />
      </div>

      <div
        ref={mafsContainer}
        onMouseUp={() => {
          window.removeEventListener('mousemove', mouseMovingHandler);
        }}
      >
        <Mafs
          width={childWidth}
          height={childHeight}
          viewBox={{ x: viewPointX, y: viewPointY, padding: ratio }}
        >
          <Debug.ViewportInfo precision={2} />
          <Coordinates.Cartesian
            xAxis={{ lines: Math.floor(Math.abs(ratio) / 5) + 1 }}
            yAxis={{ lines: Math.floor(Math.abs(ratio) / 5) + 1 }}
            subdivisions={
              Math.floor(Math.abs(ratio) / 5) + 1 > 5
                ? 5
                : Math.floor(Math.abs(ratio) / 5) + 1
            }
          />
          {TwoDgraphList.map((graph, index) => resolveGraph(graph, index))}
        </Mafs>
      </div>
    </div>
  );
}

function resolveGraph(graph, index) {
  const { color, firstProps, secondProps, thirdProps, type, thick } = graph;

  if (type === 'Line') {
    return (
      <Line.PointAngle
        key={index}
        point={[0, secondProps]}
        color={color}
        angle={Math.atan(firstProps)}
        weight={thick}
      />
    );
  } else if (type === 'Circle') {
    return (
      <Circle
        key={index}
        center={[firstProps, secondProps]}
        radius={thirdProps}
        color={color}
        weight={thick}
      />
    );
  } else if (type === 'TwoD') {
    return (
      <Plot.OfX
        key={index}
        color={color}
        weight={thick}
        y={x => {
          const _x = x;
          return firstProps * _x * _x + secondProps * _x + thirdProps;
        }}
      />
    );
  }
}
