import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../stylesheet.css';


export default function SearchButton(props) {
    return (
        <Button style={{ marginLeft: '150px' }} variant="success" size="lg" onClick={() => props.functionPassed()}>
            Search
        </Button>
    )
}