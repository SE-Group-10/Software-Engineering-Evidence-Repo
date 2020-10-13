import React from "react";
import "./tableLayout.css";
import * as ReactBootStrap from "react-bootstrap";
const AnalystQueueField = () => {
    const list = [
        { name: "article 1", author: "author 1", topic: "topic 1", date: "01-08-2020" },
        { name: "article 2", author: "author 2", topic: "topic 2", date: "02-07-2020" },
        { name: "article 3", author: "author 3", topic: "topic 3", date: "03-04-2019" },
        { name: "article 4", author: "author 4", topic: "topic 4", date: "04-03-2019" },
    ]

    const renderList = (list, index) => {
        return (
            <tr key={index}>
                <td>{list.name}</td>
                <td>{list.author}</td>
                <td>{list.topic}</td>
                <td>{list.date}</td>
                <td id="link">view</td>
            </tr>
        )
    }
    return (
        <h1 id="border">
            <ReactBootStrap.Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name of article</th>
                        <th>Author</th>
                        <th>Topic</th>
                        <th>Date</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(renderList)}
                </tbody>
            </ReactBootStrap.Table>
        </h1>
    );
}

export default AnalystQueueField;