import React from "react";
import { Container, Form, FormControl, Button } from "react-bootstrap";
import {Link} from "react-router-dom";

const HomePage = () => {
  return (
    <Container style={{
      textAlign: 'center',
      paddingTop: '10vh',
      width: '100vw',
      color: '#00994C'
    }}>
      <div className="homepageHeader">
        <h1> Welcome to SEER! </h1>
        <br />
        <h2> A repository for Software Engineers to search for articles, <br />
        journals or research papers for evidences to support their ideas.</h2>
      </div>

      <div className="homepageCTA" style={{ marginTop: '10vh'}}>
      <h2> What are you looking for? </h2>
      <Form inline id="navbar-search" style={{ display: 'block',
                                              marginLeft: 'auto',
                                              marginRight:'auto',
                                            }}>
        <FormControl type="text" placeholder="Search for articles, books or researches" className="mr-sm-2" style={{
          width: '30vw',
        }} />
        <Button variant="outline-success"> <Link to="/search-result"><img src={require("../../assets/icons/search_icon.svg")} id="search_icon" /> </Link></Button>
      </Form>
      </div>
    </Container>
  );
};

export default HomePage;
