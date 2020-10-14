import "./AdminComponent.css";
import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import swal from "@sweetalert/with-react";
import api from "../../api/api";

class UsersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };

    // Prevents Memory Leaks
    this._isMounted = false;
  }

  // Function to Get All The Users from the Server
  getUsers = async () => {
    const usersResponse = await api.get("/users");
    // Setting the Users State
    this._isMounted &&
      this.setState({
        users: usersResponse.data,
      });
    console.log(this.state.users);
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getUsers();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  deleteUser = (user_id) => {
    // Warning if the admin wants to be sure in the deletion
    swal({
      title: "Are you sure you want to delete User?",
      text: "The data will be lost forever.",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then(async (value) => {
      if (value === true) {
        try {
          const deleteResponse = await api.delete("/users/" + user_id);
          // No Problems with Deletion
          swal({
            title: "Successful Deletion!",
            text: "User Successfully Deleted!",
            icon: "success",
            buttons: [false, true],
          });
          this.getUsers();
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
    let usersArray = [];
    if (this.state.users) {
      usersArray = this.state.users.map((users, index) => {
        if (users.user_type !== "administrator") {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{users.user_type}</td>
              <td>{users.user_name}</td>
              <td>{users.email}</td>
              <td>{users.first_name}</td>
              <td>{users.last_name}</td>
              <td>{users.affiliation}</td>
              <td>{users.datetime_created}</td>
              <td>{users.datetime_updated}</td>
              <td>
                <Button
                  className="adminUserActions"
                  variant="danger"
                  onClick={() => {
                    this.deleteUser(users._id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        }
      });
    }

    return (
      <Container fluid>
        <h1 className="adminTableHeader">All Users</h1>
        <Table responsive bordered hover className="adminTableStyles">
          <thead>
            <tr>
              <th>#</th>
              <th>User Type</th>
              <th>Username</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Affiliation</th>
              <th>Datetime Created</th>
              <th>Datetime Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{usersArray}</tbody>
        </Table>
      </Container>
    );
  }
}

export default UsersTable;
