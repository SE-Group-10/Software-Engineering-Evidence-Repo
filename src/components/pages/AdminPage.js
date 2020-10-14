import React from "react";
import { Container } from "react-bootstrap";
import UsersTable from "../admin-components/UsersTable";
import ResearchParticipantsTable from "../admin-components/ResearchParticipantsTable";
import ResearchMethodsTable from "../admin-components/ResearchMethodsTable";
import MethodologiesTable from "../admin-components/MethodologiesTable";
import MethodsTable from "../admin-components/MethodsTable";

class AdminPage extends React.Component {
  render() {
    return (
      <Container>
        <UsersTable />
        <ResearchParticipantsTable />
        <ResearchMethodsTable />
        <MethodologiesTable />
        <MethodsTable />
        <MethodsTable />
      </Container>
    );
  }
}

export default AdminPage;
