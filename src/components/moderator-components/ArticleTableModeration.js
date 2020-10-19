import "./ModeratorComponent.css";
import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import { init } from "emailjs-com";
import emailjs from "emailjs-com";
import swal from "@sweetalert/with-react";
import api from "../../api/api";

class ArticleTableModeration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      methodologies: [],
      methods: [],
      research_methods: [],
      research_participants: [],
    };

    // Prevents Memory Leaks
    this._isMounted = false;
  }

  // Function to Get All The Articles for Moderation from the Server
  getAllModeratorArticles = async () => {
    try {
      const moderationArticles = await api.get("/articles?stage=moderation");
      const methodologiesResponse = await api.get("/methodologies");
      const methodsResponse = await api.get("/methods");
      const rschMethodsResponse = await api.get("/research_methods");
      const rschParticipantsResponse = await api.get("/research_participants");

      // Setting the Articles State
      this._isMounted &&
        this.setState({
          articles: moderationArticles.data,
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
    this._isMounted && this.getAllModeratorArticles();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  approveArticle = (article_id) => {
    // Warning if the moderator wants to be sure in the approval
    swal({
      title: "Are you sure you want to approve Article?",
      text: "This article will be put into the Analysis Stage.",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then(async (value) => {
      if (value === true) {
        try {
          await api.patch("/articles/" + article_id, {
            stage: "analysis",
          });
          // No Problems with Approval
          swal({
            title: "Successful Approval!",
            text: "Article Successfully Put into the Analysis Stage!",
            icon: "success",
            buttons: [false, true],
          });
          this.getAllModeratorArticles();
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
    // Warning if the moderator wants to be sure in the rejection
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
          this.getAllModeratorArticles();
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
    init("user_ZuCRyzWfalPE8iWX4tLWc");
    var emailParams = {
      from_name: "SEER Administration",
      to_name: "SEER Moderator",
      message:
        "There are new articles in the queue! Please review them at your earliest convienience.",
    };

    if (this.state.articles && this.state.articles.length) {
      emailjs.send("service_r51m1de", "template_76mpnxr", emailParams).then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
    }

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
            <td>
              <Button
                className="moderatorUserActions"
                variant="success"
                onClick={() => {
                  this.approveArticle(article._id);
                }}
              >
                Approve
              </Button>
              <Button
                className="moderatorUserActions"
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
      <Container fluid className="moderatorSectionStyle">
        <h1 className="moderatorTableHeader">Moderator Articles</h1>
        <Table className="moderatorTableStyles" responsive bordered hover>
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
              <th>SE Methodologies</th>
              <th>SE Methods</th>
              <th>Research Methods</th>
              <th>Research Participants</th>
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

export default ArticleTableModeration;
