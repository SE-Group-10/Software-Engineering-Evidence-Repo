import React from "react";
import "./SearchFilters.css";
import { Form, Row, Button } from "react-bootstrap";
import {
  ProSidebar,
  SidebarHeader,
  SidebarContent,
  Menu,
  SubMenu,
  MenuItem,
} from "react-pro-sidebar";
import swal from "@sweetalert/with-react";
import "react-pro-sidebar/dist/css/styles.css";
import api from "../../api/api";

class SearchFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      methodologies: [],
      methods: [],
      researchMethods: [],
      researchParticipants: [],

      authorSearch: "",
      titleSearch: "",
      linkSearch: "",
      methodology: "",
      method: "",
      researchMethod: "",
      chosenResearchParticipant: "",
      evidenceItem: "",
    };

    // Prevents Memory Leaks
    this._isMounted = false;
  }

  // Function to Get All The Filters
  getAllFilters = async () => {
    try {
      const methodologiesResponse = await api.get("/methodologies");
      const methodsResponse = await api.get("/methods");
      const researchMethodsResponse = await api.get("/research_methods");
      const researchParticipantResponse = await api.get(
        "/research_participants"
      );

      // Setting All The Filter States
      this._isMounted &&
        this.setState({
          methodologies: methodologiesResponse.data,
          methods: methodsResponse.data,
          researchMethods: researchMethodsResponse.data,
          researchParticipants: researchParticipantResponse.data,
        });
    } catch (error) {
      // Error with Getting the Filters
      swal({
        title: "Database Error!",
        text: error?.response?.data || "Unknown Error",
        icon: "error",
        buttons: [false, true],
      });
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getAllFilters();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // Updates States for Filter Forms
  formOnChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  // Updates States for Filter Forms
  radioResearchParticipantHandler = (e) => {
    this.setState({
      chosenResearchParticipant: e.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    let methodologiesArray = [];
    if (this.state.methodologies) {
      methodologiesArray = this.state.methodologies.map(
        (methodology, index) => {
          return (
            <option key={index} value={methodology.methodology_name}>
              {methodology.methodology_name}
            </option>
          );
        }
      );
    }

    let methodsArray = [];
    if (this.state.methods) {
      methodsArray = this.state.methods.map((method, index) => {
        return (
          <option key={index} value={method.method_name}>
            {method.method_name}
          </option>
        );
      });
    }

    let researchMethodsArray = [];
    if (this.state.researchMethods) {
      researchMethodsArray = this.state.researchMethods.map(
        (researchMethod, index) => {
          return (
            <option key={index} value={researchMethod.research_method_name}>
              {researchMethod.research_method_name}
            </option>
          );
        }
      );
    }

    let researchParticipantsArray = [];
    if (this.state.researchParticipants) {
      researchParticipantsArray = this.state.researchParticipants.map(
        (researchParticipant, index) => {
          return (
            <Form.Check
              required
              key={index}
              type="radio"
              label={researchParticipant.participant_type}
              name="participants"
              value={researchParticipant.participant_type}
              id={researchParticipant.participant_type}
              onChange={this.radioResearchParticipantHandler}
            />
          );
        }
      );
    }

    return (
      <ProSidebar>
        <SidebarHeader>
          <Menu>
            <SubMenu title="Search Filters:">
              <Form onSubmit={this.onSubmit}>
                <Row>
                  <Form.Group controlId="researchMethod">
                    <Form.Label>Research Method</Form.Label>
                    <Form.Control
                      as="select"
                      type="text"
                      defaultValue=""
                      style={{ width: "12vw" }}
                      onChange={this.formOnChangeHandler}
                    >
                      <option value="" disabled>
                        Select Research Method
                      </option>
                      {researchMethodsArray}
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    controlId="participants_form"
                    style={{ width: "12vw" }}
                  >
                    <Form.Label>Research Participants</Form.Label>
                    {researchParticipantsArray}
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group controlId="evidenceItem">
                    <Form.Label>Evidence Item</Form.Label>
                    <Form.Control
                      as="select"
                      type="text"
                      defaultValue=""
                      style={{ width: "12vw" }}
                      onChange={this.formOnChangeHandler}
                    >
                      <option value="" disabled>
                        Select Evidence Item
                      </option>
                      <option value="article_title">Outcome/Benefit</option>
                      <option value="article_name">Context</option>
                      <option value="article_author">Result</option>
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group controlId="method">
                    <Form.Label>SE Method</Form.Label>
                    <Form.Control
                      as="select"
                      type="text"
                      defaultValue=""
                      style={{ width: "12vw" }}
                      onChange={this.formOnChangeHandler}
                    >
                      <option value="" disabled>
                        Select SE Method
                      </option>
                      {methodsArray}
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group controlId="methodology">
                    <Form.Label>SE Methodology</Form.Label>
                    <Form.Control
                      as="select"
                      type="text"
                      defaultValue=""
                      style={{ width: "12vw" }}
                      onChange={this.formOnChangeHandler}
                    >
                      <option value="" disabled>
                        Select SE Methodology
                      </option>
                      {methodologiesArray}
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Label>Publication Details: </Form.Label>
                  <Form.Group controlId="authorSearch">
                    <Form.Control type="text" placeholder="Author" />
                  </Form.Group>
                  <Form.Group controlId="titleSearch">
                    <Form.Control type="text" placeholder="Title" />
                  </Form.Group>
                  <Form.Group controlId="linkSearch">
                    <Form.Control type="text" placeholder="URL or DOI" />
                  </Form.Group>
                </Row>
              </Form>
            </SubMenu>
          </Menu>
        </SidebarHeader>
        <SidebarContent>
          <Menu>
            <SubMenu title="Sort Results By:">
              <MenuItem>User Ratings</MenuItem>{" "}
              {/*TODO: Add fn to perform sort from high - low ratings */}
              <MenuItem>Reviews Quantity</MenuItem>{" "}
              {/* TODO: Add fn to perform sort based on number of reviews.*/}
            </SubMenu>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    );
  }
}

export default SearchFilters;
