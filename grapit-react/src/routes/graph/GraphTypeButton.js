import {ButtonGroup, ToggleButton} from "react-bootstrap";
import * as radios from "react-bootstrap/ElementChildren";
import GraphList from "./GraphList";

export function GraphTypeButton({graphType,setGraphType}) {
    const radios = [
        { name: '일차함수', value: 'Line' },
        { name: '이차함수', value: 'TwoD' },
        { name: '원', value: 'Circle' },
        // { name: '삼각함수', value: 'Trigonometric'}
    ];

    return(
        <ButtonGroup>
        {radios.map((radio, idx) => (
            <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={'outline-primary'}
                name="radio"
                value={radio.value}
                checked={graphType === radio.value}
                onChange={(e) => setGraphType(e.currentTarget.value)}
            >
                {radio.name}
            </ToggleButton>
        ))}
    </ButtonGroup>)
}
