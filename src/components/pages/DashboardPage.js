import React from "react";
import AdminPage from "./AdminPage";
import { connect } from "react-redux";

class DashboardPage extends React.Component {
  render() {
    if (this.props.user_information.user_type === "administrator") {
      return <AdminPage />;
    } else {
      return <div>Dashboard</div>;
    }
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.seerUserReducer.isLoggedIn,
  user_information: state.seerUserReducer.user_information,
});

const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps())(DashboardPage);
