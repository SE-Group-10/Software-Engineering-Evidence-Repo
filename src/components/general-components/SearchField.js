import "./SearchField.css";
import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

class SearchField extends React.Component {
  render() {
    return (
      <div className="searchFieldContainer">
          <Form>
            {/** Description Search Form Group */}
            <Form.Group controlId="descriptionSearch">
              <Form.Label>
                <h4>Search:</h4>
              </Form.Label>
              <Form.Control type="text" placeholder="Enter a keyword or phrase to search for evidences" />
            </Form.Group>
            {/** Date Form Group */}
            <Form.Group controlId="dateRangeSearch">
              <Row>
                <Col sm={2}>
                  <Form.Label>
                    <h4>Document Date:</h4>
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control type="date" />
                </Col>
                <Col sm={1}>
                  <h4>to</h4>
                </Col>
                <Col>
                  <Form.Control type="date" />
                </Col>
              </Row>
            </Form.Group>
            {/** Query Search Form Group */}
            <Row>
              <Col sm={1}>
                <h4>If</h4>
              </Col>
              <Col>
                <Form.Control as="select">
                  <option value="0">Name of Field</option>
                  <option value="article_title">Article Title</option>
                  <option value="article_name">Article Name</option>
                  <option value="article_author">Author</option>
                </Form.Control>
              </Col>
              <Col sm={2}>
                <Form.Control as="select">
                  <option value="0">Operator</option>
                  <option value="contains">Contains</option>
                  <option value="not_contains">Does Not Contain</option>
                  <option value="begins_with">Begins With</option>
                  <option value="equals">Is Equal To</option>
                  <option value="less_than">Is Less Than</option>
                  <option value="less_than_equals">
                    Is Less Than Or Equal To
                  </option>
                  <option value="more_than">Is More Than</option>
                  <option value="more_than_equals">
                    Is More Than Or Equal To
                  </option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Control as="select">
                  <option>Value</option>
                </Form.Control>
              </Col>
              <Col sm={1}>
                <a>
                  <img
                    alt="add-search"
                    src={require("../../assets/icons/plus_icon.svg")}
                  />
                </a>
              </Col>
              <Col sm={1}>
                <a>
                  <img
                    alt="add-search"
                    src={require("../../assets/icons/dash_icon.svg")}
                  />
                </a>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
      </div>
    );
  }
}

export default SearchField;
