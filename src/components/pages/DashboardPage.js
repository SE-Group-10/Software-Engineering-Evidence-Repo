import React from "react";
import AdminPage from "./AdminPage";
import AnalystPage from "./AnalystPage";
import ModeratorPage from "./ModeratorPage";
import { connect } from "react-redux";

class DashboardPage extends React.Component {
  render() {
    let userType = this.props.user_information.user_type;
    if (userType === "administrator") {
      return <AdminPage />;
    } else if (userType === "analyst") {
      return <AnalystPage />;
    } else if (userType === "moderator") {
      return <ModeratorPage />;
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
