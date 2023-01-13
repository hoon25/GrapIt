import { useEffect, useState, ReactDOM, useRef, useLayoutEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { TwoDGraph } from './graph/TwoDGraph';
import { GraphTypeButton } from './graph/GraphTypeButton';
import { GraphInputGroup } from './graph/GraphInputGroup';
import SockJs from 'sockjs-client';
import { useOthers, useUpdateMyPresence } from '../config/liveblocks.config';
import Cursor from '../component/Cursor';
import '../css/Rtcchat.css';
import '../css/Canvas.css';
import Canvas from '../routes/Canvas';
import { setIsWhiteBoard } from '../store/isWhiteBoardSlice';

var stompClient = null;

function RtcChat({ chat, userInfo }) {
  let [ratio, setRatio] = useState(1);

  let [graphColor, setGraphColor] = useState('#ffffff');
  let [graphType, setGraphType] = useState('Line');
  let [formulaFirst, setFormulaFirst] = useState('');
  let [formulaSecond, setFormulaSecond] = useState('');
  let [formulaThird, setFormulaThird] = useState('');

  let [viewPointX, setViewPointX] = useState([-5, 5]);
  let [viewPointY, setViewPointY] = useState([-5, 5]);

  let [graphInfo, setGraphInfo] = useState([]);
  let [graphList, setGraphList] = useState([]);

  let [drawInfo, setDrawInfo] = useState();

  const dispatch = useDispatch();
  let isWhiteBoard = useSelector(state => state.isWhiteBoard);

  let graphStyle = {
    height: '100%',
    width: '100%',
    position: 'absolute',
    pointerEvents: isWhiteBoard.isSelected ? 'none' : 'auto',
  };
  let whiteBoardStyle = {
    height: '100%',
    width: '100%',
    position: 'absolute',
    pointerEvents: isWhiteBoard.isSelected ? 'auto' : 'none',
  };

  let mainParent = useRef();
  let [childWidth, setChildWidth] = useState();
  let [childHeight, setChildHeight] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setChildWidth(mainParent.current.clientWidth);
    setChildHeight(mainParent.current.clientHeight);
    setIsLoaded(true);
    // canvasParent.current.appendChild(canvas);
  }, []);

  let tempRef = useRef();
  let [containerInfo, setContainerInfo] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const updateMyPresence = useUpdateMyPresence();
  const userOther = useOthers();

  let user = useSelector(state => state.user);

  window.addEventListener('resize', () => {
    setContainerInfo([window.innerWidth, window.innerHeight]);
  });
  window.addEventListener('resize', () => {
    console.log(window);
  });
  window.addEventListener('orientationchange', () => {
    setContainerInfo([window.innerWidth, window.innerHeight]);
  });

  // 동기화 소켓 통신
  var Stomp = require('stompjs/lib/stomp.js').Stomp;

  useEffect(() => {
    var sock = new SockJs('/sock/ws-stomp');
    stompClient = Stomp.over(sock);
    stompClient.connect({}, () => {
      stompClient.subscribe(
        '/sock/sub/chat/room/' + chat.roomId,
        rerenderGraph,
      );
    });
    // if(stompClient.connected) {
    //     console.log("stompClient connected!!!");
    //     stompClient.send("/pub/chat/enterUser", {},
    //         JSON.stringify({
    //             roomId: chat.roomId,
    //             sender: user.nickName,
    //             type: 'ENTER'
    //         })
    //     )
    // }
  }, []);

  function sendGraphInfo(graph) {
    if (stompClient) {
      stompClient.send(
        '/sock/pub/chat/sendMessage',
        {},
        JSON.stringify({
          roomId: chat.roomId,
          sender: user.nickName,
          message: JSON.stringify(graph),
          type: 'DRAW',
        }),
      );
    }
  }

  function sendPaintInfo(paint) {
    if (stompClient) {
      stompClient.send(
        '/sock/pub/chat/sendMessage',
        {},
        JSON.stringify({
          roomId: chat.roomId,
          sender: user.nickName,
          message: JSON.stringify(paint),
          type: 'DRAW',
        }),
      );
    }
  }

  function sendRatio(ratio) {
    if (stompClient) {
      stompClient.send(
        '/sock/pub/chat/sendMessage',
        {},
        JSON.stringify({
          roomId: chat.roomId,
          sender: user.nickName,
          message: ratio,
          type: 'DRAW_RATIO',
        }),
      );
    }
  }

  // sendGraphInfo()
  function rerenderGraph(payload) {
    const newMessage = JSON.parse(payload.body);

    if (newMessage.sender != user.nickName) {
      if (newMessage.type === 'DRAW_RATIO') {
        setRatio(Number(newMessage.message));
      } else if (newMessage.type === 'DRAW') {
        console.log('👻👻👻👻👻👻👻👻👻👻👻👻');

        let message = JSON.parse(newMessage.message);
        message = JSON.parse(message);

        console.log(message.action === 'remove');
        if (message.action === 'move') {
          console.log('in move');
          setDrawInfo(message.target);
          return;
        } else if (message.action === 'add') {
          console.log('in add');
          setDrawInfo(message.target);
          return;
        } else if (message.action === 'remove') {
          setDrawInfo(message.target);
          return;
        }
        console.log('✊✊✊!!!오지마!!!!✊✊✊');
        if (JSON.parse(newMessage.message).length === 0) {
          setGraphList([]);
        }
        if (newMessage.message !== JSON.stringify(graphList)) {
          setGraphList(JSON.parse(newMessage.message));
        }
      } else if (newMessage.type === 'DRAW_PAINT') {
        // setDrawInfo(newMessage.message);
        // console.log(drawInfo);
      }
    }
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
    <Container
      style={{ height: '100%' }}
      ref={tempRef}
      onPointerMove={e => {
        updateMyPresence({
          cursor: { x: e.clientX, y: e.clientY },
          screenInfo: { width: containerInfo[0], height: containerInfo[1] },
        });
      }}
      onPointerLeave={() =>
        updateMyPresence({ cursor: null, screenInfo: null })
      }
    >
      {userOther.map(({ connectionId, presence }) =>
        presence.cursor ? (
          <Cursor
            key={connectionId}
            name={presence.userInfo.name}
            color={presence.userInfo.color}
            x={
              presence.cursor.x *
              (window.innerWidth / presence.screenInfo.width)
            }
            y={
              presence.cursor.y *
              (window.innerHeight / presence.screenInfo.height)
            }
          />
        ) : null,
      )}
      <Row style={{ height: '100%' }}>
        <Col xs={3} style={{}} className="mt-5">
          <Row style={{ height: '70%' }} className="div-shadow">
            <div style={{ overflowX: 'auto' }}>
              <h4>영상 채팅</h4>
              {/*<Vidu user={user} chat={chat} />*/}
            </div>
          </Row>

          <Row style={{ height: '30%' }}>
            <div style={{ display: '' }} className="div-shadow">
              <h2>그래프 생성기</h2>

              <div>
                <GraphTypeButton
                  graphType={graphType}
                  setGraphType={setGraphType}
                  setGraphColor={setGraphColor}
                />
              </div>
              <div className="mt-3">
                <GraphInputGroup
                  graphColor={graphColor}
                  setGraphColor={setGraphColor}
                  graphType={graphType}
                  setGraphType={setGraphType}
                  formulaFirst={formulaFirst}
                  setFormulaFirst={setFormulaFirst}
                  formulaSecond={formulaSecond}
                  setFormulaSecond={setFormulaSecond}
                  formulaThird={formulaThird}
                  setFormulaThird={setFormulaThird}
                  graphInfo={graphInfo}
                  setGraphInfo={setGraphInfo}
                  graphList={graphList}
                  setGraphList={setGraphList}
                  viewPointX={viewPointX}
                  setViewPointX={setViewPointX}
                  viewPointY={viewPointY}
                  setViewPointY={setViewPointY}
                  sendGraphInfo={sendGraphInfo}
                />
              </div>
            </div>
          </Row>
        </Col>

        <Col xs={9} className="mt-5">
          <div
            ref={mainParent}
            style={{ height: '100%', width: '100%', position: 'relative' }}
          >
            <div style={{ position: 'absolute', bottom: '0px', zIndex: '995' }}>
              <Button
                onClick={() => {
                  if (isWhiteBoard.isSelected) {
                    dispatch(setIsWhiteBoard(false));
                  } else {
                    dispatch(setIsWhiteBoard(true));
                  }
                }}
              >
                모드전환
              </Button>
            </div>
            <div style={graphStyle}>
              {isLoaded ? (
                <TwoDGraph
                  graphList={graphList}
                  viewPointX={viewPointX}
                  viewPointY={viewPointY}
                  ratio={ratio}
                  setRatio={setRatio}
                  sendRatio={sendRatio}
                  childWidth={childWidth}
                  childHeight={childHeight}
                />
              ) : (
                ''
              )}
            </div>
            <div style={whiteBoardStyle}>
              {isLoaded ? (
                <Canvas
                  childWidth={childWidth}
                  childHeight={childHeight}
                  isWhiteBoard={isWhiteBoard}
                  sendPaintInfo={sendPaintInfo}
                  drawInfo={drawInfo}
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default RtcChat;
