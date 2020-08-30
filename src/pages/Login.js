import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { verifyUser } from "../actions";
import { toast } from "react-toastify";

export class Login extends Component {
  state = {
    email: "",
    password: "",
  };
  onFormLogin = () => {
    this.props.verifyUser(this.state, true);
  };

  funValidate=(e)=>{
    e.preventDefault();
   if(this.state.email === "" || this.state.password === ""){
    toast.error('Please fill all the details!')
   }
   else{
      this.onFormLogin()
   }
  }

  render() {
    return (
      <div className="container-fluid bg-grad-1">
        <div className="row px-0">
          <div className="col-md-5 mx-auto py-3 text-center min-height dispTable">
            <div className="dispTableCell">
              <div className="bg-light shadow-sm p-2 rounded-lg">
                <div className="display-1 my-2">
                  <i className="fa fa-instagram"></i>
                </div>
                <div className="h4 logo mb-1">
                  <span className="text-danger">Post</span>box
                </div>
                <form className="px-3 py-2">
                  <input
                    type="text"
                    className="form-control rounded-pill my-4"
                    placeholder="Email ID"
                    aria-label="Enter Email"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                  <input
                    type="password"
                    className="form-control rounded-pill my-4"
                    placeholder="Password"
                    aria-label="Enter Password"
                    value={this.state.password}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                  <div className="mt-4">
                    <button
                      type="sumbit"
                      className="btn bg-grad-1 border-0 text-light rounded-pill w-50 mb-2"
                      onClick={(e) => this.funValidate(e)}
                    >
                      Log In
                    </button>
                    <hr className="my-3" />
                    <Link
                      to="/register"
                      className="btn btn-link btn-sm text-secondary text-decoration-none"
                    >
                      Dont have an account ? register here
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { verifyUser })(Login);
