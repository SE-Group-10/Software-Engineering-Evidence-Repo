import "./AdminComponent.css";
import React from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import swal from "@sweetalert/with-react";
import api from "../../api/api";

class MethodologiesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      methodologies: [],
    };

    // Prevents Memory Leaks
    this._isMounted = false;
  }

  // Function to Get All The Methodologies from the Server
  getAllMethodologies = async () => {
    const methodologiesResponse = await api.get("/methodologies");
    // Setting the Methodologies State
    this._isMounted &&
      this.setState({
        methodologies: methodologiesResponse.data,
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getAllMethodologies();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  addMethodology = () => {
    swal({
      title: "Add Methodology",
      content: (
        <div className="multiFormStyle">
          {/* Form Section to Add Methodology (research_method_name) */}
          <Form.Label>Methodology</Form.Label>
          <Form.Group controlId="add_methodology">
            <Form.Control placeholder="Methodlogy Name" />
          </Form.Group>
          {/* Form Section to Add Methodology (description) */}
          <Form.Group controlId="add_methodology_name">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              placeholder="Methodlogy Description"
            />
          </Form.Group>
        </div>
      ),
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: [true, "Add"],
    }).then(async (value) => {
      if (value === true) {
        try {
          // Get The Form Data
          let methodology_name = document.getElementById("add_methodology")
            .value;
          let description = document.getElementById("add_methodology_name")
            .value;

          // Add The Research Method
          let methodologyObj = {
            methodology_name: methodology_name,
            description: description,
          };
          await api.post("/methodologies", methodologyObj);

          // No Problems with Adding
          swal({
            title: "Successfully Added!",
            text: "Methodology Successfully Added!",
            icon: "success",
            buttons: [false, true],
          });
          this.getAllMethodologies();
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

  editMethodology = (methodology) => {
    swal({
      title: "Edit Methodology",
      content: (
        <div className="multiFormStyle">
          {/* Form Section to Edit Methodology Name */}
          <Form.Group controlId="methodology_name">
            <Form.Control
              placeholder="Methodology"
              defaultValue={
                methodology.methodology_name ? methodology.methodology_name : ""
              }
            />
          </Form.Group>
          {/* Form Section to Edit Methodology Description */}
          <Form.Group controlId="methodology_description">
            <Form.Control
              as="textarea"
              rows="5"
              placeholder="Description"
              defaultValue={
                methodology.description ? methodology.description : ""
              }
            />
          </Form.Group>
        </div>
      ),
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: [true, "Edit"],
    }).then(async (value) => {
      if (value === true) {
        try {
          // Get The Form Data
          let methodology_name = document.getElementById("methodology_name")
            .value;
          let description = document.getElementById("methodology_description")
            .value;

          // Edit The Methodology
          let methodologyObj = {
            methodology_name: methodology_name,
            description: description,
          };
          await api.patch("/methodologies/" + methodology._id, methodologyObj);

          // No Problems with Editing
          swal({
            title: "Successfully Edited!",
            text: "Methodology Successfully Edited!",
            icon: "success",
            buttons: [false, true],
          });
          this.getAllMethodologies();
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

  deleteMethodology = (methodology_id) => {
    // Warning if the admin wants to be sure in the deletion
    swal({
      title: "Are you sure you want to delete Methodology?",
      text: "The data will be lost forever.",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then(async (value) => {
      if (value === true) {
        try {
          await api.delete("/methodologies/" + methodology_id);
          // No Problems with Deletion
          swal({
            title: "Successful Deletion!",
            text: "Methodology Successfully Deleted!",
            icon: "success",
            buttons: [false, true],
          });
          this.getAllMethodologies();
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
    let methodologiesArray = [];
    if (this.state.methodologies) {
      methodologiesArray = this.state.methodologies.map(
        (methodology, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{methodology.methodology_name}</td>
              <td>{methodology.description}</td>
              <td>
                <Button
                  className="adminUserActions"
                  variant="secondary"
                  onClick={() => {
                    this.editMethodology(methodology);
                  }}
                >
                  Edit
                </Button>
                <Button
                  className="adminUserActions"
                  variant="danger"
                  onClick={() => {
                    this.deleteMethodology(methodology._id);
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
        <h1 className="adminTableHeader">Methodology</h1>
        <Button
          className="addRowButton"
          variant="info"
          onClick={() => {
            this.addMethodology();
          }}
        >
          +
        </Button>
        <Table className="adminTableStyles" responsive bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Methodology Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{methodologiesArray}</tbody>
        </Table>
      </Container>
    );
  }
}

export default MethodologiesTable;
