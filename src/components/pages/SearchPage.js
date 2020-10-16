import React from "react";
import { Row, Col } from "react-bootstrap";
import SearchField from "../general-components/SearchField";
import NavBar2 from "../general-components/NavBar2";
import SearchFilters from "../search-result-components/SearchFilters";

const SearchPage = () => {
  return (
    <div>
      <NavBar2 />
      <div>
        <Row>
          <Col lg="2">
            <SearchFilters />
          </Col>
          <Col className="mt-5" lg="8">
            <SearchField />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SearchPage;
