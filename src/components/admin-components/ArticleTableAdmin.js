import "./AdminComponent.css";
import React from "react";
import { Container, Table, Button, Form, Row, Col } from "react-bootstrap";
import swal from "@sweetalert/with-react";
import { connect } from "react-redux";
import api from "../../api/api";

class ArticleTableAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      methodologies: [],
      methods: [],
      research_methods: [],
      research_participants: [],

      // Edit Values
      edit_stage: "",
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
      edit_methodologies: [],
      edit_methods: [],
      edit_research_methods: [],
      edit_research_participants: [],
    };

    // Prevents Memory Leaks
    this._isMounted = false;
  }

  // Function to Get All The Articles for Analysis from the Server
  getAllAdminArticles = async () => {
    try {
      const adminArticles = await api.get("/articles");
      const methodologiesResponse = await api.get("/methodologies");
      const methodsResponse = await api.get("/methods");
      const rschMethodsResponse = await api.get("/research_methods");
      const rschParticipantsResponse = await api.get("/research_participants");

      // Setting the Articles State
      this._isMounted &&
        this.setState({
          articles: adminArticles.data,
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
    this._isMounted && this.getAllAdminArticles();
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

  editArticle = (article) => {
    this.setState(
      {
        edit_stage: article.stage,
        edit_title: article.title,
        edit_document_type: article.document_type.join(","),
        edit_authors: article.authors.join(","),
        edit_journals: article.journals.join(","),
        edit_publisher: article.publisher,
        edit_volume: article.volume,
        edit_volume_number: article.volume_number,
        edit_start_page: article.start_page,
        edit_end_page: article.end_page,
        edit_article_link: article.article_link,
        edit_methodologies: article.methodologies.map((methodology) => {
          return methodology.methodology_name;
        }),
        edit_methods: article.methods.map((method) => {
          return method.method_name;
        }),
        edit_research_methods: article.research_methods.map(
          (research_method) => {
            return research_method.research_method_name;
          }
        ),
        edit_research_participants: article.participants.map((participant) => {
          return participant.participant_type;
        }),
      },
      () => {
        swal({
          title: "Edit Article",
          content: (
            <div className="multiFormStyle">
              {/* Form Section to Edit Stage */}
              <Form.Group controlId="edit_stage">
                <Form.Label>Stage</Form.Label>
                <Form.Control
                  placeholder="Stage"
                  as="select"
                  onChange={this.formOnChangeHandler}
                  defaultValue={article.stage ? article.stage : ""}
                >
                  <option value="analysis">Analysis</option>
                  <option value="moderation">Moderation</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </Form.Control>
              </Form.Group>
              {/* Form Section to Edit Title */}
              <Form.Group controlId="edit_title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  placeholder="Title"
                  as="textarea"
                  rows="2"
                  onChange={this.formOnChangeHandler}
                  defaultValue={article.title ? article.title : ""}
                />
              </Form.Group>
              {/* Form Section to Edit Document Type */}
              <Form.Group controlId="edit_document_type">
                <Form.Label>Document Type/s</Form.Label>
                <Form.Control
                  placeholder="Document Type/s"
                  type="text"
                  onChange={this.formOnChangeHandler}
                  defaultValue={
                    article.document_type ? article.document_type : ""
                  }
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
                  onChange={this.formOnChangeHandler}
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
                  onChange={this.formOnChangeHandler}
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
                  onChange={this.formOnChangeHandler}
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
                      min="0"
                      type="number"
                      onChange={this.formOnChangeHandler}
                      defaultValue={article.volume ? article.volume : ""}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="edit_volume_number">
                    <Form.Label>Volume Number</Form.Label>
                    <Form.Control
                      placeholder="Volume Number"
                      min="0"
                      type="number"
                      onChange={this.formOnChangeHandler}
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
                      min="0"
                      type="number"
                      onChange={this.formOnChangeHandler}
                      defaultValue={
                        article.start_page ? article.start_page : ""
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="edit_end_page">
                    <Form.Label>End Page</Form.Label>
                    <Form.Control
                      placeholder="End Page"
                      min="0"
                      type="number"
                      onChange={this.formOnChangeHandler}
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
                      onChange={this.formOnChangeHandler}
                      defaultValue={
                        article.publish_date
                          ? `${new Date(article.publish_date).getFullYear()}-${
                              new Date(article.publish_date).getMonth() + 1 < 10
                                ? `0${
                                    new Date(article.publish_date).getMonth() +
                                    1
                                  }`
                                : `${
                                    new Date(article.publish_date).getMonth() +
                                    1
                                  }`
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
                      onChange={this.formOnChangeHandler}
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
                  let check = this.state.edit_methodologies.indexOf(
                    methodology.methodology_name
                  );
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
                      defaultChecked={check !== -1}
                    />
                  );
                })}
              </Form.Group>
              {/* Form Section to Methods */}
              <span>
                <strong>Methods</strong>
              </span>
              <hr />
              <Form.Group
                className="checkboxFormStyle"
                controlId="edit_methods"
              >
                {this.state.methods.map((method, index) => {
                  let check = this.state.edit_methods.indexOf(
                    method.method_name
                  );
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
                      defaultChecked={check !== -1}
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
                  let check = this.state.edit_research_methods.indexOf(
                    research_method.research_method_name
                  );
                  return (
                    <Form.Check
                      key={index}
                      type="checkbox"
                      id={research_method.research_method_name}
                      value={research_method.research_method_name}
                      label={research_method.research_method_name}
                      onChange={(e) => {
                        this.checkboxOnChangeHandler(
                          e,
                          "edit_research_methods"
                        );
                      }}
                      defaultChecked={check !== -1}
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
                  let check = this.state.edit_research_participants.indexOf(
                    participant.participant_type
                  );
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
                      defaultChecked={check !== -1}
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
              let articleObj = {
                stage: this.state.edit_stage,
                title: this.state.edit_title,
                document_type: this.state.edit_document_type
                  .split(",")
                  .map(function (document_type) {
                    return document_type.trim();
                  }),
                authors: this.state.edit_authors
                  .split(",")
                  .map(function (author) {
                    return author.trim();
                  }),
                journals: this.state.edit_journals
                  .split(",")
                  .map(function (journal) {
                    return journal.trim();
                  }),
                publisher: this.state.edit_publisher,
                volume: this.state.edit_volume,
                volume_number: this.state.edit_volume_number,
                start_page: this.state.edit_start_page,
                end_page: this.state.edit_end_page,
                publish_date: this.state.edit_publish_date,
                article_link: this.state.edit_article_link,
                methodologies: this.state.edit_methodologies.map(
                  (methodology) => {
                    return { methodology_name: methodology };
                  }
                ),
                methods: this.state.edit_methods.map((method) => {
                  return { method_name: method };
                }),
                research_methods: this.state.edit_research_methods.map(
                  (research_method) => {
                    return { research_method_name: research_method };
                  }
                ),
                participants: this.state.edit_research_participants.map(
                  (participant) => {
                    return { participant_type: participant };
                  }
                ),
              };
              console.log(articleObj);
              await api.put("/articles/" + article._id, articleObj);

              // No Problems with Editing
              swal({
                title: "Successfully Edited!",
                text: "Article Successfully Edited!",
                icon: "success",
                buttons: [false, true],
              });
              // Clear All The Editing States if Cancelled
              this.setState({
                edit_stage: "",
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
              this.getAllAdminArticles();
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
              edit_stage: "",
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
      }
    );
  };

  approveArticle = (article_id, from_stage) => {
    // Warning if the adnub wants to be sure in the approval
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
          this.getAllAdminArticles();
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

  rejectArticle = (article_id, from_stage) => {
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
          this.getAllAdminArticles();
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

  deleteArticle = (article_id) => {
    // Warning if the admin wants to be sure in the deletion
    swal({
      title: "Are you sure you want to delete Article?",
      text: "The article will be deleted forever.",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then(async (value) => {
      if (value === true) {
        try {
          await api.delete("/articles/" + article_id);
          // No Problems with Deletion
          swal({
            title: "Successful Deletion!",
            text: "Article Successfully Deleted!",
            icon: "success",
            buttons: [false, true],
          });
          this.getAllAdminArticles();
        } catch (error) {
          // Error with Deletion
          swal({
            title: "Unsuccessful Deletion!",
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
        let stageColor = "";
        switch (article.stage) {
          case "moderation":
            stageColor = "#fff3cd";
            break;

          case "analysis":
            stageColor = "#d1ecf1";
            break;

          case "rejected":
            stageColor = "#f8d7da";
            break;

          case "approved":
            stageColor = "#d4edda";
            break;

          default:
            stageColor = "";
            break;
        }
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td style={{ backgroundColor: stageColor }}>{article.stage}</td>
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
            <td>
              {article.methodologies
                .map((methodology) => {
                  return methodology.methodology_name;
                })
                .join(", ")}
            </td>
            <td>
              {article.methods
                .map((method) => {
                  return method.method_name;
                })
                .join(", ")}
            </td>
            <td>
              {article.research_methods
                .map((research_method) => {
                  return research_method.research_method_name;
                })
                .join(", ")}
            </td>
            <td>
              {article.participants
                .map((participant) => {
                  return participant.participant_type;
                })
                .join(", ")}
            </td>
            <td>{article.article_link}</td>
            <td className="adminActionStyle">
              <Button
                className="adminSectionStyle"
                variant="secondary"
                onClick={() => {
                  this.editArticle(article);
                }}
              >
                Edit
              </Button>
              <Button
                className="adminSectionStyle"
                variant="success"
                onClick={() => {
                  this.approveArticle(article._id, article.stage);
                }}
                disabled={article.stage === "approved"}
              >
                Approve
              </Button>
              <Button
                className="adminSectionStyle"
                variant="warning"
                onClick={() => {
                  this.rejectArticle(article._id, article.stage);
                }}
                disabled={article.stage === "rejected"}
              >
                Reject
              </Button>
              <Button
                className="adminSectionStyle"
                variant="danger"
                onClick={() => {
                  this.deleteArticle(article._id);
                }}
              >
                Remove
              </Button>
            </td>
          </tr>
        );
      });
    }

    return (
      <Container fluid className="adminSectionStyle">
        <h1 className="adminTableHeader">Admin Articles</h1>
        <Table className="adminTableStyles" responsive bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Stage</th>
              <th>Title</th>
              <th>Document Type</th>
              <th>Authors</th>
              <th>Journals</th>
              <th>Publisher</th>
              <th>Volume</th>
              <th>Article Page/s</th>
              <th>Publish Date</th>
              <th>SE Methodologies</th>
              <th>SE Methods</th>
              <th>Research Methods</th>
              <th>Research Participants</th>
              <th>Article Link</th>
              <th className="adminActionStyle">Actions</th>
            </tr>
          </thead>
          <tbody>{articlesArray}</tbody>
        </Table>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  user_information: state.seerUserReducer.user_information,
});

const mapDispatchToProps = () => {};

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(ArticleTableAdmin);
