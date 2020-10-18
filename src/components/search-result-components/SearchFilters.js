import React from "react";
import "./SearchFilters.css";
import { Button, Form, Row } from "react-bootstrap";
import { ProSidebar, SidebarHeader, Menu, SubMenu } from "react-pro-sidebar";
import { Redirect } from "react-router-dom";
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

      titleSearch: "",
      authorSearch: "",
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
    // evidenceItem: "",

    let searchQuery = "";
    if (this.state.titleSearch) {
      searchQuery = searchQuery.concat("title=" + this.state.titleSearch);
    }
    if (this.state.authorSearch) {
      searchQuery =
        searchQuery.length > 0
          ? searchQuery.concat("&author=" + this.state.authorSearch)
          : searchQuery.concat("author=" + this.state.authorSearch);
    }
    if (this.state.linkSearch) {
      searchQuery =
        searchQuery.length > 0
          ? searchQuery.concat("&article_link=" + this.state.linkSearch)
          : searchQuery.concat("article_link=" + this.state.linkSearch);
    }
    if (this.state.methodology) {
      searchQuery =
        searchQuery.length > 0
          ? searchQuery.concat("&methodology=" + this.state.methodology)
          : searchQuery.concat("methodology=" + this.state.methodology);
    }
    if (this.state.method) {
      searchQuery =
        searchQuery.length > 0
          ? searchQuery.concat("&method=" + this.state.method)
          : searchQuery.concat("method=" + this.state.method);
    }
    if (this.state.researchMethod) {
      searchQuery =
        searchQuery.length > 0
          ? searchQuery.concat("&research_method=" + this.state.researchMethod)
          : searchQuery.concat("research_method=" + this.state.researchMethod);
    }
    if (this.state.chosenResearchParticipant) {
      searchQuery =
        searchQuery.length > 0
          ? searchQuery.concat(
              "&participant=" + this.state.chosenResearchParticipant
            )
          : searchQuery.concat(
              "participant=" + this.state.chosenResearchParticipant
            );
    }
    this.setState({
      searchQuery: searchQuery,
      redirect: true,
    });
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "search-result",
            search: `?${this.state.searchQuery}`,
          }}
        />
      );
    }

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
                <Button className="seer-button-styling" type="submit">
                  Search
                </Button>
              </Form>
            </SubMenu>
          </Menu>
        </SidebarHeader>
      </ProSidebar>
    );
  }
}

export default SearchFilters;
