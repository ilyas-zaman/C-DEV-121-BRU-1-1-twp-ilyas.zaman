import React, { Component } from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      id: "",
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      type: "",
      password: "",

      successful: false,
      message: "",
    };
  }
  componentDidMount() {
    if (this.state.currentUser) {
      UserService.getUserByToken(this.state.currentUser).then((res) => {
        const user = res.data.data;
        this.setState({
          id: user.id,
          username: user.username,
          firstname: user.firstName,
          lastname: user.lastName,
          email: user.email,
          type: user.type,
        });
      });
    }
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangeFirstname(e) {
    this.setState({
      firstname: e.target.value,
    });
  }
  onChangeLastname(e) {
    this.setState({
      lastname: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false,
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      UserService.editUser(
        this.state.username,
        this.state.firstname,
        this.state.lastname,
        this.state.email,
        this.state.type,
        this.state.password,

        this.state.id,
        this.state.currentUser
      ).then(
        (response) => {
          alert("Congrats, you edited your profile !");
          window.location.href = "/profile";
          this.setState({
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }

  handleDelete(e) {
    e.preventDefault();
    if (this.state.currentUser) {
      UserService.deleteMyself(this.state.id, this.state.currentUser);
    }
    window.location.href = "/login";
  }

  render() {
    return (
      <div className="col-md-12">
        <Form
          onSubmit={this.handleEdit}
          ref={(c) => {
            this.form = c;
          }}
        >
          {!this.state.successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username : </label>
                <Input
                  id="username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  type="text"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstname">Firstname : </label>
                <Input
                  id="firstname"
                  value={this.state.firstname}
                  onChange={this.onChangeFirstname}
                  type="text"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Lastname : </label>
                <Input
                  id="lastname"
                  value={this.state.lastname}
                  onChange={this.onChangeLastname}
                  type="text"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">Type : </label>
                <Input
                  id="type"
                  value={this.state.type}
                  onChange={this.onChangeType}
                  type="text"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  //className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  required
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">
                  Confirm Edit
                </button>
              </div>
            </div>
          )}
          {this.state.message && (
            <div className="form-group">
              <div
                className={
                  this.state.successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {this.state.message}
              </div>
            </div>
          )}
          <CheckButton
            style={{ display: "none" }}
            ref={(c) => {
              this.checkBtn = c;
            }}
          />
        </Form>
        <button
          onClick={this.handleDelete}
          className="btn btn-primary btn-block"
        >
          Delete
        </button>
      </div>
    );
  }
}
