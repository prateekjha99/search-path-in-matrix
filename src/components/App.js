import React, { useState, useRef } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet.css';
// import Square from './Square/Square'

import Info from './Info/Info'
import SearchButton from './SearchButton/SearchButton';
import HeuirsticButton from './HeuristicButton/HeuristicButton'
import DirectionButton from './DirectionButton/DirectionButton';

const Heap = require('heap');

class Node {
    constructor(f, i, j) {
        this.f = f;
        this.i = i;
        this.j = j;
    }
}


var grid = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
var src = [0, 0];
var dest = [4, 3];
const block = ["blue", "black", "#ee6f57", "#ff9642"];
const MAX = 10000;

var refArray = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];


var calculateHeuristic = [
    function (ni, nj) { return Math.abs(dest[0] - ni) + Math.abs(dest[1] - nj) },
    function (ni, nj) { return Math.sqrt((dest[0] - ni) * (dest[0] - ni) + (dest[1] - nj) * (dest[1] - nj)) }
]
var heuristicIdx = 0;

function changeHeuristic(valueIdx) {
    heuristicIdx = valueIdx;
}

var direction = 4;
function changeDirection(value) {
    direction = value;
}
class Cell {
    constructor() {
        this.parent_i = -1;
        this.parent_j = -1;
        this.f = MAX;
        this.g = MAX;
        this.h = MAX;
    }
}


function tracePath(cellDetails) {
    var row = dest[0];
    var col = dest[1];

    var Path = [];

    while (!(cellDetails[row][col].parent_i === row
        && cellDetails[row][col].parent_j === col)) {
        Path.push([row, col]);
        var temp_row = cellDetails[row][col].parent_i;
        var temp_col = cellDetails[row][col].parent_j;
        row = temp_row;
        col = temp_col;
    }

    Path.push([row, col]);
    // for (var i = Path.length - 2; i > 0; --i) {
    //     refArray[Path[i][0]][Path[i][1]].current.style.backgroundColor = '#ff9642';
    // }

    var i = Path.length - 2;
    var timer = setInterval(function () { refArray[Path[i][0]][Path[i][1]].current.style.backgroundColor = '#ff9642'; i--; if (i === 0) clearInterval(timer); }, 500);


    return;
}

function aStarSearch() {
    var row = grid.length, col = grid[0].length;

    //closedList
    var closedList = new Array(row).fill(0).map(() => new Array(col).fill(false));

    // var cellDetails = new Array(row).fill(0).map(() => new Array(col).fill(new Cell()));
    var cellDetails = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];

    var i, j;
    [i, j] = src;


    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            cellDetails[i][j] = new Cell();
        }
    }

    // Initialising the parameters of the starting node 
    cellDetails[i][j].f = 0.0;
    cellDetails[i][j].g = 0.0;
    cellDetails[i][j].h = 0.0;
    cellDetails[i][j].parent_i = i;
    cellDetails[i][j].parent_j = j;


    var openList = new Heap(function (a, b) {
        if (a.f === b.f) {
            if (a.i === b.i) return 0;
            return a.i < b.i ? -1 : 1;
        };
        return a.f < b.f ? -1 : 1;
    });

    // Put the starting cell on the open list and set its 
    // 'f' as 0 
    openList.push(new Node(0, src[0], src[1]));


    var foundDest = false;
    var R = [-1, 0, 1, 0, -1, 1, 1, -1]
    var C = [0, 1, 0, -1, -1, 1, -1, -1]

    while (!openList.empty()) {
        var p = openList.pop();
        // Add this vertex to the closed list 
        i = p.i;
        j = p.j;
        closedList[i][j] = true;

        var timer;
        if (!(i === src[0] && j == src[1])) {
            refArray[i][j].current.style.backgroundColor = '#eff48e';
            // timer = setInterval(function () { refArray[i][j].current.style.backgroundColor = '#eff48e'; }, 100);

        }

        // Generating all the 8 successor of this cell
        var ni, nj, gNew, hNew, fNew;

        for (var k = 0; k < direction; ++k) {
            ni = i + R[k];
            nj = j + C[k];

            // if next pos safe
            if (ni >= 0 && ni < row && nj >= 0 && nj < col) {

                // if next pos is destination
                if (dest[0] === ni && dest[1] === nj) {
                    cellDetails[ni][nj].parent_i = i;
                    cellDetails[ni][nj].parent_j = j;

                    // clearInterval(timer);
                    tracePath(cellDetails);
                    foundDest = true;
                    return;
                }


                // If the successor is already on the closed 
                // list or if it is blocked, then ignore it. 
                // Else do the following 
                else if (closedList[ni][nj] === false && grid[ni][nj] === 0) {
                    gNew = cellDetails[i][j].g + 1.0;
                    hNew = calculateHeuristic[heuristicIdx](ni, nj);
                    fNew = gNew + hNew;

                    // If it isn’t on the open list, add it to 
                    // the open list. Make the current square 
                    // the parent of this square. Record the 
                    // f, g, and h costs of the square cell 
                    //                OR 
                    // If it is on the open list already, check 
                    // to see if this path to that square is better, 
                    // using 'f' cost as the measure. 
                    if (cellDetails[ni][nj].f === MAX || cellDetails[ni][nj].f > fNew) {

                        openList.push(new Node(fNew, ni, nj));

                        // Update the details of this cell 
                        cellDetails[ni][nj].f = fNew;
                        cellDetails[ni][nj].g = gNew;
                        cellDetails[ni][nj].h = hNew;
                        cellDetails[ni][nj].parent_i = i;
                        cellDetails[ni][nj].parent_j = j;
                    }
                }
            }
        }
    }
    if (foundDest === false)
        console.log("Failed to find the Destination Cell\n");

    return;

}

function Square(props) {
    const [state, setState] = useState(0);
    const [row, col] = props.index;

    refArray[row][col] = useRef();

    if (row === src[0] && col === src[1]) {
        return (
            <div ref={refArray[row][col]} className="square" style={{ backgroundColor: block[2] }}>
                Src
            </div>
        )
    }
    else if (row === dest[0] && col === dest[1]) {
        return (
            <div ref={refArray[row][col]} className="square" style={{ backgroundColor: 'yellow' }} >
                Dest
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
    var isLoading = false;
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col>
                        <Info></Info>
                    </Col>
                    <Col xs={4}>
                        <div className="container" style={{ marginTop: '100px' }} >

                            {grid.map((row, i) => (
                                <div key={i} className="row">
                                    {row.map((col, j) => (
                                        <Square key={j} index={[i, j]} >gg</Square>
                                    ))}
                                </div>
                            ))}
                            <br></br>

                            <SearchButton functionPassed={aStarSearch}></SearchButton>
                        </div >

                    </Col>
                    <Col>
                        <Container style={{ paddingLeft: '70px' }}>
                            <Row style={{ marginTop: '100px' }}>
                                <h1 style={{ color: '#7ea04d', fontWeight: 'bold' }}>Select Heuristic</h1>
                                <HeuirsticButton functionPassed={changeHeuristic}></HeuirsticButton>
                            </Row>
                            <Row style={{ marginTop: '100px' }}>
                                {/* <h1 style={{ color: '#ffe05d', fontWeight: 'bold' }}>Select #directions</h1> */}

                                <h1 style={{ color: '#7ea04d', fontWeight: 'bold' }}>Select #Directions</h1>
                                <DirectionButton functionPassed={changeDirection}></DirectionButton>
                            </Row>

                        </Container>
                    </Col>
                </Row>
            </Container>
        </div >

    )
}

export default App;