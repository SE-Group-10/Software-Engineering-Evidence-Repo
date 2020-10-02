import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import swal from "@sweetalert/with-react";
import api from "../../api/api";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      user_name: "",
      email: "",
      password: "",
      confirm_password: "",
      affiliation: "",
      user_type: "user", // Default Value
    };
  }

  // Updates States for Register Forms
  formOnChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  // Updates States for Register Forms
  radioOnChangeHandler = (e) => {
    this.setState({
      user_type: e.target.value,
    });
  };

  // Function to Submit Register Form
  onSubmit = async (event) => {
    event.preventDefault();
    if (this.state.password === this.state.confirm_password) {
      let userObject = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        user_name: this.state.user_name,
        email: this.state.email,
        password: this.state.password,
        affiliation: this.state.affiliation,
        user_type: this.state.user_type,
      };
      try {
        await api.post("/users", userObject);
        // Successful Sign In!
        swal({
          title: "Registration Successful!",
          text: "Redirecting you to login page...",
          icon: "success",
          timer: 3000,
          buttons: [false, true],
          closeOnClickOutside: false,
          closeOnEsc: false,
        }).then(() => {
          window.location = "/login";
        });
      } catch (e) {
        // Error with Signing up
        swal({
          title: "Registration Unsuccessful!",
          text: "Something went wrong with registrating your account!",
          icon: "error",
          buttons: [false, true],
        });
      }
    } else {
      // Error with Signing up (Password is not the same)
      swal({
        title: "Registration Unsuccessful!",
        text: "Passwords are not the same!",
        icon: "error",
        buttons: [false, true],
      });
    }
  };

  render() {
    return (
      <Container>
        <h1 style={{ textAlign: "center", color: "#00994C" }}>
          {" "}
          Register with SEER
        </h1>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="first_name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="John"
              value={this.state.first_name}
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Doe"
              value={this.state.last_name}
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="user_name">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Username"
              value={this.state.user_name}
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="john.doe@gmail.com"
              value={this.state.email}
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password must be 8 or more characters"
              value={this.state.password}
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="confirm_password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password must be 8 or more characters"
              value={this.state.confirm_password}
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="affiliation">
            <Form.Label>Affilitiation</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter your company, school or university"
              value={this.state.affiliation}
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="chooseAccountType">
            <Form.Label>Select your account type:</Form.Label>
            <Form.Check
              required
              type="radio"
              label="Standard User"
              name="account_type"
              value="user"
              id="user_radio"
              onChange={this.radioOnChangeHandler}
            />
            <Form.Check
              required
              type="radio"
              label="Analyst (SERL Members only)"
              name="account_type"
              value="analyst"
              id="analyst_radio"
              onChange={this.radioOnChangeHandler}
            />
            <Form.Check
              required
              type="radio"
              label="Moderator (requires authentication)"
              name="account_type"
              value="moderator"
              id="moderator_radio"
              onChange={this.radioOnChangeHandler}
            />
            <Form.Check
              required
              type="radio"
              label="Administrator (requires authentication)"
              name="account_type"
              value="administrator"
              id="administrator_radio"
              onChange={this.radioOnChangeHandler}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Container>
    );
  }
}

export default RegisterForm;
