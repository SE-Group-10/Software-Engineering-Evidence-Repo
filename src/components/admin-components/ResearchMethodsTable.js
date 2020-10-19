import "./AdminComponent.css";
import React from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import swal from "@sweetalert/with-react";
import api from "../../api/api";

class ResearchMethodsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      researchMethods: [],
    };

    // Prevents Memory Leaks
    this._isMounted = false;
  }

  // Function to Get All The Research Methods from the Server
  getAllResearchMethods = async () => {
    const researchMethodsResponse = await api.get("/research_methods");
    // Setting the Research Methods State
    this._isMounted &&
      this.setState({
        researchMethods: researchMethodsResponse.data,
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getAllResearchMethods();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  addResearchMethod = () => {
    swal({
      title: "Add Research Method",
      content: (
        /* Form Section to Add Research Method (research_method_name) */
        <Form.Group controlId="add_research_method">
          <Form.Control placeholder="Research Method" />
        </Form.Group>
      ),
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: [true, "Add"],
    }).then(async (value) => {
      if (value === true) {
        try {
          // Get The Form Data
          let research_method_name = document.getElementById(
            "add_research_method"
          ).value;

          // Add The Research Method
          let rschMethodObj = {
            research_method_name: research_method_name,
          };
          await api.post("/research_methods", rschMethodObj);

          // No Problems with Adding
          swal({
            title: "Successfully Added!",
            text: "Research Method Successfully Added!",
            icon: "success",
            buttons: [false, true],
          });
          this.getAllResearchMethods();
        } catch (error) {
          // Error with Adding
          swal({
            title: "Unsuccessful Post!",
            text: error?.response?.data || "Unknown Error",
            icon: "error",
            buttons: [false, true],
          });
        }
      }
    });
  };

  editResearchMethod = (research_method) => {
    swal({
      title: "Edit Research Method",
      content: (
        /* Form Section to Edit Method Type */
        <Form.Group controlId="research_method_name">
          <Form.Control
            placeholder="Resarch Method"
            defaultValue={
              research_method.research_method_name
                ? research_method.research_method_name
                : ""
            }
          />
        </Form.Group>
      ),
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: [true, "Edit"],
    }).then(async (value) => {
      if (value === true) {
        try {
          // Get The Form Data
          let research_method_name = document.getElementById(
            "research_method_name"
          ).value;

          // Edit The Research Method
          let rschMethodObj = {
            research_method_name: research_method_name,
          };
          await api.patch(
            "/research_methods/" + research_method._id,
            rschMethodObj
          );

          // No Problems with Editing
          swal({
            title: "Successfully Edited!",
            text: "Research Method Successfully Edited!",
            icon: "success",
            buttons: [false, true],
          });
          this.getAllResearchMethods();
        } catch (error) {
          // Error with Editing
          swal({
            title: "Unsuccessful Edit!",
            text: error?.response?.data || "Unknown Error",
            icon: "error",
            buttons: [false, true],
          });
        }
      }
    });
  };

  deleteResearchMethod = (research_method_id) => {
    // Warning if the admin wants to be sure in the deletion
    swal({
      title: "Are you sure you want to delete Research Method?",
      text: "The data will be lost forever.",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then(async (value) => {
      if (value === true) {
        try {
          await api.delete("/research_methods/" + research_method_id);
          // No Problems with Deletion
          swal({
            title: "Successful Deletion!",
            text: "Research Method Successfully Deleted!",
            icon: "success",
            buttons: [false, true],
          });
          this.getAllResearchMethods();
        } catch (error) {
          // Error with Deletion
          swal({
            title: "Unsuccessful Deletion!",
            text: error?.response?.data || "Unknown Error",
            icon: "error",
            buttons: [false, true],
          });
        }
      }
    });
  };

  render() {
    let researchMethodsArray = [];
    if (this.state.researchMethods) {
      researchMethodsArray = this.state.researchMethods.map(
        (researchMethod, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{researchMethod.research_method_name}</td>
              <td>
                <Button
                  className="adminUserActions"
                  variant="secondary"
                  onClick={() => {
                    this.editResearchMethod(researchMethod);
                  }}
                >
                  Edit
                </Button>
                <Button
                  className="adminUserActions"
                  variant="danger"
                  onClick={() => {
                    this.deleteResearchMethod(researchMethod._id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        }
      );
    }

    return (
      <Container>
        <h1 className="adminTableHeader">Research Methods</h1>
        <Button
          className="addRowButton"
          variant="info"
          onClick={() => {
            this.addResearchMethod();
          }}
        >
          +
        </Button>
        <Table className="adminTableStyles" responsive bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Research Method Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{researchMethodsArray}</tbody>
        </Table>
      </Container>
    );
  }
}

export default ResearchMethodsTable;
