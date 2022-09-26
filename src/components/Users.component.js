import React, { Component } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

export default class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      users: [],
    };
  }
  componentDidMount() {
    UserService.fetchAll(this.state.currentUser).then((res) => {
      this.setState({ users: res.data.data.items });
    });
  }

  render() {
    const columns = [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Type",
        accessor: "type",
      },
    ];
    return <ReactTable data={this.state.users} columns={columns} />;
  }
}
