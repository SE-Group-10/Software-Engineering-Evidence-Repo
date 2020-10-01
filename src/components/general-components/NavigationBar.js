import React from "react";
import "./NavigationBar.css";
import {
  Nav,
  Navbar,
  Form,
  FormControl,
  Button
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavigationBar = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="navBar"
    >
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
          <LinkContainer to="/search-result">
            <Nav.Link> Result</Nav.Link>
          </LinkContainer>
            <Nav.Link id="q_search">Quick Search: </Nav.Link> 
          <Form inline id="navbar-search">
            <FormControl type="text" placeholder="Article, book or website" className="mr-sm-2" />
            <Button variant="outline-success"><img src={require("../../assets/icons/search_icon.svg")} id="search_icon"/></Button>
          </Form>
        </Nav>
        <img src={require("../../assets/icons/placeholder_circle.png")} id="login_placeholder" />
        <LinkContainer to="/sign-up">
          <Button id="nav_button">Sign Up</Button>
        </LinkContainer>
        <LinkContainer to="/login">
          <Button id="nav_button">Login</Button>
        </LinkContainer>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
