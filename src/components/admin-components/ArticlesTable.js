import React from "react";
import { Container, Table } from "react-bootstrap";
import api from "../../api/api";

class ArticlesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };

    // Prevents Memory Leaks
    this._isMounted = false;
  }

  // Function to Get All The Articles from the Server
  getAllArticles = async () => {
    const articlesResponse = await api.get("/articles");
    // Setting the Articles State
    this._isMounted &&
      this.setState({
        articles: subscriptionResponse.data,
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getAllArticles();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return <Container></Container>;
  }
}

export default ArticlesTable;
