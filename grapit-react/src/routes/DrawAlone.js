import { useEffect, useState, ReactDOM, useRef, useLayoutEffect } from 'react';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../css/Rtcchat.css';
import '../css/Canvas.css';
import Canvas from '../components/Canvas';
import { TwoDGraph } from './graph/TwoDGraph';
import SockJs from 'sockjs-client';
import { useOthers, useUpdateMyPresence } from '../config/liveblocks.config';
import Cursor from '../components/Cursor';
import Vidu from './vidu/Vidu';
import ThreeDimensionCanvas from '../components/ThreeDimensionCanvas';
import CoordTypeSelector from '../components/CoordTypeSelector';
import ThreeDimensionSideBar from '../components/ThreeDimensionSideBar';
import TwoDimensionSideBar from '../components/2D/TwoDimensionSideBar';
import Problem from '../components/problem/Problem';
import TwoDfigure, { setTwoDFigure } from '../store/TwoDfigureSlice';
import { setFigure } from '../store/figureSlice';
import ProblemSideBar from '../components/problem/ProblemSideBar';

var stompClient = null;

function DrawAlone() {
  const [ratio, setRatio] = useState(1);
  // viewPoint 초기값
  const [viewPointX, setViewPointX] = useState([-7, 7]);
  const [viewPointY, setViewPointY] = useState([-7, 7]);
  const [drawInfo, setDrawInfo] = useState();
  const [coordType, setCoordType] = useState('problem');

  const [threeCamera, setThreeCamera] = useState({});
  const [figureList, setFigureList] = useState([]);

  const dispatch = useDispatch();
  const isWhiteBoard = useSelector(state => state.isWhiteBoard);
  const towDFigureList = useSelector(state => state.TwoDfigure.TwoDfigures);

  const commonCanvasStyle = {
    height: '100%',
    width: '100%',
    position: 'absolute',
  };

  const graphStyle = {
    ...commonCanvasStyle,
    pointerEvents: isWhiteBoard.isSelected ? 'none' : 'auto',
    zIndex: 10,
  };

  const whiteBoardStyle = {
    ...commonCanvasStyle,
    // pointerEvents: isWhiteBoard.isSelected ? 'auto' : 'none',
  };

  const mainParent = useRef();
  const [childWidth, setChildWidth] = useState();
  const [childHeight, setChildHeight] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setChildWidth(mainParent.current.clientWidth);
    setChildHeight(mainParent.current.clientHeight);
    setIsLoaded(true);
    // canvasParent.current.appendChild(canvas);
  }, []);

  const [containerInfo, setContainerInfo] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const user = useSelector(state => state.user);

  window.addEventListener('orientationchange', () => {
    setContainerInfo([window.innerWidth, window.innerHeight]);
  });

  function sendObjectInfo(objectType, object) {}

  return (
    <>
      <Container
        fluid
        style={{ height: '100%' }}
        // ref={tempRef}
      >
        <Row style={{ height: '100%' }}>
          <Col xs={9}>
            <div
              ref={mainParent}
              style={{ height: '100%', width: '100%', position: 'relative' }}
            >
              <div
                style={{ position: 'absolute', bottom: '0px', zIndex: '995' }}
              ></div>

              {coordType === 'problem' ? (
                <div style={graphStyle}>
                  <Problem />
                </div>
              ) : coordType === '2D' ? (
                <div style={graphStyle}>
                  {isLoaded ? (
                    <TwoDGraph
                      viewPointX={viewPointX}
                      viewPointY={viewPointY}
                      ratio={ratio}
                      setRatio={setRatio}
                      sendObjectInfo={sendObjectInfo}
                      childWidth={childWidth}
                      childHeight={childHeight}
                    />
                  ) : (
                    ''
                  )}
                </div>
              ) : (
                <div style={graphStyle}>
                  <ThreeDimensionCanvas
                    sendObjectInfo={sendObjectInfo}
                    threeCamera={threeCamera}
                    figureList={figureList}
                    setThreeCamera={setThreeCamera}
                    setFigureList={setFigureList}
                  />
                </div>
              )}

              <div style={whiteBoardStyle}>
                {isLoaded ? (
                  <Canvas
                    childWidth={childWidth}
                    childHeight={childHeight}
                    sendPaintInfo={sendObjectInfo}
                    drawInfo={drawInfo}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
          </Col>

          <Col xs={3} style={{ background: '' }} className="">
            <CoordTypeSelector
              coordType={coordType}
              setCoordType={setCoordType}
            />
            <Row>
              {coordType === 'problem' ? (
                <ProblemSideBar />
              ) : coordType === '2D' ? (
                <TwoDimensionSideBar
                  viewPointX={viewPointX}
                  viewPointY={viewPointY}
                  sendObjectInfo={sendObjectInfo}
                />
              ) : (
                <ThreeDimensionSideBar sendObjectInfo={sendObjectInfo} />
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DrawAlone;
