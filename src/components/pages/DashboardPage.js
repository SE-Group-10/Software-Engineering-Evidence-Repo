import React from "react";
import AdminPage from "./AdminPage";
import { connect } from "react-redux";

const DashboardPage = () => {
  let display = "";
  if (this.props.user_information.user_type === "admin") {
    return <AdminPage />;
  }
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.seerUserReducer.isLoggedIn,
  user_information: state.seerUserReducer.user_information,
});

const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps())(DashboardPage);
