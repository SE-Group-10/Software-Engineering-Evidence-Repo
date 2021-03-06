import React from "react";
import "./NavigationBar.css";
import { Nav, Navbar, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { signout } from "../../actions";

class NavBar2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
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
  };

  render() {
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
            {this.props.isLoggedIn &&
              (this.props.user_information.user_type === "moderator" ||
                this.props.user_information.user_type === "analyst") && (
                <LinkContainer to="/article-queue">
                  <Nav.Link className="nav-link">Article Queue</Nav.Link>
                </LinkContainer>
              )}
            <LinkContainer to="/search-result">
              <Nav.Link>Advanced Search</Nav.Link>
            </LinkContainer>
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

export default connect(mapStateToProps, mapDispatchToProps())(NavBar2);
