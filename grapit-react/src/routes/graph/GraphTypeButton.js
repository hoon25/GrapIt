import {ButtonGroup, ToggleButton} from "react-bootstrap";
import * as radios from "react-bootstrap/ElementChildren";
import GraphList from "./GraphList";

export function GraphTypeButton({graphType,setGraphType}) {
    const radios = [
        { name: '직선', value: 'Line' },
        { name: '원', value: 'Circle' },
        { name: '이차원', value: '2D' },
    ];

    return(
        <ButtonGroup>
        {radios.map((radio, idx) => (
            <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? 'outline-success' : 'outline-danger'}
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
