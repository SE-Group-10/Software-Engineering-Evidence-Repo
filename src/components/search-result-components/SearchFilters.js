import React from "react";
import "./SearchFilters.css";
import { Card, Container } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';



class SearchFilters extends React.Component {
    render(){
    return (
        <Container className="queryFilter">
        <Accordion defaultActiveKey="0" >
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    Filters
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <p> This is first filter </p>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    Sort by:
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <p> Sorting items </p>
                </Accordion.Collapse>
            </Card>
        </Accordion>
        </Container>
    );
    }
}

export default SearchFilters;


