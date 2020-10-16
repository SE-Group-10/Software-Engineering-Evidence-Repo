import "./AnalystComponent.css";
import React from "react";
import { Container, Table, Button, Form, Row, Col } from "react-bootstrap";
import swal from "@sweetalert/with-react";
import api from "../../api/api";

class ArticlesTableAnalyst extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      methodologies: [],
      methods: [],
      research_methods: [],
      research_participants: [],

      // Edit Values
      edit_title: "",
      edit_document_type: [],
      edit_authors: [],
      edit_journals: [],
      edit_publisher: "",
      edit_volume: "",
      edit_volume_number: "",
      edit_start_page: "",
      edit_end_page: "",
      edit_publish_date: "",
      edit_article_link: "",
      edit_methodologies: [],
      edit_methods: [],
      edit_research_methods: [],
      edit_research_participants: [],
    };

    // Prevents Memory Leaks
    this._isMounted = false;
  }

  // Function to Get All The Articles for Analysis from the Server
  getAllAnalystArticles = async () => {
    try {
      const analysisArticles = await api.get("/articles?stage=analysis");
      const methodologiesResponse = await api.get("/methodologies");
      const methodsResponse = await api.get("/methods");
      const rschMethodsResponse = await api.get("/research_methods");
      const rschParticipantsResponse = await api.get("/research_participants");

      // Setting the Articles State
      this._isMounted &&
        this.setState({
          articles: analysisArticles.data,
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
    this._isMounted && this.getAllAnalystArticles();
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
    console.log(this.state[type]);
  };

  editArticle = (article) => {
    this.setState({
      edit_methodologies: article.article_evidence_items.methodology
        ? article.article_evidence_items.methodology
        : [],
      edit_methods: article.article_research_designs.method
        ? article.article_research_designs.method
        : [],
      edit_research_methods: article.article_research_designs.research_methods
        ? article.article_research_designs.research_methods
        : [],
      edit_research_participants: article.article_research_designs.participants
        ? article.article_research_designs.participants
        : [],
    });
    swal({
      title: "Edit Article",
      content: (
        <div className="multiFormStyle">
          {/* Form Section to Edit Title */}
          <Form.Group controlId="edit_title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Title"
              type="text"
              defaultValue={article.title ? article.title : ""}
            />
          </Form.Group>
          {/* Form Section to Edit Document Type */}
          <Form.Group controlId="edit_document_type">
            <Form.Label>Document Type/s</Form.Label>
            <Form.Control
              placeholder="Document Type/s"
              type="text"
              defaultValue={article.document_type ? article.document_type : ""}
            />
            <Form.Text className="text-muted">
              If multiple document types, separate by comma.
            </Form.Text>
          </Form.Group>
          {/* Form Section to Edit Authors */}
          <Form.Group controlId="edit_authors">
            <Form.Label>Author/s</Form.Label>
            <Form.Control
              placeholder="Author/s"
              type="text"
              defaultValue={article.authors ? article.authors : ""}
            />
            <Form.Text className="text-muted">
              If multiple authors, separate by comma.
            </Form.Text>
          </Form.Group>
          {/* Form Section to Edit Journals */}
          <Form.Group controlId="edit_journals">
            <Form.Label>Journal/s</Form.Label>
            <Form.Control
              placeholder="Journal/s"
              type="text"
              defaultValue={article.journals ? article.journals : ""}
            />
            <Form.Text className="text-muted">
              If multiple journals, separate by comma.
            </Form.Text>
          </Form.Group>
          {/* Form Section to Edit Publisher */}
          <Form.Group controlId="edit_publisher">
            <Form.Label>Publisher</Form.Label>
            <Form.Control
              placeholder="Publisher"
              type="text"
              defaultValue={article.publisher ? article.publisher : ""}
            />
          </Form.Group>
          {/* Form Section to Edit Volumes */}
          <Row>
            <Col>
              <Form.Group controlId="edit_volume">
                <Form.Label>Volume</Form.Label>
                <Form.Control
                  placeholder="Volume"
                  type="number"
                  defaultValue={article.volume ? article.volume : ""}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="edit_volume_number">
                <Form.Label>Volume Number</Form.Label>
                <Form.Control
                  placeholder="Volume Number"
                  type="number"
                  defaultValue={
                    article.volume_number ? article.volume_number : ""
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Form Section to Edit Pages */}
          <Row>
            <Col>
              <Form.Group controlId="edit_start_page">
                <Form.Label>Start Page</Form.Label>
                <Form.Control
                  placeholder="Start Page"
                  type="number"
                  defaultValue={article.start_page ? article.start_page : ""}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="edit_end_page">
                <Form.Label>End Page</Form.Label>
                <Form.Control
                  placeholder="End Page"
                  type="number"
                  defaultValue={article.end_page ? article.end_page : ""}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Form Section to Publish Date and Edit Link */}
          <Row>
            <Col>
              <Form.Group controlId="edit_publish_date">
                <Form.Label>Publish Date</Form.Label>
                <Form.Control
                  placeholder="Publish Year"
                  type="month"
                  defaultValue={
                    article.publish_date
                      ? `${new Date(article.publish_date).getFullYear()}-${
                          new Date(article.publish_date).getMonth() + 1 < 10
                            ? `0${
                                new Date(article.publish_date).getMonth() + 1
                              }`
                            : `${new Date(article.publish_date).getMonth() + 1}`
                        }`
                      : ""
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="edit_article_link">
                <Form.Label>Article Link</Form.Label>
                <Form.Control
                  placeholder="Article Link"
                  type="text"
                  defaultValue={
                    article.article_link ? article.article_link : ""
                  }
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
            controlId="edit_methodologies"
          >
            {this.state.methodologies.map((methodology, index) => {
              let check;
              for (var i = 0; i < this.state.edit_methodologies.length; i++) {
                if (
                  this.state.edit_methodologies[i] ===
                  methodology.methodology_name
                ) {
                  check = true;
                }
              }
              return (
                <Form.Check
                  key={index}
                  type="checkbox"
                  id={methodology.methodology_name}
                  value={methodology.methodology_name}
                  label={methodology.methodology_name}
                  onChange={(e) => {
                    this.checkboxOnChangeHandler(e, "edit_methodologies");
                  }}
                  checked={check}
                />
              );
            })}
          </Form.Group>
          {/* Form Section to Methods */}
          <span>
            <strong>Methods</strong>
          </span>
          <hr />
          <Form.Group className="checkboxFormStyle" controlId="edit_methods">
            {this.state.methods.map((method, index) => {
              let check;
              for (var i = 0; i < this.state.edit_methods.length; i++) {
                if (this.state.edit_methods[i] === method.method_name) {
                  check = true;
                }
              }
              return (
                <Form.Check
                  key={index}
                  type="checkbox"
                  id={method.method_name}
                  value={method.method_name}
                  label={method.method_name}
                  onChange={(e) => {
                    this.checkboxOnChangeHandler(e, "edit_methods");
                  }}
                  checked={check}
                />
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
            controlId="edit_research_methods"
          >
            {this.state.research_methods.map((research_method, index) => {
              let check;
              for (
                var i = 0;
                i < this.state.edit_research_methods.length;
                i++
              ) {
                if (
                  this.state.edit_research_methods[i] ===
                  research_method.research_method_name
                ) {
                  check = true;
                }
              }
              return (
                <Form.Check
                  key={index}
                  type="checkbox"
                  id={research_method.research_method_name}
                  value={research_method.research_method_name}
                  label={research_method.research_method_name}
                  onChange={(e) => {
                    this.checkboxOnChangeHandler(e, "edit_research_methods");
                  }}
                  checked={check}
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
            controlId="edit_research_participants"
          >
            {this.state.research_participants.map((participant, index) => {
              let check;
              for (
                var i = 0;
                i < this.state.edit_research_participants.length;
                i++
              ) {
                if (
                  this.state.edit_research_participants[i] ===
                  participant.participant_type
                ) {
                  check = true;
                }
              }
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
                      "edit_research_participants"
                    );
                  }}
                  checked={check}
                />
              );
            })}
          </Form.Group>
        </div>
      ),
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: [true, "Edit"],
    }).then(async (value) => {
      if (value === true) {
        try {
          // Edit The Article
          // let articleObj = {
          //   methodology_name: methodology_name,
          //   description: description,
          // };
          // await api.patch("/articles/" + article._id, articleObj);

          // No Problems with Editing
          swal({
            title: "Successfully Edited!",
            text: "Article Successfully Edited!",
            icon: "success",
            buttons: [false, true],
          });
          this.getAllAnalystArticles();
        } catch (error) {
          // Error with Editing
          swal({
            title: "Unsuccessful Edit!",
            text: error?.response?.data || "Unknown Error",
            icon: "error",
            buttons: [false, true],
          });
        }
      } else {
        // Clear All The Editing States if Cancelled
        this.setState({
          edit_title: "",
          edit_document_type: "",
          edit_authors: "",
          edit_journals: "",
          edit_publisher: "",
          edit_volume: "",
          edit_volume_number: "",
          edit_start_page: "",
          edit_end_page: "",
          edit_publish_date: "",
          edit_article_link: "",
          edit_articles: [],
          edit_methodologies: [],
          edit_methods: [],
          edit_research_methods: [],
          edit_research_participants: [],
        });
      }
    });
  };

  approveArticle = (article_id) => {
    // Warning if the analyst wants to be sure in the approval
    swal({
      title: "Are you sure you want to approve Article?",
      text: "This article will be put into the Approved Stage.",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then(async (value) => {
      if (value === true) {
        try {
          await api.patch("/articles/" + article_id, {
            stage: "approved",
          });
          // No Problems with Approval
          swal({
            title: "Successful Approval!",
            text: "Article Successfully Put into the Approved Stage!",
            icon: "success",
            buttons: [false, true],
          });
          this.getAllAnalystArticles();
        } catch (error) {
          // Error with Approval
          swal({
            title: "Unsuccessful Approval!",
            text: error?.response?.data || "Unknown Error",
            icon: "error",
            buttons: [false, true],
          });
        }
      }
    });
  };

  rejectArticle = (article_id) => {
    // Warning if the admin wants to be sure in the rejection
    swal({
      title: "Are you sure you want to reject Article?",
      text: "This article will be put into a Rejected Stage.",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then(async (value) => {
      if (value === true) {
        try {
          await api.patch("/articles/" + article_id, {
            stage: "rejected",
          });
          // No Problems with Rejection
          swal({
            title: "Successful Rejection!",
            text: "Article Successfully Put to Rejection Stage!",
            icon: "success",
            buttons: [false, true],
          });
          this.getAllAnalystArticles();
        } catch (error) {
          // Error with Rejection
          swal({
            title: "Unsuccessful Rejection!",
            text: error?.response?.data || "Unknown Error",
            icon: "error",
            buttons: [false, true],
          });
        }
      }
    });
  };

  render() {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let articlesArray = [];
    if (this.state.articles) {
      articlesArray = this.state.articles.map((article, index) => {
        let publish_date = new Date(article.publish_date);
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{article.title}</td>
            <td>{article.document_type.join(", ")}</td>
            <td>{article.authors.join(", ")}</td>
            <td>{article.journals.join(", ")}</td>
            <td>{article.publisher}</td>
            <td>
              {article.volume} - {article.volume_number}
            </td>
            <td>
              {article.start_page} - {article.end_page}
            </td>
            <td>
              {article.publish_date &&
                `${
                  monthNames[publish_date.getMonth()]
                }, ${publish_date.getFullYear()}`}
            </td>
            <td>{article.article_evidence_items.join(", ")}</td>
            <td>{article.article_research_designs.join(", ")}</td>
            <td>{article.article_link}</td>
            <td>
              <Button
                className="analystUserActions"
                variant="secondary"
                onClick={() => {
                  this.editArticle(article);
                }}
              >
                Edit
              </Button>
              <Button
                className="analystUserActions"
                variant="success"
                onClick={() => {
                  this.approveArticle(article._id);
                }}
              >
                Approve
              </Button>
              <Button
                className="analystUserActions"
                variant="danger"
                onClick={() => {
                  this.rejectArticle(article._id);
                }}
              >
                Reject
              </Button>
            </td>
          </tr>
        );
      });
    }

    return (
      <Container fluid className="analystSectionStyle">
        <h1 className="analystTableHeader">Analyst Articles</h1>
        <Table className="analystTableStyles" responsive bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Document Type</th>
              <th>Authors</th>
              <th>Journals</th>
              <th>Publisher</th>
              <th>Volume</th>
              <th>Article Page/s</th>
              <th>Publish Date</th>
              <th>Article Evidence Items</th>
              <th>Article Research Designs</th>
              <th>Article Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{articlesArray}</tbody>
        </Table>
      </Container>
    );
  }
}

export default ArticlesTableAnalyst;
