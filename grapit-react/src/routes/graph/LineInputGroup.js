import {Button, Form, InputGroup} from "react-bootstrap";

export function LineInputGroup({gradient,setGradient,YPoint,setYPoint,graphColor,setGraphColor,
                                   graphInfo,setGraphInfo,graphType,setGraphType,graphList,setGraphList}) {
    return(  <InputGroup className="mb-3">

        <Form.Control
            type="color"
            id="colorInput"
            defaultValue="#ffffff"
            onChange={function (e) {
                setGraphColor(e.target.value);
            }}
            // value={graphColor}
            title="Choose your color"
        />

        <Form.Control
            placeholder="기울기"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            type='number'
            id="gradientInput"
            onChange={function (e) {
                setGradient(e.target.value);
            }}
            value={gradient}
        />

        <Form.Control
            placeholder="y 절편"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            type='number'
            id="yPointInput"
            onChange={function (e) {
                setYPoint(e.target.value);
            }}
            value={YPoint}
        />

        <Button onClick={() =>{
            let copyGraphInfo = [...graphInfo]
            copyGraphInfo = [gradient,YPoint,graphColor,graphType];
            setGraphInfo(copyGraphInfo)
            let copyGraphList = [...graphList,copyGraphInfo]
            setGraphList(copyGraphList)
            setGraphInfo([gradient,YPoint,graphColor,graphType]);

            setYPoint("");
            setGradient("");

        }} variant="outline-secondary" id="button-addon2">
            생성
        </Button>
    </InputGroup>
    )
}
