import React, { Component } from "react";

export default class Loading extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          src={require("../assets/loader.gif")}
          alt="loading"
          className="img-fluid rounded"
        />
      </div>
    );
  }
}
