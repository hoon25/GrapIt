import {useEffect, useState, ReactDOM, useRef, useLayoutEffect} from "react";
import {Button, Col, Container, Form, InputGroup, Row, Tab, Tabs} from 'react-bootstrap';

import {useSelector} from "react-redux";
import {TwoDGraph} from "./graph/TwoDGraph"
import GraphList from "./graph/GraphList";
import {GraphTypeButton} from "./graph/GraphTypeButton";
import {GraphInputGroup} from "./graph/GraphInputGroup";
import SockJs from "sockjs-client";
import {Tldraw} from "@tldraw/tldraw";
import {useOthers, useOthersMapped, useUpdateMyPresence} from "../config/liveblocks.config";
import Cursor from "../component/Cursor";
import '../css/Rtcchat.css';

var stompClient = null;

function RtcChat({chat, userInfo}) {

    let [ratio, setRatio] = useState(1)

    let [graphColor, setGraphColor] = useState("#ffffff");
    let [graphType, setGraphType] = useState("Line");
    let [formulaFirst, setFormulaFirst] = useState("");
    let [formulaSecond, setFormulaSecond] = useState("");
    let [formulaThird, setFormulaThird] = useState("");

    let [viewPointX, setViewPointX] = useState([-5, 5])
    let [viewPointY, setViewPointY] = useState([-5, 5])

    let [graphInfo, setGraphInfo] = useState([]);
    let [graphList, setGraphList] = useState([]);

    const updateMyPresence = useUpdateMyPresence();
    const userOther = useOthers();

    let user = useSelector(state => state.user);

    // 동기화 소켓 통신
    var Stomp = require('stompjs/lib/stomp.js').Stomp;

    useEffect(() => {
        var sock = new SockJs('/ws-stomp');
        stompClient = Stomp.over(sock);
        stompClient.connect({}, () => {
            stompClient.subscribe('/sub/chat/room/' + chat.roomId, rerenderGraph)
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

    useEffect(() => {
    }, [graphList])

    function sendGraphInfo(graphList) {
        if (stompClient) {
            stompClient.send("/pub/chat/sendMessage", {},
                JSON.stringify({
                    roomId: chat.roomId,
                    sender: user.nickName,
                    message: JSON.stringify(graphList),
                    type: 'DRAW'
                })
            )
        }
    }

    function sendRatio(ratio) {
        if (stompClient) {
            stompClient.send("/pub/chat/sendMessage", {},
                JSON.stringify({
                    roomId: chat.roomId,
                    sender: user.nickName,
                    message: ratio,
                    type: 'DRAW_RATIO'
                })
            )
        }
    }

    // sendGraphInfo()
    function rerenderGraph(payload) {
        let newMessage = JSON.parse(payload.body);
        if (newMessage.sender != user.nickName) {
            if (newMessage.type === "DRAW_RATIO") {
                setRatio(Number(newMessage.message))
            } else {
                console.log(newMessage.message)
                if (JSON.parse(newMessage.message).length === 0) {
                    setGraphList([])
                }
                if (newMessage.message !== JSON.stringify(graphList)) {
                    setGraphList(JSON.parse(newMessage.message))
                }

            }
        }
    }

    //=====================================================


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // Do something when the Enter key is pressed
        }
    };

    const handler = (event) => {
        event.preventDefault();
    };

    const scrollHandler = (event) => {
        event.preventDefault();
        console.log("스크롤링 ")
        console.log(event)
    }

    return (

        <Container style={{height: '100%'}}
            onPointerMove={(e) =>
                updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } }
                )}
            onPointerLeave={() => updateMyPresence({ cursor: null })}
        >

            {userOther.map(({ connectionId, presence }) =>
                presence.cursor ? (
                    <Cursor
                        key={connectionId}
                        name={presence.userInfo.name}
                        color={presence.userInfo.color}
                        x={presence.cursor.x}
                        y={presence.cursor.y}
                    />
                ) : null
            )}
            <Row style={{height: '100%'}}>
                <Col xs={3} style={{}} className='mt-5'>
                    <Row style={{height: '70%'}} className='div-shadow'>
                        <div style={{overflowX: "auto"}}>
                            <h4>영상 채팅</h4>
                        </div>
                    </Row>

                    <Row style={{height: "30%"}}>

                        <div style={{display: ""}} className='div-shadow'>

                            <h2>그래프 생성기</h2>

                            <div>
                                <GraphTypeButton graphType={graphType} setGraphType={setGraphType}
                                                 setGraphColor={setGraphColor}/>
                            </div>
                            <div className='mt-3'>
                                <GraphInputGroup graphColor={graphColor} setGraphColor={setGraphColor}
                                                 graphType={graphType} setGraphType={setGraphType}
                                                 formulaFirst={formulaFirst} setFormulaFirst={setFormulaFirst}
                                                 formulaSecond={formulaSecond} setFormulaSecond={setFormulaSecond}
                                                 formulaThird={formulaThird} setFormulaThird={setFormulaThird}
                                                 graphInfo={graphInfo} setGraphInfo={setGraphInfo}
                                                 graphList={graphList} setGraphList={setGraphList}
                                                 viewPointX={viewPointX} setViewPointX={setViewPointX}
                                                 viewPointY={viewPointY} setViewPointY={setViewPointY}
                                                 sendGraphInfo={sendGraphInfo}
                                />
                            </div>
                        </div>
                    </Row>

                </Col>

                <Col xs={9} className='mt-5'>
                    <div style={{height: "100%"}}>
                        <Tabs
                            defaultActiveKey="home"
                            transition={false}
                            id="noanim-tab-example"
                            className="mb-3 tab_bar">

                            <Tab className="" eventKey="home" title="2D그래프" style={{}}>
                                <Col style={{height: "100%"}}>
                                    <Row style={{height: "70%"}}>
                                        <TwoDGraph roomId={chat.roomId} stompClient={stompClient}
                                                   graphList={graphList} viewPointX={viewPointX}
                                                   viewPointY={viewPointY} setViewPointX={setViewPointX}
                                                   setViewPointY={setViewPointY} ratio={ratio} setRatio={setRatio}
                                                   sendRatio={sendRatio}/>
                                    </Row>
                                    <Row className='div-shadow' style={{height: "30%", overflowY: "auto"}}>
                                        <div>
                                            <h4>그래프 리스트</h4>
                                            <GraphList graphList={graphList} setGraphList={setGraphList}
                                                       sendGraphInfo={sendGraphInfo}/>
                                        </div>
                                    </Row>
                                </Col>
                            </Tab>
                            <Tab className="" eventKey="profile" title="화이트보드" style={{position: "relative"}}>
                                <Tldraw
                                    disableAssets={false}
                                />
                            </Tab>
                        </Tabs>
                    </div>
                </Col>

            </Row>
        </Container>
    );
}


export default RtcChat;
