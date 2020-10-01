import React from "react";
import { Container, Form, Button } from "react-bootstrap";

const RegisterForm = () => {
  return (
    <Container>
      <Form>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter First Name" />
        </Form.Group>       
        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Last Name" />
        </Form.Group>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter Username" />
        </Form.Group>   
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Affilitiation</Form.Label>
          <Form.Control type="text" placeholder="Affilitiation" />
        </Form.Group>   
        <Form.Group controlId="formBasicRadiobox">
          <Form.Check type="radio" label="Moderator" />
        </Form.Group>
        <Form.Group controlId="formBasicRadiobox">
          <Form.Check type="radio" label="Admin" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterForm;
