import "./AdminComponent.css";
import React from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import swal from "@sweetalert/with-react";
import api from "../../api/api";

class MethodsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      methods: [],
    };

    // Prevents Memory Leaks
    this._isMounted = false;
  }

  // Function to Get All The Methods from the Server
  getAllMethods = async () => {
    const methodsResponse = await api.get("/methods");
    // Setting the Methods State
    this._isMounted &&
      this.setState({
        methods: methodsResponse.data,
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getAllMethods();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  addMethod = () => {
    swal({
      title: "Add Method",
      content: (
        <div className="multiFormStyle">
          {/* Form Section to Add Method (method_name) */}
          <Form.Label>Method</Form.Label>
          <Form.Group controlId="add_method">
            <Form.Control placeholder="Method Name" />
          </Form.Group>
          {/* Form Section to Add Method (description) */}
          <Form.Group controlId="add_method_description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Method Description"
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
          let method_name = document.getElementById("add_method").value;
          let description = document.getElementById("add_method_description")
            .value;

          // Add The Method
          let methodObj = {
            method_name: method_name,
            description: description,
          };
          const postResponse = await api.post("/methods", methodObj);

          // No Problems with Adding
          swal({
            title: "Successfully Added!",
            text: "Methodology Successfully Added!",
            icon: "success",
            buttons: [false, true],
          });
          this.getAllMethods();
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

  editMethod = (method) => {
    swal({
      title: "Edit Method",
      content: (
        <div className="multiFormStyle">
          {/* Form Section to Edit Method Name */}
          <Form.Group controlId="method_name">
            <Form.Control
              placeholder="Methodology"
              defaultValue={method.method_name ? method.method_name : ""}
            />
          </Form.Group>
          {/* Form Section to Edit Methodology Description */}
          <Form.Group controlId="method_description">
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Description"
              defaultValue={method.description ? method.description : ""}
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
          let method_name = document.getElementById("method_name").value;
          let description = document.getElementById("method_description").value;

          // Edit The Method
          let methodObj = {
            method_name: method_name,
            description: description,
          };
          const editResponse = await api.patch(
            "/methods/" + method._id,
            methodObj
          );

          // No Problems with Editing
          swal({
            title: "Successfully Edited!",
            text: "Methodology Successfully Edited!",
            icon: "success",
            buttons: [false, true],
          });
          this.getAllMethods();
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

  deleteMethod = (method_id) => {
    // Warning if the admin wants to be sure in the deletion
    swal({
      title: "Are you sure you want to delete Method?",
      text: "The data will be lost forever.",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then(async (value) => {
      if (value === true) {
        try {
          const deleteResponse = await api.delete("/methods/" + method_id);
          // No Problems with Deletion
          swal({
            title: "Successful Deletion!",
            text: "Method Successfully Deleted!",
            icon: "success",
            buttons: [false, true],
          });
          this.getAllMethods();
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
    let methodsArray = [];
    if (this.state.methods) {
      methodsArray = this.state.methods.map((method, index) => {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{method.method_name}</td>
            <td>{method.description}</td>
            <td>
              <Button
                className="adminUserActions"
                variant="secondary"
                onClick={() => {
                  this.editMethod(method);
                }}
              >
                Edit
              </Button>
              <Button
                className="adminUserActions"
                variant="danger"
                onClick={() => {
                  this.deleteMethod(method._id);
                }}
              >
                Delete
              </Button>
            </td>
          </tr>
        );
      });
    }

    return (
      <Container fluid>
        <h1 className="adminTableHeader">Methods</h1>
        <Button
          className="addRowButton"
          variant="info"
          onClick={() => {
            this.addMethod();
          }}
        >
          +
        </Button>
        <Table className="adminTableStyles" responsive bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Method Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{methodsArray}</tbody>
        </Table>
      </Container>
    );
  }
}

export default MethodsTable;
