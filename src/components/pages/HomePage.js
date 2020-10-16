import React from "react";
import "./HomePage.css";
import { Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar2 from "../general-components/NavBar2.js";

const HomePage = () => {
  return (
    <div>
      <NavBar2 />
      <div className="homepageHeader">
        <div>
          <h1 style={{ fontWeight: "400" }}> Welcome to SEER! </h1>
          <br />
          <h3 style={{ fontWeight: "200" }}>
            {" "}
            A repository for Software Engineers to search for articles, <br />
            journals or research papers for evidences to support their ideas.
          </h3>
        </div>

        <div
          className="homepageCTA"
          style={{
            marginTop: "10vh",
            paddingBottom: "5vh",
          }}
        >
          <h2 style={{ marginBottom: "2vh", fontWeight: "200" }}>
            {" "}
            What are you looking for?{" "}
          </h2>
          <Form
            inline
            id="navbar-search"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <FormControl
              type="text"
              placeholder="Search for articles, books or researches"
              className="mr-sm-2"
              style={{
                width: "30vw",
              }}
            />
            <Button
              variant="outline-success"
              style={{ backgroundColor: "white" }}
            >
              {" "}
              <Link to="/search-result">
                <img
                  alt="search"
                  src={require("../../assets/icons/search_icon.svg")}
                  id="search_icon"
                />{" "}
              </Link>
            </Button>
          </Form>
        </div>

        <div
          className="homepageFooter"
          style={{
            paddingTop: "15vh",
            width: "auto",
            textAlign: "center",
          }}
        >
          <h3 style={{ fontWeight: "400" }}> Brought to you by </h3>
          <img
            src={require("../../assets/logos/AUT_Logo.png")}
            alt="AUT Logo"
            style={{
              height: "80px",
              width: "auto",
            }}
          />
          <img
            src={require("../../assets/logos/SERL_Logo.png")}
            alt="SERL Logo"
            style={{
              height: "80px",
              width: "auto",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
