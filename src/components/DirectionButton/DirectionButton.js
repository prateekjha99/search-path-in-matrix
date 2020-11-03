import React, { useRef } from 'react';
import { ToggleButton, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../stylesheet.css';


export default function DirectionButton(props) {
    var one = useRef();
    var two = useRef();

    function utility(button) {
        if (button === 'one') {
            props.functionPassed(4);
            one.current.style.backgroundColor = 'green';
            two.current.style.backgroundColor = 'grey';
        }
        else if (button === 'two') {
            props.functionPassed(8);
            two.current.style.backgroundColor = 'green';
            one.current.style.backgroundColor = 'grey';
        }
    }
    return (
        <ButtonGroup toggle>

            <ToggleButton ref={one} className='button' variant='secondary' type="radio" name="radio" onChange={() => utility('one')}>4 (⇄,⇅)</ToggleButton>

            <ToggleButton ref={two} className='button' variant='secondary' type="radio" name="radio" onChange={() => utility('two')}>8 (⇄,⇅,↖,↗,↘,↙)</ToggleButton >
        </ButtonGroup >
    )
}