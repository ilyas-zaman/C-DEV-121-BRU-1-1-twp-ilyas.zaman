import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Profile from "./components/profile.component";
import Register from "./components/register.component";
import Edit from "./components/edit.component";
import Org from "./components/org.component";
import Create from "./components/CreateOrg.component";
import Users from "./components/Users.component";
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }
  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            WELCOME TO TWP
          </Link>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  My profile
                </Link>
              </li>
              <li className="nav-item">
                <a href="/edit" className="nav-link">
                  Edit
                </a>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Logout
                </a>
              </li>
              <li className="nav-item">
                <Link to={"/organisations"} className="nav-link">
                  See all the organizations
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/create"} className="nav-link">
                  Create an organization
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/users"} className="nav-link">
                  All Users
                </Link>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/organisations" element={<Org />} />
            <Route path="/create" element={<Create />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </div>
    );
  }
}
export default App;
