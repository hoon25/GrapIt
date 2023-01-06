import {CartesianCoordinates, FunctionGraph, Mafs, Line, Transform, useMovablePoint, vec, Circle} from "mafs"
import "mafs/build/index.css"
import React, {useEffect, useState} from "react";
import {Provider, useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";

export function TwoDGraph({graphList}) {

    let [ratio,setRatio] = useState(1)

    // const [canvasPoints, setCanvasPoints] = useState(canvasPoint);

    // const [model,setModel] = useState(["Points","Lines","circles",""])

    // for (let i = 0; i < graphList.length; i++) {
    //     // eval("let points" + i + "= [0,graphList[i][1]]");
    //     eval("const point" + i + "="+ useMovablePoint([0,graphList[i][1]]));
    //     // const point1 = useMovablePoint([-1, -1])
    // }



    // const a = useMovablePoint([-1, 0], {
    //     constrain: "horizontal", color: "skyblue"
    // })
    // const b = useMovablePoint([1, 0], {
    //     constrain: "horizontal", color: "skyblue"
    // })
    //
    // const k = useMovablePoint([0, -1], {
    //     constrain: "vertical", color: "skyblue"
    // })
    //
    //
    // const mid = (a.x + b.x) / 2
    // const fn = (x: number) => (x - a.x) * (x - b.x)

    // const point1 = useMovablePoint([-1, -1])
    // const point2 = useMovablePoint([2, 1])

    let user = useSelector(state => state.user);
    // console.log("캠버스")
    // console.log({drawPoints});
    //
    // if(drawPoints != null){
    //     console.log("hi");
    //     a.x = (a.x + drawPoints);
    //     // point1.x = (point1.x + canvasPoints);
    //     // point1.y = (point1.y + canvasPoints);
    //     // point1.point = [a.x+drawPoints,point1]
    // }

    // console.log("ax = " +a.x);
    // console.log("포인터들");
    // console.log(a.x);
    // console.log(point1.element);
    // console.log("drawPoints");
    // console.log(drawPoints);
    // if (drawPoints != null) {
    //     console.log("=== 파싱떄 에러??");
    //     let message = drawPoints;
    //     console.log("=== 여기서에러?");
    //     if (message.sender != user.nickName) {
    //         // 현재 나랑 메세지 보낸 사람이 다름 -> 요청 할필요 없음.
    //         // 0.02 픽셀 이상만 반응
    //         let inputInfo = JSON.parse(message.message);
    //
    //         if (Math.abs(a.x - inputInfo.ax) > 0.2 || Math.abs(a.y - inputInfo.ay) > 0.2
    //             || Math.abs(b.y - inputInfo.by) > 0.2 || Math.abs(b.x - inputInfo.bx) > 0.2
    //             || Math.abs(k.y - inputInfo.ky) > 0.2 || Math.abs(k.x - inputInfo.kx) > 0.2
    //             || Math.abs(point1.y - inputInfo.point1y) > 0.2 || Math.abs(point1.x - inputInfo.point1x) > 0.2
    //             || Math.abs(point2.y - inputInfo.point2y) > 0.2 || Math.abs(point2.x - inputInfo.point2x) > 0.2) {
    //
    //             a.x = inputInfo.ax;
    //             a.y = inputInfo.ay;
    //             b.x = inputInfo.bx;
    //             b.y = inputInfo.by;
    //             k.x = inputInfo.kx;
    //             k.y = inputInfo.ky;
    //             point1.point = [inputInfo.point1x, inputInfo.point1y];
    //             point2.point = [inputInfo.point2x, inputInfo.point2y];
    //         }
    //
    //     } else {
    //         // 내가 메세지를 보냄. -> 요청 해야함.
    //         let pointInfo = JSON.stringify({
    //             ax: a.x,
    //             ay: a.y,
    //             bx: b.x,
    //             by: b.y,
    //             kx: k.x,
    //             ky: k.y,
    //             point1x: point1.x,
    //             point1y: point1.y,
    //             point2x: point2.x,
    //             point2y: point2.y
    //         })
    //         sendDrawMessage(roomId, user.nickName, pointInfo, 'DRAW');
    //     }
    //
    // }else{
    //     let pointInfo = JSON.stringify({
    //         ax: a.x,
    //         ay: a.y,
    //         bx: b.x,
    //         by: b.y,
    //         kx: k.x,
    //         ky: k.y,
    //         point1x: point1.x,
    //         point1y: point1.y,
    //         point2x: point2.x,
    //         point2y: point2.y
    //     })
    //     sendDrawMessage(roomId, user.nickName, pointInfo, 'DRAW');
    // }

    // 스크롤 이벤트 제어. 나중에 쓸수 있음.
    function removeWindowWheel(){
        window.addEventListener("wheel",preventWheelEvent,
            {passive:false}
        );
    }

    function addWindowWheel(){
        window.removeEventListener("wheel",preventWheelEvent,{passive:true})
    }

    function preventWheelEvent(e){
        e.preventDefault();

        console.log("x = " +e.deltaX)
        console.log("y = " +e.deltaY)

        if(e.deltaY % 1 < 0 && e.deltaX === 0){
            console.log("축소")
            setRatio(ratio - 1)
            console.log("현재 비율" +ratio)
        }else if(e.deltaY % 1 > 0  && e.deltaX === 0){
            console.log("확대")
            setRatio(ratio + 1)
            console.log("현재 비율" +ratio)
        }
    }


    let rendering = () => {

        let result = [];
        for (let i = 0; i < graphList.length; i++) {

            if(graphList[i][3] === "Line"){
                result.push(
                    <Line.PointAngle
                        key={i}
                        point={[0,Number(graphList[i][1])]}
                        color={graphList[i][2]}
                        angle={Math.atan(Number(graphList[i][0]))}
                        weight={4}
                    />
                );
            }else if(graphList[i][3] === "Circle"){
                result.push(
                    <Circle center={[0, 0]} radius={3} />
                );
            }else if(graphList[i][3] === "2D"){

            }
        }
        return result;
    };

    return (
        <div className='test-parent'>
            <div className='test-child'>
                <Button onClick={()=>{
                    setRatio(ratio+0.5)
                }}>
                    축소
                </Button>
                <Button onClick={()=>{
                    setRatio(ratio-0.5)
                }}>
                    확대
                </Button>
            </div>
            <Mafs
                height={540}
                width={"auto"}
                viewBox={{x : [-3,3], y : [-3,3] , padding:ratio}}>
                <CartesianCoordinates
                    xAxis={{lines: Math.floor(ratio/5) + 1}}
                    yAxis={{lines: Math.floor(ratio/5) + 1}}
                />
                {rendering()}
            </Mafs>
        </div>

    )

}

