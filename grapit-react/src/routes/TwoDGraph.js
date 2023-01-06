import {CartesianCoordinates, FunctionGraph, Line, Mafs, Transform, useMovablePoint} from "mafs"
import "mafs/build/index.css"
import React from "react";
import {useDispatch} from "react-redux";

export function TwoDGraph(roomId, stompClient, canvasPoints) {

    // const [model,setModel] = useState(["Points","Lines","circles",""])
    const a = useMovablePoint([-1, 0], {
        constrain: "horizontal", color: "skyblue"
    })
    const b = useMovablePoint([1, 0], {
        constrain: "horizontal", color: "skyblue"
    })

    const k = useMovablePoint([0, -1], {
        constrain: "vertical", color: "skyblue"
    })


    const mid = (a.x + b.x) / 2
    const fn = (x) => (x - a.x) * (x - b.x)

    const point1 = useMovablePoint([-1, -1])
    const point2 = useMovablePoint([2, 1])

    console.log("포인터들");
    console.log(a.element);
    console.log(point1);


    let dispatch = useDispatch();


    return (
        <Mafs>
            <CartesianCoordinates/>
            {
                // kind === "Point" ? <Point x={first} y={second}></Point> : ""
            }
            <FunctionGraph.OfX
                y={(x) => (k.y * fn(x)) / fn(mid)}
            />
            {a.element}
            {b.element}
            <Transform translate={[(a.x + b.x) / 2, 0]}>
                {k.element}
            </Transform>

            <Line.ThroughPoints
                point1={point1.point}
                point2={point2.point}
            />
            {point1.element}
            {point2.element}
            {/*<Point x={1} y={5}/>*/}
        </Mafs>
    )
}