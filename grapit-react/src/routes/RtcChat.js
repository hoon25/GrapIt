import { useEffect, useState, ReactDOM, useRef, useLayoutEffect } from 'react';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../css/Rtcchat.css';
import '../css/Canvas.css';
import Canvas from '../components/Canvas';
import { TwoDGraph } from './graph/TwoDGraph';
import SockJs from 'sockjs-client';
import Vidu from './vidu/Vidu';
import ThreeDimensionCanvas from '../components/ThreeDimensionCanvas';
import CoordTypeSelector from '../components/CoordTypeSelector';
import ThreeDimensionSideBar from '../components/ThreeDimensionSideBar';
import TwoDimensionSideBar from '../components/2D/TwoDimensionSideBar';
import Problem from '../components/problem/Problem';
import TwoDfigure, { setTwoDFigure } from '../store/TwoDfigureSlice';
import { setFigure } from '../store/figureSlice';
import ProblemSideBar from '../components/problem/ProblemSideBar';
import { changeIsWhiteBoard } from '../store/isWhiteBoardSlice';
import { useLocation } from 'react-router-dom';
import Loading from '../components/common/Loading';
import { setCamera } from '../components/threeJsCamera';


var stompClient = null;

function RtcChat({ chat }) {
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

  const location = useLocation();

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
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setChildWidth(mainParent.current.clientWidth);
    setChildHeight(mainParent.current.clientWidth / 1.49);
    sockjs_conn();
    setIsLoaded(true);
    // canvasParent.current.appendChild(canvas);
    return () => {
      dispatch(changeIsWhiteBoard.setIsWhiteBoard(false));
      setIsConnected(false);
      stompClient.disconnect();
    };
  }, []);

  const [containerInfo, setContainerInfo] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const user = useSelector(state => state.user);

  // window.addEventListener('resize', () => {
  //   setContainerInfo([window.innerWidth, window.innerHeight]);
  //   // setChildWidth(mainParent.current.clientWidth);
  //   // setChildHeight(mainParent.current.clientHeight);
  // });
  window.addEventListener('orientationchange', () => {
    setContainerInfo([window.innerWidth, window.innerHeight]);
  });

  // 동기화 소켓 통신
  const Stomp = require('stompjs/lib/stomp.js').Stomp;

  const sockjs_conn = function () {
    // socket 접속로직
    const socket = new SockJs('/sock/ws-stomp');
    // stomp 연결로직
    stompClient = Stomp.over(socket);
    stompClient.connect(
      { reconnect_delay: 5000 },
      frame => {
        if (stompClient.connected) {
          stompClient.subscribe(
            // '/sock/sub/chat/room/' + chat.roomId,
            '/sock/sub/chat' + location.pathname,
            rerenderGraph,
          );
          setIsConnected(true);
          console.log('stompClient connect success');
          stompClient.send(
            '/sock/pub/chat/enterUser',
            {},
            JSON.stringify({
              roomId: location.pathname.replace(/\D/g, ''),
              sender: user.nickName,
              type: 'ENTER',
            }),
          );
        } else {
          console.log('Failed to connect, retrying...');
        }
      },
      () => {
        setIsConnected(false);
        console.log('stompClient disconnected, connect retrying...');
        sockjs_conn();
      },
    );
  };

  function sendObjectInfo(objectType, method, object) {
    if (stompClient) {
      stompClient.debug = null;
      stompClient.send(
        '/sock/pub/chat/sendMessage',
        {},
        JSON.stringify({
          roomId: location.pathname.replace(/\D/g, ''),
          sender: user.nickName,
          data: object,
          type: objectType,
          method: method,
        }),
      );
    }
  }

  // sendGraphInfo()
  function rerenderGraph(payload) {
    const newMessage = JSON.parse(payload.body);
    switch (newMessage.type) {
      case 'PAINT':
        if (newMessage.sender !== user.nickName) {
          setDrawInfo(JSON.parse(newMessage.data));
        }
        break;
      case 'FIGURE3D':
        dispatch(setFigure.switchFigure(newMessage.data));
        break;
      case 'CAMERA3D':
        if (newMessage.sender !== user.nickName) {
          const newCamera = JSON.parse(newMessage.data);
          setCamera(newCamera)
        }
        break;
      case 'GRAPH2D':
        dispatch(setTwoDFigure.switchFigure(newMessage.data));
        break;
      case 'RATIO2D':
        if (newMessage.sender !== user.nickName) {
          setRatio(Number(newMessage.data));
        }
        break;
      case 'ENTER':
        dispatch(setTwoDFigure.switchFigure(newMessage.data.graph2D));
        dispatch(setFigure.switchFigure(newMessage.data.figure3D));
        break;
      default:
        break;
    }

    // if (newMessage.sender !== user.nickName) {
    //   if (newMessage.type === 'RATIO') {
    //     setRatio(Number(newMessage.data));
    //   } else if (newMessage.type === 'PAINT') {
    //     setDrawInfo(JSON.parse(newMessage.data));
    //   } else if (newMessage.type === 'GRAPH') {
    //     const receivedGraphInfo = JSON.parse(newMessage.data);
    //
    //     if (receivedGraphInfo.length === 0) {
    //       dispatch(setTwoDFigure.switchFigure([]));
    //     }
    //     if (newMessage.message !== JSON.stringify(towDFigureList)) {
    //       dispatch(setTwoDFigure.switchFigure(receivedGraphInfo));
    //     }
    //   } else if (newMessage.type === 'CAMERA') {
    //     setThreeCamera(JSON.parse(newMessage.data));
    //   } else if (newMessage.type === 'FIGURE') {
    //     const receivedFigureInfo = JSON.parse(newMessage.data);
    //
    //     if (receivedFigureInfo.length === 0) {
    //       dispatch(setFigure.switchFigure([]));
    //     }
    //     if (newMessage.message !== JSON.stringify(towDFigureList)) {
    //       dispatch(setFigure.switchFigure(receivedFigureInfo));
    //     }
    //   }
    // }
  }

  //=====================================================

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      // Do something when the Enter key is pressed
    }
  };

  const handler = event => {
    event.preventDefault();
  };

  const scrollHandler = event => {
    event.preventDefault();
    console.log('스크롤링 ');
    console.log(event);
  };

  return (
    <>
      <Container
        fluid
        style={{ height: '100%' }}
      // ref={tempRef}
      >
        {isConnected ? null : <Loading isConnected={isConnected} />}
        <Row style={{ height: '100%' }}>
          <Col xs={9}>
            <div
              ref={mainParent}
              style={{ height: '100%', width: '100%', position: 'relative' }}
            >
              {coordType === 'problem' ? (
                <div style={graphStyle}>
                  <Problem />
                </div>
              ) : coordType === '2D' ? (
                <div style={graphStyle}>
                  {isLoaded ? (
                    <TwoDGraph
                      viewPointX={viewPointX}
                      // viewPointY={viewPointY}
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
                  {/* <DataPusher /> */}
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
              <div
                style={{
                  position: 'absolute',
                  // backgroundColor: '#FFDCDC',
                  zIndex: 1000,
                  width: '300px',
                  heigh정t: '200px',
                  right: '0px',
                  bottom: '0px',
                }}
              >
                <Vidu user={user} chat={chat} />
              </div>
            </div>
          </Col>

          <Col xs={3} style={{ background: '' }} className="">
            <CoordTypeSelector
              coordType={coordType}
              setCoordType={setCoordType}
            />
            <Row style={{ flexDirection: 'column' }}>
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

export default RtcChat;
