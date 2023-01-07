import {CartesianCoordinates, FunctionGraph, Mafs, Line, Transform, useMovablePoint, vec, Circle} from "mafs"
import "mafs/build/index.css"
import React, {useEffect, useState} from "react";
import {Provider, useDispatch, useSelector} from "react-redux";
import {Button,Form} from "react-bootstrap";

export function TwoDGraph({drawPoints, roomId, graphList,viewPointsX,viewPointsY}) {

    let [ratio, setRatio] = useState(1)

    let user = useSelector(state => state.user);
    console.log("캠버스")
    console.log({drawPoints});


    // 스크롤 이벤트 제어. 나중에 쓸수 있음.
    function removeWindowWheel() {
        window.addEventListener("wheel", preventWheelEvent,
            {passive: false}
        );
    }

    function addWindowWheel() {
        window.removeEventListener("wheel", preventWheelEvent, {passive: true})
    }

    function preventWheelEvent(e) {
        e.preventDefault();

        console.log("x = " + e.deltaX)
        console.log("y = " + e.deltaY)

        if (e.deltaY % 1 < 0 && e.deltaX === 0) {
            console.log("축소")
            setRatio(ratio - 1)
            console.log("현재 비율" + ratio)
        } else if (e.deltaY % 1 > 0 && e.deltaX === 0) {
            console.log("확대")
            setRatio(ratio + 1)
            console.log("현재 비율" + ratio)
        }
    }


    let drawGraph = () => {

        let result = [];
        for (let i = 0; i < graphList.length; i++) {

            let color = graphList[i][0];
            let type = graphList[i][1];
            let first = Number(graphList[i][2]);
            let second = Number(graphList[i][3]);
            let third = Number(graphList[i][4]);


            if (type === "Line") {
                result.push(
                    <Line.PointAngle
                        key={i}
                        point={[0, second]}
                        color={color}
                        angle={Math.atan(first)}
                        weight={4}
                    />
                );


            } else if (type === "Circle") {
                result.push(
                    <Circle key={i} center={[first, second]} radius={third} color={color}/>
                );
            } else if (type === "TwoD") {
                result.push(<FunctionGraph.OfX
                    key={i}
                    color={color}
                    y={(x) => {
                        const _x = x
                        return first*_x*_x + second*_x + third}}/>)
            }
        }
        return result;
    };

    return (
        <div className='test-parent'>
            <div className='test-child'>
                <Button onClick={() => {
                    setRatio(ratio + 0.5)
                }}>
                    축소
                </Button>
                <Button onClick={() => {
                    setRatio(ratio - 0.5)
                }}>
                    확대
                </Button>
                <div>
                    <Form.Range
                        value={ratio}
                        onChange={e => setRatio(Number(e.target.value))}
                        tooltip='auto'
                    />
                </div>
            </div>
            <Mafs
                height={490}
                width={"auto"}
                viewBox={{x: viewPointsX, y: viewPointsY, padding: ratio}}>
                <CartesianCoordinates
                    xAxis={{lines: Math.floor(ratio / 5) + 1}}
                    yAxis={{lines: Math.floor(ratio / 5) + 1}}
                />
                {drawGraph()}


                {/*<FunctionGraph.OfX*/}
                {/*    color={"red"}*/}
                {/*    y={(x) => {*/}
                {/*        const _x = x*/}
                {/*        return -3*_x*_x*_x -2*x*_x + 2}}/>*/}

            </Mafs>
        </div>

    )

}

