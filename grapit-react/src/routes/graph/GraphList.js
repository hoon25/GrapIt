import Table from 'react-bootstrap/Table';
import {Line} from "mafs";
import React, {useState} from "react";
import {Form} from "react-bootstrap";
import {MathComponent} from "mathjax-react";

function GraphList({graphList, setGraphList,sendGraphInfo}) {

    const [deleteIconHover, setDeleteIconHover] = useState(false)

    const handleMouseEnter = () => {
        console.log("enter")
        setDeleteIconHover(true)
    }

    const handleMouseLeave = () => {
        console.log("out")
        setDeleteIconHover(false)
    }
    const deleteIconStyle = {
        cursor: deleteIconHover ? 'pointer' : 'cursor',
        color: deleteIconHover ? "red" : "",
    };

    const deleteIconHandler = (i) => {
        let copyGraphList = [...graphList]
        copyGraphList.splice(i, 1);
        setGraphList(copyGraphList);
        sendGraphInfo(copyGraphList)
        // setGraphLists(copyGraphList);
    }

    const changeColorHandler = (i,value) => {
        let copyGraphList = [...graphList]
        let copyGraphInfo = [...copyGraphList[i]]
        copyGraphInfo[0] = value
        copyGraphList[i] = copyGraphInfo

        setGraphList(copyGraphList)
        sendGraphInfo(copyGraphList)
        console.log(value)
    }


    function LineFormulaFormat(first, second) {
        let formula = "y = "

        if (first === "" || first === "0") {
            //x계수가 없을때
            second === "" || second === "0" ? formula += "0" : formula += second
        } else {
            // 계수가 존재 ( 1일떄)
            first === "1" ? formula += "x" : formula += first + "x";
            second === "" || second === "0" ? formula += "" : formula += " + " + second;
        }
        return formula;
    }

    function CircleFormulaFormat(first, second, third) {
        let formula = ""

        first === "" || first === "0" ? formula += "x^2" : formula += "(x-" + first + ")^2";
        second === "" || second === "0" ? formula += " + y^2" : formula += " + (y-" + second + ")^2";
        formula += " = " + third + "^2"
        return formula;
    }

    function TwoDFormulaFormat(first, second, third) {
        let formula = "y = "
        first === "1" ? formula += "x^2" : formula += first + "x^2";
        second === "" || second === "0" ? formula += "" : formula +=" + " + second + "x "
        third === "" || third === "0" ? formula += "" : formula +=" + "+ third;
        return formula;
    }


    // console.log(graphList)
    // console.log(graphList.graphList.length)

    //
    // if(graphList.length != 0){
    //     for (const graphListElement of graphList) {
    //         console.log(graphListElement[2]);
    //         console.log(graphListElement[0] + "x +" + graphListElement[1]);
    //     }
    //
    // }

    let addList = () => {
        let graphListResult = [];
        for (let i = 0; i < graphList.length; i++) {

            let color = graphList[i][0];
            let type = graphList[i][1];
            let first = graphList[i][2];
            let second = graphList[i][3];
            let third = graphList[i][4];
            let formula = "";

            if (type === "Line") {
                formula = LineFormulaFormat(first, second);
            } else if (type === "TwoD") {
                formula = TwoDFormulaFormat(first, second, third);
            } else if (type === "Circle") {
                formula = CircleFormulaFormat(first, second, third);
            }

            formula = formula.replace(/--/g,"+");
            graphListResult.push(
                <tr key={i}>
                    <td>{i}</td>
                    <td>
                        <Form.Control
                            type="color"
                            id="colorInput"
                            value={color}
                            onChange={(e)=>{
                                changeColorHandler(i,e.target.value);
                            }}
                        /></td>
                    <td>{type}</td>
                    <td>
                        <MathComponent tex={formula}/>
                    </td>
                    <td onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-x-square-fill" viewBox="0 0 16 16" style={deleteIconStyle}
                             onClick={() => {
                                 deleteIconHandler(i)
                             }}>
                            <path
                                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                        </svg>
                    </td>
                </tr>
            );
        }
        return graphListResult;
    };

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>색</th>
                <th>종류</th>
                <th>수식</th>
                <th>삭제</th>
            </tr>
            </thead>
            <tbody>
            {addList()}
            </tbody>
        </Table>
    );
}

export default GraphList;
