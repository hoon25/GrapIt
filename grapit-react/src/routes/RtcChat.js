import {useEffect, useState,ReactDOM, useRef, useLayoutEffect} from "react";
import {Button, Col, Container, Form, InputGroup, Row, Tab, Tabs} from 'react-bootstrap';

import styled from 'styled-components'
import {useSelector} from "react-redux";
import '../css/Rtcchat.css';
import {TwoDGraph} from "./graph/TwoDGraph"
import Canvas from "./Canvas";
import GraphList from "./graph/GraphList";
import {GraphTypeButton} from "./graph/GraphTypeButton";
import {LineInputGroup} from "./graph/LineInputGroup";

var Stomp = require('stompjs/lib/stomp.js').Stomp;


let ChatInput = styled(InputGroup)`
    //position: fixed;
    bottom: 0;
`
var stompClient = null;

function RtcChat({chat}) {
    let [contents, setContents] = useState([]);
    let [messageInput, setMessageInput] = useState("");
    let [drawPoints,setDrawPoints] = useState(null);

    let [graphType, setGraphType] = useState("Line");
    let [gradient , setGradient] = useState("");
    let [YPoint , setYPoint] = useState("");
    let [graphColor,setGraphColor] = useState("#ffffff");

    let [graphInfo,setGraphInfo] = useState([]);
    let [graphList,setGraphList] = useState([]);

    let user = useSelector(state => state.user);


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // Do something when the Enter key is pressed
        }
    };

    const handler = (event) => {
       event.preventDefault();
    };

    const scrollHandler = (event) =>{
        event.preventDefault();
        console.log("스크롤링 ")
        console.log(event)
    }


    return (

        <Container style={{height: '100%'}}>
            <Row style={{height:'100%'}}>
                <Col xs={3} style={{}} className='mt-5'>
                    <Row style={{height: '70%'}} className='div-shadow'>
                        <div style={{overflowX: "auto"}}>
                            <h4>영상 채팅</h4>
                        </div>
                    </Row>

                    <Row style={{height:"30%"}}>
                        <div style={{display: ""}} className='div-shadow'>
                            <div>
                                <GraphTypeButton graphType={graphType} setGraphType={setGraphType}/>
                            </div>
                            <div>
                                <LineInputGroup gradient={gradient} setGradient={setGradient}
                                                YPoint={YPoint} setYPoint={setYPoint}
                                                graphColor={graphColor} setGraphColor={setGraphColor}
                                                graphInfo={graphInfo} setGraphInfo={setGraphInfo}
                                                graphType={graphType} setGraphType={setGraphType}
                                                graphList={graphList} setGraphList={setGraphList}
                                />
                            </div>


                        </div>
                    </Row>

                </Col>

                <Col xs={9} className='mt-5'>
                    <div style={{height:"100%"}}>
                        <Tabs
                            defaultActiveKey="home"
                            transition={false}
                            id="noanim-tab-example"
                            className="mb-3 tab_bar">

                            <Tab className="" eventKey="home" title="2D그래프">
                                <Col style={{height:"100%"}}>
                                    <div style={{height:"70%"}}>
                                        <TwoDGraph roomId={chat.roomId} stompClient={stompClient} graphList={graphList}/>
                                    </div>
                                    <div className='div-shadow' style={{height:"30%",overflowY:"auto"}}>
                                        <div>
                                            <h4>그래프 리스트</h4>
                                        </div>
                                        <div>
                                            <GraphList graphList={graphList} setGraphList={setGraphList}/>
                                        </div>
                                    </div>
                                </Col>
                            </Tab>
                            <Tab className="" eventKey="profile" title="화이트보드">
                                <Canvas/>
                            </Tab>
                        </Tabs>
                    </div>
                </Col>

            </Row>
        </Container>
    );
}


export default RtcChat;
