import React, { useState, useRef } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../stylesheet.css';
// import Square from './Square/Square'

var grid = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
var src = [0, 0];
var dest = [4, 3];
const block = ["blue", "black", "red", "yellow"];

var refArray = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];


function aStartSearch() {

}

function Square(props) {
    const [state, setState] = useState(0);
    const [row, col] = props.index;

    refArray[row][col] = useRef();

    if (row == src[0] && col == src[1]) {
        return (
            <div ref={refArray[row][col]} className="square" style={{ backgroundColor: block[2] }}>
            </div>
        )
    }
    else if (row == dest[0] && col == dest[1]) {
        return (
            <div ref={refArray[row][col]} className="square" style={{ backgroundColor: block[3] }} >
            </div>
        )
    }
    else {
        return (
            <div ref={refArray[row][col]} className="square" style={{ backgroundColor: block[state] }} onClick={() => { grid[row][col] = (state + 1) % 2; setState(prevState => (prevState + 1) % 2) }}>
            </div >
        )
    }

}

function App() {
    // const [grid, setGrid] = useState([[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]]);

    return (
        <div>
            < Container fluid className="container" >

                {grid.map((row, i) => (
                    <div key={i} className="row">
                        {row.map((col, j) => (
                            <Square key={j} index={[i, j]} >gg</Square>
                        ))}
                    </div>
                ))}
            </Container >

            <Button variant="success" onClick={() => console.log(grid)}>Click 1</Button>
            <Button variant="secondary" onClick={() => { refArray[4][2].current.style.backgroundColor = 'brown' }}>Click 3</Button>
        </div >

    )
}

export default App;