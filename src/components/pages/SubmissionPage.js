import React from "react";
import {
  Container,
  Button,
  Form,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import swal from "@sweetalert/with-react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import api from "../../api/api";

class SubmissionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      methodologies: [],
      methods: [],
      research_methods: [],
      research_participants: [],

      // Edit Values
      submit_title: "",
      submit_document_type: "",
      submit_authors: "",
      submit_journals: "",
      submit_publisher: "",
      submit_volume: "",
      submit_volume_number: "",
      submit_start_page: "",
      submit_end_page: "",
      submit_publish_date: "",
      submit_article_link: "",
      submit_methodologies: [],
      submit_methods: [],
      submit_research_methods: [],
      submit_research_participants: [],

      redirect: false,
    };

    // Prevents Memory Leaks
    this._isMounted = false;
  }

  // Function to Get All The Articles Data
  getAllArticleData = async () => {
    try {
      const methodologiesResponse = await api.get("/methodologies");
      const methodsResponse = await api.get("/methods");
      const rschMethodsResponse = await api.get("/research_methods");
      const rschParticipantsResponse = await api.get("/research_participants");

      // Setting the Articles State
      this._isMounted &&
        this.setState({
          methodologies: methodologiesResponse.data,
          methods: methodsResponse.data,
          research_methods: rschMethodsResponse.data,
          research_participants: rschParticipantsResponse.data,
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
    this._isMounted && this.getAllArticleData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // Updates States for Forms
  formOnChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  // Updates Checkbox States for Forms
  checkboxOnChangeHandler = (event, type) => {
    let chosen_type_list = this.state[type];
    let check = event.target.checked;
    let checked_type = event.target.value;

    if (check) {
      chosen_type_list.push(checked_type);
    } else {
      var index = chosen_type_list.indexOf(checked_type);
      if (index > -1) {
        chosen_type_list.splice(index, 1);
      }
    }
    this.setState({
      [type]: chosen_type_list,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post An Article
      let articleObj = {
        submitter_user_id: this.props.user_information._id,
        title: this.state.submit_title,
        document_type: this.state.submit_document_type
          .split(",")
          .map(function (document_type) {
            return document_type.trim();
          }),
        authors: this.state.submit_authors.split(",").map(function (author) {
          return author.trim();
        }),
        journals: this.state.submit_journals.split(",").map(function (journal) {
          return journal.trim();
        }),
        publisher: this.state.submit_publisher,
        volume: this.state.submit_volume,
        volume_number: this.state.submit_volume_number,
        start_page: this.state.submit_start_page,
        end_page: this.state.submit_end_page,
        publish_date: this.state.submit_publish_date,
        article_link: this.state.submit_article_link,
        methodologies: this.state.submit_methodologies.map((methodology) => {
          return { methodology_name: methodology };
        }),
        methods: this.state.submit_methods.map((method) => {
          return { method_name: method };
        }),
        research_methods: this.state.submit_research_methods.map(
          (research_method) => {
            return { research_method_name: research_method };
          }
        ),
        participants: this.state.submit_research_participants.map(
          (participant) => {
            return { participant_type: participant };
          }
        ),
      };
      await api.post("/articles/", articleObj);

      // Clear All The Posting States
      this.setState({
        submit_title: "",
        submit_document_type: "",
        submit_authors: "",
        submit_journals: "",
        submit_publisher: "",
        submit_volume: "",
        submit_volume_number: "",
        submit_start_page: "",
        submit_end_page: "",
        submit_publish_date: "",
        submit_article_link: "",
        submit_methodologies: [],
        submit_methods: [],
        submit_research_methods: [],
        submit_research_participants: [],
      });

      // No Problems with Posting
      swal({
        title: "Successfully Posted!",
        text:
          "Article Successfully Posted! It is now in Moderation. Redirecting you to the homepage...",
        icon: "success",
        timer: 3000,
        buttons: [false, true],
        closeOnClickOutside: false,
        closeOnEsc: false,
      }).then(() => {
        this.setState({ redirect: true });
      });
    } catch (error) {
      // Error with Posting
      swal({
        title: "Unsuccessful Posting!",
        text: error?.response?.data || "Unknown Error",
        icon: "error",
        buttons: [false, true],
      });
    }
  };

  render() {
    // Redirect to home once posted
    if (this.state.redirect) {
      return <Redirect to="home" />;
    }

    return (
      <Container className="mt-5 multiFormStyle">
        <h1 className="seer-header-styling" style={{ textAlign: "center" }}>
          Submit An Article
        </h1>
        <hr className="mt-4 mb-4" />
        <Form onSubmit={this.onSubmit}>
          {/* Form Section to Edit Title */}
          <Form.Group controlId="submit_title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Title"
              type="text"
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          {/* Form Section to Edit Document Type */}
          <Form.Group controlId="submit_document_type">
            <Form.Label>Document Type/s</Form.Label>
            <Form.Control
              placeholder="Document Type/s"
              type="text"
              onChange={this.formOnChangeHandler}
            />
            <Form.Text className="text-muted">
              If multiple document types, separate by comma.
            </Form.Text>
          </Form.Group>
          {/* Form Section to Edit Authors */}
          <Form.Group controlId="submit_authors">
            <Form.Label>Author/s</Form.Label>
            <Form.Control
              placeholder="Author/s"
              type="text"
              onChange={this.formOnChangeHandler}
            />
            <Form.Text className="text-muted">
              If multiple authors, separate by comma.
            </Form.Text>
          </Form.Group>
          {/* Form Section to Edit Journals */}
          <Form.Group controlId="submit_journals">
            <Form.Label>Journal/s</Form.Label>
            <Form.Control
              placeholder="Journal/s"
              type="text"
              onChange={this.formOnChangeHandler}
            />
            <Form.Text className="text-muted">
              If multiple journals, separate by comma.
            </Form.Text>
          </Form.Group>
          {/* Form Section to Edit Publisher */}
          <Form.Group controlId="submit_publisher">
            <Form.Label>Publisher</Form.Label>
            <Form.Control
              placeholder="Publisher"
              type="text"
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          {/* Form Section to Edit Volumes */}
          <Row>
            <Col>
              <Form.Group controlId="submit_volume">
                <Form.Label>Volume</Form.Label>
                <Form.Control
                  min="0"
                  placeholder="Volume"
                  type="number"
                  onChange={this.formOnChangeHandler}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="submit_volume_number">
                <Form.Label>Volume Number</Form.Label>
                <Form.Control
                  min="0"
                  placeholder="Volume Number"
                  type="number"
                  onChange={this.formOnChangeHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Form Section to Edit Pages */}
          <Row>
            <Col>
              <Form.Group controlId="submit_start_page">
                <Form.Label>Start Page</Form.Label>
                <Form.Control
                  min="0"
                  placeholder="Start Page"
                  type="number"
                  onChange={this.formOnChangeHandler}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="submit_end_page">
                <Form.Label>End Page</Form.Label>
                <Form.Control
                  min="0"
                  placeholder="End Page"
                  type="number"
                  onChange={this.formOnChangeHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Form Section to Publish Date and Edit Link */}
          <Row>
            <Col>
              <Form.Group controlId="submit_publish_date">
                <Form.Label>Publish Date</Form.Label>
                <Form.Control
                  placeholder="Publish Year"
                  type="month"
                  onChange={this.formOnChangeHandler}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="submit_article_link">
                <Form.Label>Article Link</Form.Label>
                <Form.Control
                  placeholder="Article Link"
                  type="text"
                  onChange={this.formOnChangeHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Form Section to Methodologies */}
          <span>
            <strong>Methodologies</strong>
          </span>
          <hr />
          <Form.Group
            className="checkboxFormStyle"
            controlId="submit_methodologies"
          >
            {this.state.methodologies.map((methodology, index) => {
              return (
                <OverlayTrigger
                  key={index}
                  placement="left"
                  delay={{ show: 250, hide: 200 }}
                  overlay={<Tooltip>{methodology.description}</Tooltip>}
                >
                  <Form.Check
                    type="checkbox"
                    id={methodology.methodology_name}
                    value={methodology.methodology_name}
                    label={methodology.methodology_name}
                    onChange={(e) => {
                      this.checkboxOnChangeHandler(e, "submit_methodologies");
                    }}
                  />
                </OverlayTrigger>
              );
            })}
          </Form.Group>
          {/* Form Section to Methods */}
          <span>
            <strong>Methods</strong>
          </span>
          <hr />
          <Form.Group className="checkboxFormStyle" controlId="submit_methods">
            {this.state.methods.map((method, index) => {
              return (
                <OverlayTrigger
                  key={index}
                  placement="left"
                  delay={{ show: 250, hide: 200 }}
                  overlay={<Tooltip>{method.description}</Tooltip>}
                >
                  <Form.Check
                    type="checkbox"
                    id={method.method_name}
                    value={method.method_name}
                    label={method.method_name}
                    onChange={(e) => {
                      this.checkboxOnChangeHandler(e, "submit_methods");
                    }}
                  />
                </OverlayTrigger>
              );
            })}
          </Form.Group>
          {/* Form Section to Research Methods */}
          <span>
            <strong>Research Methods</strong>
          </span>
          <hr />
          <Form.Group
            className="checkboxFormStyle"
            controlId="submit_research_methods"
          >
            {this.state.research_methods.map((research_method, index) => {
              return (
                <Form.Check
                  key={index}
                  type="checkbox"
                  id={research_method.research_method_name}
                  value={research_method.research_method_name}
                  label={research_method.research_method_name}
                  onChange={(e) => {
                    this.checkboxOnChangeHandler(e, "submit_research_methods");
                  }}
                />
              );
            })}
          </Form.Group>
          {/* Form Section to Research Participants */}
          <span>
            <strong>Research Participants</strong>
          </span>
          <hr />
          <Form.Group
            className="checkboxFormStyle"
            controlId="submit_research_participants"
          >
            {this.state.research_participants.map((participant, index) => {
              return (
                <Form.Check
                  key={index}
                  type="checkbox"
                  id={participant.participant_type}
                  value={participant.participant_type}
                  label={participant.participant_type}
                  onChange={(e) => {
                    this.checkboxOnChangeHandler(
                      e,
                      "submit_research_participants"
                    );
                  }}
                />
              );
            })}
          </Form.Group>
          <Button
            type="submit"
            className="seer-button-styling m-3 pt-2 pb-2 pl-4 pr-4 float-right"
          >
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user_information: state.seerUserReducer.user_information,
});

const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps())(SubmissionPage);
