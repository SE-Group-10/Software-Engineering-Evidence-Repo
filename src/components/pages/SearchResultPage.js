import React from "react";
import { Table, Row, Col } from "react-bootstrap";
import queryString from "query-string";
import SearchFilters from "../search-result-components/SearchFilters";
import api from "../../api/api";

class SearchResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTitle: "",
      search_type: "",
      searchResults: [],
    };

    // Prevents Memory Leaks
    this._isMounted = true;
  }

  displayResults = async (e) => {
    const params = await queryString.parse(this.props.location.search);
    console.log(this.props.location.search);
    console.log(params);

    // Setting the SearchResults State
    this._isMounted &&
      this.setState({
        searchTitle: params.title,
        search_type: params.search_type,
      });

    // Getting the Services and Regions JSON From the Server
    const searchResponse = await api.get("/search_article", {
      params: {
        search_type: params.search_type,
        title: params.title,
      },
    });
    console.log(searchResponse);

    // Setting the SearchResults State
    this._isMounted &&
      this.setState({
        searchResults: searchResponse.data,
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.displayResults();
  }

  // Update Search whenever the URL is changed
  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.displayResults();
      console.log();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let articleArray = [];
    if (Array.isArray(this.state.searchResults)) {
      articleArray = this.state.searchResults.map((result, index) => {
        let publishDate = new Date(result.publish_date);
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{result.title}</td>
            <td>{result.authors.join(", ")}</td>
            <td>{result.journals.join(", ")}</td>
            <td>{result.publisher}</td>
            <td>
              {result.volume}-{result.volume_number}
            </td>
            <td>
              {result.start_page}-{result.end_page}
            </td>
            <td>{`${publishDate.getFullYear()}`}</td>
            <td>{result.article_link}</td>
          </tr>
        );
      });
    }

    return (
      <div>
        <h1 className="mt-5 mb-5 seer-header-styling" style={{ textAlign: "center" }}>
          Query Results:{" "}
        </h1>
        <Row className="mr-1">
          <Col sm={2}>
            <SearchFilters />
          </Col>
          <Col sm={10}>
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Authors</th>
                  <th>Journals</th>
                  <th>Publishers</th>
                  <th>Volume</th>
                  <th>Pages</th>
                  <th>Publish Date</th>
                  <th>Article Link</th>
                </tr>
              </thead>
              <tbody>{articleArray}</tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SearchResultPage;
