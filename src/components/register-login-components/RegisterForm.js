import React from "react";
import { Container, Form, Button } from "react-bootstrap";

const RegisterForm = () => {
  return (
    <Container>
      <h1 style={{ textAlign:'center',
                  color:'#00994C'}}> Register with SEER</h1>
      <Form>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="John" />
        </Form.Group>       
        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Doe" />
        </Form.Group>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter Username" />
        </Form.Group>   
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="john.doe@gmail.com" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password must be 8 or more characters" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Affilitiation</Form.Label>
          <Form.Control type="text" placeholder="Enter your company, school or university" />
        </Form.Group>  
        <Form.Label>Select your account type:</Form.Label> 
        <Form.Group controlId="formBasicRadiobox">
          <Form.Check type="radio" label="Standard User" name="account_type"/>
          <Form.Check type="radio" label="Analyst (SERL Members only)" name="account_type"/>
          <Form.Check type="radio" label="Moderator (requires authentication)" name="account_type" />
          <Form.Check type="radio" label="Administrator (requires authentication)" name="account_type" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterForm;
