import "./ArticleQueue.css";
import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { init } from "emailjs-com";
import emailjs from "emailjs-com";
import swal from "@sweetalert/with-react";
import api from "../../api/api";

class ArticleQueue extends React.Component {
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

  // Function to Get All The Articles in the Queue from the Server
  getAllQueueArticles = async () => {
    try {
      let stage = "";
      switch (this.props.user_information.user_type) {
        case "moderator":
          stage = "moderation";
          break;
          
        case "analyst":
          stage = "analysis";
          break;

        default:
          break;
      }

      const queueArticles = await api.get("/articles?stage=" + stage);
      const methodologiesResponse = await api.get("/methodologies");
      const methodsResponse = await api.get("/methods");
      const rschMethodsResponse = await api.get("/research_methods");
      const rschParticipantsResponse = await api.get("/research_participants");

      // Setting the Articles State
      this._isMounted &&
        this.setState({
          articles: queueArticles.data,
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
    this._isMounted && this.getAllQueueArticles();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  assignArticle = (article_id) => {
    // Warning if the user wants to assign it to himself/herself
    swal({
      title: "Are you sure you want to assign Article to yourself?",
      text: "This article will be put into your Dashboard.",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then(async (value) => {
      if (value === true) {
        try {
          await api.patch("/articles/" + article_id, {
            assigned_to: this.props.user_information._id,
          });
          // No Problems with Approval
          swal({
            title: "Successful Assignment!",
            text: "Article Successfully assigned to yourself!",
            icon: "success",
            buttons: [false, true],
          });
          this.getAllQueueArticles();
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

  render() {
    init("user_ZuCRyzWfalPE8iWX4tLWc");

    var emailParams = {};
    if (this.props.user_type === "moderator") {
      emailParams = {
        from_name: "SEER Administration",
        to_name: "SEER Moderator",
        message:
          "There are new articles in the queue! Please review them at your earliest convienience.",
      };
    } else if (this.props.user_type === "analyst") {
      emailParams = {
        from_name: "SEER Administration",
        to_name: "SEER Analyst",
        message:
          "There are new articles in the queue! Please review them at your earliest convienience.",
      };
    }

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
                className="queueUserActions"
                variant="info"
                onClick={() => {
                  this.assignArticle(article._id);
                }}
              >
                Assign to Self
              </Button>
            </td>
          </tr>
        );
      });
    }

    return (
      <Container fluid className="queueSectionStyle">
        <h1 className="queueTableHeader">
          Unassigned{" "}
          {this.props.user_information.user_type.charAt(0).toUpperCase() +
            this.props.user_information.user_type.slice(1)}{" "}
          Articles
        </h1>
        <Table className="queueTableStyles" responsive bordered hover>
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

const mapStateToProps = (state) => ({
  isLoggedIn: state.seerUserReducer.isLoggedIn,
  user_information: state.seerUserReducer.user_information,
});

const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps())(ArticleQueue);
