import React, { Component } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      email: "",
      username: "",
      firstname: "",
      lastname: "",
      password: "",
      id: "",
    };
  }

  render() {
    if (this.state.currentUser) {
      UserService.getUserByToken(this.state.currentUser).then((res) => {
        const user = res.data.data;
        this.setState({
          id: user.id,
          email: user.email,
          username: user.username,
          firstname: user.firstName,
          lastname: user.lastName,
          password: user.password,
        });
      });
    }

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>My profile</strong>
          </h3>
        </header>

        <div>
          <strong> {this.state.username} </strong>
          <br />
          {this.state.id}
          <br />
          {this.state.email}
          <br />
          {this.state.firstname}
          <br />
          {this.state.lastname}
          <br />
        </div>
      </div>
    );
  }
}
