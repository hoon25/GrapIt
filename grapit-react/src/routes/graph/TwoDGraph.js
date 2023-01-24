import { Debug, Plot, Mafs, Line, Circle, Coordinates } from 'mafs';
import '../../css/Button3D.css';
import '../../css/TwoDGraph.css';
import '../../css/TwoDGraph.css';
import { Form } from 'react-bootstrap';
import { ZoomIn, ZoomOut } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { useEffect, useRef, useState } from 'react';

export function TwoDGraph({
  mover,
  setMover,
  viewPointX,
  viewPointY,
  setViewPointY,
  setViewPointX,
  ratio,
  setRatio,
  sendObjectInfo,
  childWidth,
  childHeight,
}) {
  const [openController, setOpenController] = useState(false);
  const TwoDgraphList = useSelector(state => state.TwoDfigure.TwoDfigures);
  // todo store 기반으로 변경
  // 스크롤 이벤트 제어. 나중에 쓸수 있음.
  const user = useSelector(state => state.user);

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

  useEffect(() => {
    console.log(viewPointX, viewPointY, ratio);
  }, [viewPointX, viewPointY]);

  // function mouseMovingHandler(event) {
  //   console.log('viewPointX[0] = ' + viewPointX[0]);
  //   console.log('viewPointX[1] = ' + viewPointX[1]);
  //   console.log('mousePoint[0] = ' + mousePoint[0]);
  //   console.log('mousePoint[1] = ' + mousePoint[1]);
  //   console.log('pageX = ' + event.pageX);
  //   console.log(Number(mousePoint[0]) - Number(event.pageX));
  //   console.log(Number(mousePoint[1]) - Number(event.pageX));
  //   let firstX =
  //     viewPointX[0] +
  //     Math.floor((Number(mousePoint[0]) - Number(event.pageX)) / 100);
  //   let secondX =
  //     viewPointX[1] -
  //     Math.floor((Number(mousePoint[0]) - Number(event.pageX)) / 100);
  //   console.log(firstX);
  //   console.log(secondX);
  //   setViewPointX([firstX, secondX]);
  //   setMousePoint([event.pageX, event.pageY]);
  // }

  const mafsContainer = useRef();

  let translateY;
  let translateX;
  let rangeX;
  let rangeY;

  const [isLoaded, setIsLoaded] = useState(false);
  const [stringX, setStringX] = useState('x: (-8.94,8,94)');
  const [stringY, setStringY] = useState('y: (-6.00,6.00)');
  const [mafsView, setMafsView] = useState(undefined);
  const [isEvent, setIsEvent] = useState(false);
  const mouseDownHandler = () => {
    setIsEvent(true);
    setMover(user.nickName);
    setMafsView(document.getElementsByClassName('MafsView')[0]);
  };

  const mouseUpHandler = () => {
    // mafsContainer.current.blur();
    mafsView.blur();
    setIsEvent(false);
    setMover(null);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isEvent) {
      console.log('setEvent true');
      mafsContainer.current.addEventListener('mousemove', mouseMovingHandler);
    } else {
      console.log('setEvent false');
      mafsContainer.current.removeEventListener(
        'mousemove',
        mouseMovingHandler,
      );
    }
  }, [isEvent]);
  const mouseMovingHandler = () => {
    if (isEvent) {
      setMover(user.nickName);
      setStringX(mafsView.children[0].children[0].children[0].innerHTML);
      setStringY(mafsView.children[0].children[0].children[1].innerHTML);
    }
  };

  useEffect(() => {
    if (isLoaded && isEvent && mover === user.nickName) {
      translateX = stringX.match(/x: \((-?\d+\.\d+), (-?\d+\.\d+)\)/);
      translateY = stringY.match(/y: \((-?\d+\.\d+), (-?\d+\.\d+)\)/);
      rangeX = [
        Math.round(parseFloat(translateX[1]) * 1000) / 1000,
        Math.round(parseFloat(translateX[2]) * 1000) / 1000,
      ];
      rangeY = [
        Math.round(parseFloat(translateY[1]) * 1000) / 1000,
        Math.round(parseFloat(translateY[2]) * 1000) / 1000,
      ];
      if (rangeX !== undefined && rangeY !== undefined) {
        sendObjectInfo(
          'CAMERA2D',
          '',
          JSON.stringify({
            mover: user.nickName,
            ratio: ratio,
            rangeX: rangeX,
            rangeY: rangeY,
          }),
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
            style={{ position: 'relative' }}
            onClick={() => {
              sendObjectInfo('RATIO2D', '', ratio === 0 ? 0 : ratio - 0.5);
              setRatio(ratio === 0 ? 0 : ratio - 0.5);
            }}
          >
            <ZoomIn />
          </div>
          <div
            className="button-3d mt-3"
            onClick={() => {
              sendObjectInfo('RATIO2D', '', ratio + 0.5);
              setRatio(ratio + 0.5);
            }}
          >
            <ZoomOut />
          </div>
        </div>
        <div className="ratio-slider-container">
          <Form.Range
            className="ratio-slider"
            value={ratio}
            onChange={e => {
              sendObjectInfo('RATIO2D', '', Number(e.target.value));
              setRatio(Number(e.target.value));
            }}
            tooltip="auto"
          />
        </div>
      </div>
      <div>
        <div
          ref={mafsContainer}
          onMouseDown={mouseDownHandler}
          onMouseUp={mouseUpHandler}
        >
          <Mafs
            width={childWidth}
            height={childHeight}
            viewBox={{ x: viewPointX, y: viewPointY, padding: ratio }}
          >
            <Debug.ViewportInfo
            // precision={2}
            />
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
