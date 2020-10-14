import React from "react";
import "./NavigationBar.css";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


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
            <LinkContainer to="/dashboard">
              <Nav.Link className="nav-link">Dashboard</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/search">
              <Nav.Link> Advanced Search</Nav.Link>
            </LinkContainer>
          </Nav>
          <img
            src={require("../../assets/icons/placeholder_circle.png")}
            id="login_placeholder"
          />
      </Navbar.Collapse>
    </Navbar>
  );
  }
};

export default NavBar2;
