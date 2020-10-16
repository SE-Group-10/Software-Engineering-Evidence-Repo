import React from "react";
import { Nav } from "react-bootstrap";
import UsersTable from "../admin-components/UsersTable";
import ResearchParticipantsTable from "../admin-components/ResearchParticipantsTable";
import ResearchMethodsTable from "../admin-components/ResearchMethodsTable";
import MethodologiesTable from "../admin-components/MethodologiesTable";
import MethodsTable from "../admin-components/MethodsTable";
import ArticleTableAdmin from "../admin-components/ArticleTableAdmin";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "articles",
    };
  }

  render() {
    let display;
    switch (this.state.tab) {
      case "articles":
        display = <ArticleTableAdmin />;
        break;

      case "users":
        display = <UsersTable />;
        break;

      case "se-methods":
        display = <MethodsTable />;
        break;

      case "se-methodology":
        display = <MethodologiesTable />;

        break;

      case "research-methods":
        display = <ResearchMethodsTable />;
        break;

      case "research-participants":
        display = <ResearchParticipantsTable />;
        break;

      default:
        display = <ArticleTableAdmin />;
        break;
    }
    return (
      <div>
        <Nav className="tabsStyle" fill variant="tabs" defaultActiveKey="/home">
          <Nav.Item onClick={() => this.setState({ tab: "articles" })}>
            <Nav.Link>Articles</Nav.Link>
          </Nav.Item>
          <Nav.Item onClick={() => this.setState({ tab: "users" })}>
            <Nav.Link>Users</Nav.Link>
          </Nav.Item>
          <Nav.Item onClick={() => this.setState({ tab: "se-methods" })}>
            <Nav.Link>SE Methods</Nav.Link>
          </Nav.Item>
          <Nav.Item onClick={() => this.setState({ tab: "se-methodology" })}>
            <Nav.Link>SE Methodology</Nav.Link>
          </Nav.Item>
          <Nav.Item onClick={() => this.setState({ tab: "research-methods" })}>
            <Nav.Link>Research Methods</Nav.Link>
          </Nav.Item>
          <Nav.Item
            onClick={() => this.setState({ tab: "research-participants" })}
          >
            <Nav.Link>Research Participants</Nav.Link>
          </Nav.Item>
        </Nav>
        {display}
      </div>
    );
  }
}

export default AdminPage;
