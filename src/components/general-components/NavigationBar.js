import React from "react";
import "./NavigationBar.css";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signout } from "../../actions";

class NavigationBar extends React.Component {
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
      <Navbar collapseOnSelect expand="lg" className="navBar">
        <LinkContainer to="/home">
          <Navbar.Brand>
            <img
              alt="SEER Logo"
              src={require("../../assets/logos/Logo_Style1.png")}
              className="d-inline-block align-top"
              id="navbar_logo"
            />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {this.props.isLoggedIn &&
              this.props.user_information.user_type !== "user" && (
                <LinkContainer to="/dashboard">
                  <Nav.Link className="nav-link">Dashboard</Nav.Link>
                </LinkContainer>
              )}
            <Form inline id="navbar-search" onSubmit={this.onSubmit}>
              <Form.Group controlId="title">
                <FormControl
                  required
                  type="text"
                  placeholder="Enter a keyword to quick search"
                  className="mr-sm-2 ml-2"
                  value={this.state.title}
                  onChange={this.formOnChangeHandler}
                />
                <Button variant="outline-success" type="submit">
                  {" "}
                  <img
                    alt="search"
                    src={require("../../assets/icons/search_icon.svg")}
                    id="search_icon"
                  />{" "}
                </Button>
              </Form.Group>
            </Form>
          </Nav>
          <img
            alt="circle"
            src={require("../../assets/icons/placeholder_circle.png")}
            id="login_placeholder"
          />
          {!this.props.isLoggedIn ? (
            <React.Fragment>
              <LinkContainer to="/login">
                <Button className="nav_button">Login</Button>
              </LinkContainer>
              <LinkContainer to="/sign-up">
                <Button className="nav_button">Sign Up</Button>
              </LinkContainer>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <LinkContainer to="/article-posting">
                <Button className="nav_button">Post An Article</Button>
              </LinkContainer>
              <LinkContainer
                to="/home"
                className="nav_button"
                onClick={() => {
                  this.props.signout();
                }}
              >
                <Button className="nav_button">Logout</Button>
              </LinkContainer>
            </React.Fragment>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.seerUserReducer.isLoggedIn,
  user_information: state.seerUserReducer.user_information,
});

const mapDispatchToProps = () => {
  return {
    signout,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(NavigationBar);
