import React from "react";
import "./NavigationBar.css";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../../actions";

class NavigationBar extends React.Component {
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
            {this.props.isLoggedIn && (
              <LinkContainer to="/dashboard">
                <Nav.Link className="nav-link">Dashboard</Nav.Link>
              </LinkContainer>
            )}
            <LinkContainer to="/search">
              <Nav.Link>Advanced Search</Nav.Link>
            </LinkContainer>
            <Form inline id="navbar-search" onSubmit={this.onSubmit}>
              <Form.Group controlId="title">
                <FormControl
                  required
                  type="text"
                  placeholder="Enter a keyword to quick search"
                  className="mr-sm-2"
                  value={this.state.title}
                  onChange={this.formOnChangeHandler}
                />
                <Link
                  to={{
                    pathname: "search-result",
                    search: `?search_type=any&title=${this.state.title}`,
                  }}
                >
                  <Button variant="outline-success" type="submit">
                    {" "}
                    <img
                      alt="search"
                      src={require("../../assets/icons/search_icon.svg")}
                      id="search_icon"
                    />{" "}
                  </Button>
                </Link>
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
            <LinkContainer
              to="/home"
              className="nav_button"
              onClick={() => {
                this.props.signout();
              }}
            >
              <Button className="nav_button">Logout</Button>
            </LinkContainer>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.seerUserReducer.isLoggedIn,
});

const mapDispatchToProps = () => {
  return {
    signout,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(NavigationBar);
