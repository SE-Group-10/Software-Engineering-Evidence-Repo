import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import bcrypt from "bcryptjs";
import swal from "@sweetalert/with-react";
import { connect } from "react-redux";
import api from "../../api/api";
import { signin } from "../../actions";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  // Updates States for Login Forms
  formOnChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  // Function to Login
  onSubmit = async (event) => {
    event.preventDefault();
    try {
      const userResponse = await api.get(`/users/${this.state.email}`);
      if (userResponse.data) {
        bcrypt.compare(
          this.state.password,
          userResponse.data.password,
          (err, result) => {
            if (err || !result) {
              // Error with Signing up
              swal({
                title: "Login Unsuccessful!",
                text: "Please input a valid email and password",
                icon: "error",
                buttons: [false, true],
              });
            } else {
              let userData = {
                _id: userResponse.data._id,
                user_type: userResponse.data.user_type,
                email: userResponse.data.email,
                affiliation: userResponse.data.affiliation,
                first_name: userResponse.data.first_name,
                last_name: userResponse.data.last_name,
                saved_searches: userResponse.data.saved_searches,
              };
              // Error with Signing up
              swal({
                title: "Login Successful!",
                text: "You are now logged in! Redirecting to your dashboard...",
                icon: "success",
                timer: 3000,
                buttons: [false, true],
                closeOnClickOutside: false,
                closeOnEsc: false,
              }).then(async () => {
                this.setState({ redirect: true });
                this.props.signin(userData);
              });
            }
          }
        );
      } else {
        // Error with Signing up
        swal({
          title: "Login Unsuccessful!",
          text: "Please input a valid email and password",
          icon: "error",
          buttons: [false, true],
        });
      }
    } catch (error) {
      // Server Error with Logging In
      swal({
        title: "Login Unsuccessful!",
        text: error?.response?.data || "Unknown Error",
        icon: "error",
        buttons: [false, true],
      });
    }
  };

  render() {
    // Redirect to home if logged in
    if (this.state.redirect || this.props.isLoggedIn) {
      return <Redirect to="dashboard" />;
    }

    return (
      <Container>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Remember Me"
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.seerUserReducer.isLoggedIn,
});

const mapDispatchToProps = () => {
  return {
    signin,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(LoginForm);
