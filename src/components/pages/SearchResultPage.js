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

      titleAsc: "",
      documentTypeAsc: "",
      authorsAsc: "",
      journalsAsc: "",
      publisherAsc: "",
      volumeAsc: "",
      pageAsc: "",
      publishAsc: "",
      seMethodologyAsc: "",
      seMethodsAsc: "",
      rschMethodsAsc: "",
      rschParticipantAsc: "",
      articleLinkAsc: "",
    };

    // Prevents Memory Leaks
    this._isMounted = true;

    this.compareBy.bind(this);
    this.sortBy.bind(this);
  }

  displayResults = async (e) => {
    try {
      const queryParams = await queryString.parse(this.props.location.search);

      let searchResponse;
      if (Object.keys(queryParams).length === 0) {
        searchResponse = await api.get("articles?stage=approved");
      } else {
        searchResponse = await api.get("/search_article", {
          params: {
            title: queryParams.title,
            authors: queryParams.author,
            article_link: queryParams.linkSearch,
            min_date: queryParams.min_date,
            max_date: queryParams.max_date,
            methodology_name: queryParams.methodology,
            method_name: queryParams.method,
            research_method_name: queryParams.research_method,
            participant_type: queryParams.participant,
          },
        });
      }
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

  compareBy(key, asc) {
    if (asc) {
      console.log("ASCENDING");
      return function (a, b) {
        if (!a[key]) return -1;
        if (!b[key]) return 1;
        console.log(a[key]);
        console.log(b[key]);
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      };
    } else {
      console.log("DESCENDING");
      return function (a, b) {
        if (!a[key]) return 1;
        if (!b[key]) return -1;
        if (a[key] < b[key]) return 1;
        if (a[key] > b[key]) return -1;
        return 0;
      };
    }
  }

  sortBy(key, asc) {
    let saveState = true;
    if (this.state[asc] !== "") {
      saveState = !this.state[asc];
    }

    let arrayCopy = [...this.state.searchResults];
    arrayCopy.sort(this.compareBy(key, saveState));

    this.setState({
      titleAsc: "",
      documentTypeAsc: "",
      authorsAsc: "",
      journalsAsc: "",
      publisherAsc: "",
      volumeAsc: "",
      pageAsc: "",
      publishAsc: "",
      seMethodologyAsc: "",
      seMethodsAsc: "",
      rschMethodsAsc: "",
      rschParticipantAsc: "",
      articleLinkAsc: "",
      searchResults: arrayCopy,
    });

    this.setState({
      [asc]: saveState,
    });
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
    if (this.state.searchResults && Array.isArray(this.state.searchResults)) {
      articlesArray = this.state.searchResults.map((article, index) => {
        let publish_date = new Date(article.publish_date);
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{article.title}</td>
            <td>{article.document_type.join(", ")}</td>
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
                  <th onClick={() => this.sortBy("title", "titleAsc")}>
                    <u>
                      Title{" "}
                      {this.state.titleAsc === ""
                        ? ""
                        : this.state.titleAsc
                        ? "(Asc)"
                        : "(Desc)"}
                    </u>
                  </th>
                  <th
                    onClick={() =>
                      this.sortBy("document_type", "documentTypeAsc")
                    }
                  >
                    <u>
                      Document Type{" "}
                      {this.state.documentTypeAsc === ""
                        ? ""
                        : this.state.documentTypeAsc
                        ? "(Asc)"
                        : "(Desc)"}
                    </u>
                  </th>
                  <th onClick={() => this.sortBy("authors", "authorsAsc")}>
                    <u>
                      Authors{" "}
                      {this.state.authorsAsc === ""
                        ? ""
                        : this.state.authorsAsc
                        ? "(Asc)"
                        : "(Desc)"}
                    </u>
                  </th>
                  <th onClick={() => this.sortBy("journals", "journalsAsc")}>
                    <u>
                      Journals{" "}
                      {this.state.journalsAsc === ""
                        ? ""
                        : this.state.journalsAsc
                        ? "(Asc)"
                        : "(Desc)"}
                    </u>
                  </th>
                  <th onClick={() => this.sortBy("publisher", "publisherAsc")}>
                    <u>
                      Publisher{" "}
                      {this.state.publisherAsc === ""
                        ? ""
                        : this.state.publisherAsc
                        ? "(Asc)"
                        : "(Desc)"}
                    </u>
                  </th>
                  <th onClick={() => this.sortBy("volume", "volumeAsc")}>
                    <u>
                      Volume{" "}
                      {this.state.volumeAsc === ""
                        ? ""
                        : this.state.volumeAsc
                        ? "(Asc)"
                        : "(Desc)"}
                    </u>
                  </th>
                  <th onClick={() => this.sortBy("start_page", "pageAsc")}>
                    <u>
                      Article Page/s{" "}
                      {this.state.pageAsc === ""
                        ? ""
                        : this.state.pageAsc
                        ? "(Asc)"
                        : "(Desc)"}
                    </u>
                  </th>
                  <th onClick={() => this.sortBy("publish_date", "publishAsc")}>
                    <u>
                      Publish Date{" "}
                      {this.state.publishAsc === ""
                        ? ""
                        : this.state.publishAsc
                        ? "(Asc)"
                        : "(Desc)"}
                    </u>
                  </th>
                  <th
                    onClick={() =>
                      this.sortBy("methodologies", "seMethodologyAsc")
                    }
                  >
                    <u>
                      SE Methodologies{" "}
                      {this.state.seMethodologyAsc === ""
                        ? ""
                        : this.state.seMethodologyAsc
                        ? "(Asc)"
                        : "(Desc)"}
                    </u>
                  </th>
                  <th onClick={() => this.sortBy("methods", "seMethodsAsc")}>
                    <u>
                      SE Methods{" "}
                      {this.state.seMethodsAsc === ""
                        ? ""
                        : this.state.seMethodsAsc
                        ? "(Asc)"
                        : "(Desc)"}
                    </u>
                  </th>
                  <th
                    onClick={() =>
                      this.sortBy("research_methods", "rschMethodsAsc")
                    }
                  >
                    <u>
                      Research Methods{" "}
                      {this.state.rschMethodsAsc === ""
                        ? ""
                        : this.state.rschMethodsAsc
                        ? "(Asc)"
                        : "(Desc)"}
                    </u>
                  </th>
                  <th
                    onClick={() =>
                      this.sortBy("participants", "rschParticipantAsc")
                    }
                  >
                    <u>
                      Research Participants{" "}
                      {this.state.rschParticipantAsc === ""
                        ? ""
                        : this.state.rschParticipantAsc
                        ? "(Asc)"
                        : "(Desc)"}
                    </u>
                  </th>
                  <th
                    onClick={() =>
                      this.sortBy("article_link", "articleLinkAsc")
                    }
                  >
                    <u>
                      Article Link{" "}
                      {this.state.articleLinkAsc === ""
                        ? ""
                        : this.state.articleLinkAsc
                        ? "(Asc)"
                        : "(Desc)"}
                    </u>
                  </th>
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
