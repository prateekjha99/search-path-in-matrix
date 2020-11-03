import React from 'react';

function Info() {
    return (
        <div className="info">
            <h1>Instructions !</h1>
            <ol>
                <li>Red cell is source </li>
                <li>Yellow cell is destination</li>
                <li>Click on blue cell to make it black wall</li>
                <li>Click on black cell to undo</li>
                <li>Select heuristic</li>
                <li>Select number of directions </li>
                <li>Click on Search button</li>
                <li>Light yellow is the explored nodes</li>
                <li>Orange is the path</li>
            </ol>
        </div>
    )
}

export default Info;