import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import history from "../routes/history";
import { allUser } from "../actions/index";
import Loading from "./Loading";

export class Title extends Component {
  componentDidMount() {
    this.props.allUser();
  }

  onLogOut = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  render() {
    const { currentUser } = this.props;
    if (!currentUser) return <Loading />;

    return (
      <div className="container-fluid py-0 px-0 bg-light shadow-sm">
        <div className="container px-custom">
          <nav className="navbar navbar-expand-lg navbar-light py-1 px-2">
            <Link
              className="h3 mb-0 mt-1 text-dark text-decoration-none logo"
              to="/"
            >
              <span className="text-danger">Post</span>box
            </Link>
            <button
              className="btn btn-link navbar-toggler border-0 px-1"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
            >
              <img
                src={require("../assets/menu.png")}
                alt="profile-pic"
              />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link
                    className="btn btn-link text-decoration-none text-dark pl-1 pr-3 mr-3"
                    to="/"
                  >
                    <img
                      src={require("../assets/home.png")}
                      alt="nav-pic"
                    />
                    <span className="autohide"> Home</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="btn btn-link text-decoration-none text-dark pl-1 pr-3 mr-3"
                    to="/explore"
                  >
                    <img
                      src={require("../assets/compass.png")}
                      alt="nav-pic"
                    />
                    <span className="autohide"> Explore</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="btn btn-link text-decoration-none text-dark pl-1 pr-3 mr-3"
                    to="/upload"
                  >
                    <img
                      src={require("../assets/plus.png")}
                      alt="nav-pic"
                    />
                    <span className="autohide"> Upload</span>
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <button
                    className="btn btn-link text-decoration-none text-dark pl-1"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                  >
                    <img
                      src={currentUser.imgurl}
                      alt="profile-pic"
                      className="rounded-pill bg-grad-1 p-1"
                      height="40"
                      width="40"
                    />
                    <span className="autohide">
                      {currentUser.name}
                      <i className="fa fa-caret-down ml-2"></i>
                    </span>
                  </button>

                  <div className="dropdown-menu dropdown-menu-right bg-light border-0 shadow-sm p-2 mb-3 mx-auto w-75">
                    <ul className="list-group list-group-flush">
                      <li className="dropdown-item p-0 rounded bg-light mb-1">
                        <Link className="nav-link" to="/profile">
                          <img
                            src={require("../assets/user.png")}
                            alt="nav-pic"
                            className="mr-2"
                          />
                          Profile
                        </Link>
                      </li>
                      <li className="dropdown-item p-0 rounded bg-light">
                        <Link
                          className="nav-link"
                          to="/"
                          onClick={this.onLogOut}
                        >
                          <img
                            src={require("../assets/off.png")}
                            alt="nav-pic"
                            className="mr-2"
                          />
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
  return {
    currentUser: state.users[currentUser.userId],
  };
}

export default connect(mapStateToProps, { allUser })(Title);
