import React, { useRef } from 'react';
import { ToggleButton, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../stylesheet.css';


export default function HeuristicButton(props) {
    var one = useRef();
    var two = useRef();

    function utility(button) {
        if (button === 'one') {
            props.functionPassed(0);
            one.current.style.backgroundColor = 'green';
            two.current.style.backgroundColor = 'grey';
        }
        else if (button === 'two') {
            props.functionPassed(1);
            two.current.style.backgroundColor = 'green';
            one.current.style.backgroundColor = 'grey';
        }
    }
    return (
        <ButtonGroup toggle>
            <ToggleButton ref={one} type="radio" variant="secondary" name="radio" onChange={() => utility('one')}>Manhattan</ToggleButton>
            <ToggleButton ref={two} type="radio" variant="secondary" name="radio" onChange={() => utility('two')}>Euclidean</ToggleButton >
        </ButtonGroup >
    )
}