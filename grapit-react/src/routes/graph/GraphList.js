import Table from 'react-bootstrap/Table';
import {Line} from "mafs";
import React, {useState} from "react";
import {Form} from "react-bootstrap";

function GraphList({graphList, setGraphList}) {

    const [deleteIconHover, setDeleteIconHover] = useState(false)

    const handleMouseEnter = () =>{
        console.log("enter")
        setDeleteIconHover(true)
    }

    const handleMouseLeave = () =>{
        console.log("out")
        setDeleteIconHover(false)
    }
    const deleteIconStyle = {
        cursor : deleteIconHover ? 'pointer' : 'cursor',
        color: deleteIconHover ? "red" : "",
    };

    const deleteIconHandler = (i)=>{
        let copyGraphList = [...graphList]
        copyGraphList.splice(i,1);
        setGraphList(copyGraphList);
        // setGraphLists(copyGraphList);
        console.log(i+"번쨰 요소");
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
            graphListResult.push(
                <tr key={i}>
                    <td>{i}</td>
                    <td>
                        <Form.Control
                            type="color"
                            id="colorInput"
                            value={graphList[i][2]}
                            title="Choose your color"
                            disabled={true}
                        /></td>
                    <td>{
                        //!!TODO 건드리지 마세요... 리펙 제가 하겠습니다 -no_a
                        "y = " + (graphList[i][0] === "0" || graphList[i][0] === "" ? ""  + (graphList[i][1] === "0" || graphList[i][1] === ""  ? "" : graphList[i][1] ): (graphList[i][0] === "1"? "" : graphList[i][0] )+ " x "  + (graphList[i][1] === "0" || graphList[i][1] === ""  ? "" : " + "+graphList[i][1] ))}</td>
                    <td onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-x-square-fill" viewBox="0 0 16 16" style={deleteIconStyle} onClick={()=>{deleteIconHandler(i)}}>
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
