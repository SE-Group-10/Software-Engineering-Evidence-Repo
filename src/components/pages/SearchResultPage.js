import "./SearchResultPage.css";
import React from "react";
import queryString from "query-string";
import { Container, Table, Row, Col } from "react-bootstrap";
import SearchFilters from "../search-result-components/SearchFilters";
import swal from "@sweetalert/with-react";
import api from "../../api/api";

class SearchResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
    };

    // Prevents Memory Leaks
    this._isMounted = true;
  }

  displayResults = async (e) => {
    try {
      const queryParams = await queryString.parse(this.props.location.search);
      console.log(this.props.location.search);
      console.log(queryParams);

      // Getting the Services and Regions JSON From the Server
      const searchResponse = await api.get("/search_article", {
        params: {
          title: queryParams.title,
          authors: queryParams.author,
          article_link: queryParams.linkSearch,
          methodology_name: queryParams.methodology,
          method_name: queryParams.method,
          research_method_name: queryParams.research_method,
          participant_type: queryParams.participant,
        },
      });
      console.log(searchResponse);

      // Setting the SearchResults State
      this._isMounted &&
        this.setState({
          searchResults: searchResponse.data,
        });
    } catch (error) {
      // Error with Getting the Filters
      swal({
        title: "Database Error!",
        text: error?.response?.data || "Unknown Error",
        icon: "error",
        buttons: [false, true],
      });
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.displayResults();
  }

  // Update Search whenever the URL is changed
  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.displayResults();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let articlesArray = [];
    if (Array.isArray(this.state.searchResults)) {
      articlesArray = this.state.searchResults.map((article, index) => {
        let publish_date = new Date(article.publish_date);
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{article.title}</td>
            <td>{article.document_type}</td>
            <td>{article.authors.join(", ")}</td>
            <td>{article.journals.join(", ")}</td>
            <td>{article.publisher}</td>
            <td>
              {article.volume} - {article.volume_number}
            </td>
            <td>
              {article.start_page} - {article.end_page}
            </td>
            <td>
              {article.publish_date &&
                `${
                  monthNames[publish_date.getMonth()]
                }, ${publish_date.getFullYear()}`}
            </td>
            <td>
              {article.methodologies
                .map((methodology) => {
                  return methodology.methodology_name;
                })
                .join(", ")}
            </td>
            <td>
              {article.methods
                .map((method) => {
                  return method.method_name;
                })
                .join(", ")}
            </td>
            <td>
              {article.research_methods
                .map((research_method) => {
                  return research_method.research_method_name;
                })
                .join(", ")}
            </td>
            <td>
              {article.participants
                .map((participant) => {
                  return participant.participant_type;
                })
                .join(", ")}
            </td>
            <td>{article.article_link}</td>
          </tr>
        );
      });
    }

    return (
      <Container fluid className="searchSectionStyle">
        <Row>
          <Col className="searchFilterResult" sm={2}>
            <SearchFilters />
          </Col>
          <Col className="pr-0">
            <h1 className="searchTableHeader">Search Results</h1>
            <Table className="searchTableStyles" responsive bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Document Type</th>
                  <th>Authors</th>
                  <th>Journals</th>
                  <th>Publisher</th>
                  <th>Volume</th>
                  <th>Article Page/s</th>
                  <th>Publish Date</th>
                  <th>SE Methodologies</th>
                  <th>SE Methods</th>
                  <th>Research Methods</th>
                  <th>Research Participants</th>
                  <th>Article Link</th>
                </tr>
              </thead>
              <tbody>{articlesArray}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SearchResultPage;
