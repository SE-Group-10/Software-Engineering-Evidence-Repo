import "./AdminComponent.css";
import React from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import swal from "@sweetalert/with-react";
import api from "../../api/api";

class ResearchParticipantsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      researchParticipants: [],
    };

    // Prevents Memory Leaks
    this._isMounted = false;
  }

  // Function to Get All The Research Participants from the Server
  getResearchParticipants = async () => {
    const researchParticipantsResponse = await api.get(
      "/research_participants"
    );
    // Setting the Research Participants State
    this._isMounted &&
      this.setState({
        researchParticipants: researchParticipantsResponse.data,
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getResearchParticipants();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  addResearchParticipant = () => {
    swal({
      title: "Add Research Participant",
      content: (
        /* Form Section to Add Research Participant (participant_type) */
        <Form.Group controlId="add_participant_type">
          <Form.Control placeholder="Participant Type" />
        </Form.Group>
      ),
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: [true, "Add"],
    }).then(async (value) => {
      if (value === true) {
        try {
          // Get The Form Data
          let participant_type = document.getElementById("add_participant_type")
            .value;

          // Add The Research Participant
          let participantObj = {
            participant_type: participant_type,
          };
          await api.post("/research_participants", participantObj);

          // No Problems with Adding
          swal({
            title: "Successfully Added!",
            text: "Research Participant Successfully Added!",
            icon: "success",
            buttons: [false, true],
          });
          this.getResearchParticipants();
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

  editResearchParticipant = (research_participant) => {
    swal({
      title: "Edit Research Participant",
      content: (
        /* Form Section to Edit Participant Type */
        <Form.Group controlId="participant_type">
          <Form.Control
            placeholder="Participant Type"
            defaultValue={
              research_participant.participant_type
                ? research_participant.participant_type
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
          let participant_type = document.getElementById("participant_type")
            .value;

          // Edit The Research Participant
          let participantObj = {
            participant_type: participant_type,
          };
          await api.patch(
            "/research_participants/" + research_participant._id,
            participantObj
          );

          // No Problems with Editing
          swal({
            title: "Successfully Edited!",
            text: "Research Participant Successfully Edited!",
            icon: "success",
            buttons: [false, true],
          });
          this.getResearchParticipants();
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

  deleteResearchParticipant = (research_participant_id) => {
    // Warning if the admin wants to be sure in the deletion
    swal({
      title: "Are you sure you want to delete Research Participant?",
      text: "The data will be lost forever.",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then(async (value) => {
      if (value === true) {
        try {
          await api.delete("/research_participants/" + research_participant_id);
          // No Problems with Deletion
          swal({
            title: "Successful Deletion!",
            text: "Research Participant Successfully Deleted!",
            icon: "success",
            buttons: [false, true],
          });
          this.getResearchParticipants();
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
    let researchParticipantsArray = [];
    if (this.state.researchParticipants) {
      researchParticipantsArray = this.state.researchParticipants.map(
        (researchParticipant, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{researchParticipant.participant_type}</td>
              <td>
                <Button
                  className="adminUserActions"
                  variant="secondary"
                  onClick={() => {
                    this.editResearchParticipant(researchParticipant);
                  }}
                >
                  Edit
                </Button>
                <Button
                  className="adminUserActions"
                  variant="danger"
                  onClick={() => {
                    this.deleteResearchParticipant(researchParticipant._id);
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
        <h1 className="adminTableHeader">Research Participants</h1>
        <Button
          className="addRowButton"
          variant="info"
          onClick={() => {
            this.addResearchParticipant();
          }}
        >
          +
        </Button>
        <Table className="adminTableStyles" responsive bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Participant Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{researchParticipantsArray}</tbody>
        </Table>
      </Container>
    );
  }
}

export default ResearchParticipantsTable;
