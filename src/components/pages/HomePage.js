import React from "react";
import "./HomePage.css";
import {
  Container,
  Image,
  Row,
  Col,
  Button,
  // Form,
  // FormControl,
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import NavBar2 from "../general-components/NavBar2.js";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      searchQuery: "",
      redirect: false,
    };
  }

  // Updates States for Register Forms
  formOnChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  // Function to do a quick search for a title
  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.title) {
      this.setState({
        searchQuery: this.state.searchQuery + `title=${this.state.title}`,
      });
    }
    this.setState({
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
    return (
      <div>
        <NavBar2 />
        <div className="homepageHeader">
          {/* Home Section */}
          <Container className="firstHomePageSection" fluid>
            <Row>
              <Col xs={6}>
                <Image src={require("../../assets/SEER_Homepage.png")} fluid />
              </Col>
              <Col xs={6} className="welcome-to-seer">
                <h1>Welcome to SEER!</h1>
                <br />
                <h3>
                  {" "}
                  A repository for Software Engineers to search for articles,
                  journals or research papers for evidences to support their
                  ideas.
                </h3>
                <br />
                <br />
                <h3> Brought to you by</h3>
                <img
                  src={require("../../assets/logos/AUT_Logo.png")}
                  alt="AUT Logo"
                  style={{
                    height: "80px",
                    width: "auto",
                  }}
                />
                <img
                  src={require("../../assets/logos/SERL_Logo.png")}
                  alt="SERL Logo"
                  style={{
                    height: "80px",
                    width: "auto",
                  }}
                />
              </Col>
            </Row>
          </Container>
          {/* Why Section */}
          <Container className="whySectionStyle" fluid>
            <h1>Why SEER?</h1>
            <Row>
              <Col xs={6}>
                <Image src={require("../../assets/SEER_Homepage.png")} fluid />
              </Col>
              <Col xs={6}>
                <h2>Paragraph 1</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <h2>Paragraph 2</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </Col>
              <Col xs={6}>
                <Image src={require("../../assets/SEER_Homepage.png")} fluid />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Image src={require("../../assets/SEER_Homepage.png")} fluid />
              </Col>
              <Col xs={6}>
                <h2>Paragraph 3</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </Col>
            </Row>
          </Container>
          {/* Member Benefits Section */}
          <Container className="memberBenefitsStyle" fluid>
            <h1>Member Benefits</h1>
            <Row>
              <p>
                While browsing our repository is offered completely free to
                anyone, you can get a few more benefits by signing up for an
                account.
              </p>
            </Row>
            <Row className="benefitsListStyle">
              <Col xs={6}>
                <h2>Propose new content</h2>
                <br />
                <p>
                  Found an informative and helpful article? Use the suggestion
                  feature to propose its addition to the repository to help
                  other users with their research.
                </p>
              </Col>
              <Col xs={6}>
                <h2>Receive updates</h2>
                <br />
                <p>
                  Receive email updates on your searches, article suggestions
                  and SEER's changes in service or policies. Optionally, there
                  is also a monthly newsletter with article suggestions and a
                  short digest by our SERL staff.
                </p>
              </Col>
              <Col xs={6}>
                <h2>Save queries</h2>
                <br />
                <p>
                  As a member you can save search queries and bookmark search
                  results in order to quickly access them in the future.
                </p>
              </Col>
              <Col xs={6}>
                <h2>Reviews & Ratings</h2>
                <br />
                <p>
                  Once verified, members will be able to rate articles and give
                  them a short review. This will help SERL identify good
                  articles to promote or bad articles to remove.
                </p>
              </Col>
            </Row>
          </Container>
          <Container className="registerNowStyle" fluid>
            <Button>Register Now</Button>{" "}
            <p>
              Are you a SERL member? <a href="./">Sign in via AUT here.</a>
            </p>
          </Container>
        </div>
      </div>
    );
  }
}

export default HomePage;
