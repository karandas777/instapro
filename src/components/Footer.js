import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div className="container-fluid bg-danger text-light">
        <div className="container py-4 px-custom">
          <div className="row">
            <div className="col-md-8 p-2">
              <div className="display-4 mt-3 logo">
                Post<span className="text-dark">box</span>
              </div>
            </div>

            <div className="col-md-4 p-2">
              <div className="my-2">
                <i className="fa fa-github"></i> Github
              </div>
              <div className="mb-2">
                <i className="fa fa-map-marker"></i> India - 401105
              </div>
              <div className="mb-2">
                <i className="fa fa-phone"></i> +91 1234567890
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
