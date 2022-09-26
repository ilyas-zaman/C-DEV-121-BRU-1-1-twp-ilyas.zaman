import React, { Component } from "react";
import AuthService from "../services/auth.service";
import OrganService from "../services/organ-service";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

export default class Org extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      organizations: [],
    };
  }
  componentDidMount() {
    OrganService.fetchAll(this.state.currentUser).then((res) => {
      this.setState({ organizations: res.data.data.items });
    });
  }

  render() {
    const columns = [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
    ];
    return <ReactTable data={this.state.organizations} columns={columns} />;
  }
}
