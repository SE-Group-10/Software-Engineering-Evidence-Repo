import React from "react";
import { Container } from "react-bootstrap";
import queryString from "query-string";
import SearchFilters from "../search-result-components/SearchFilters";
import api from "../../api/api";

class SearchResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTitle: "",
      searchResults: [],
    };

    // Prevents Memory Leaks
    this._isMounted = true;
  }

  displayResults = async (e) => {
    const params = await queryString.parse(this.props.location.search);
    console.log(this.props.location.search);

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
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Query Results: </h1>
        <SearchFilters />
        {Array.isArray(this.state.searchResults) &&
          this.state.searchResults.map((result, index) => {
            return (
              <Container key={index}>
                <p>
                  {result.title} {" "}
                  {result.authors.map((author) => {
                    return "[" + author + "]";
                  })}
                </p>
              </Container>
            );
          })}
      </div>
    );
  }
}

export default SearchResultPage;
