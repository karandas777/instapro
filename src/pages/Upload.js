import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import { createPost } from "../actions/index";
import fireStorage from "../firebase/config";
import { toast } from "react-toastify";

export class Upload extends Component {
  state = { url: "", title: "", file: null };

  componentDidUpdate() {
    const { url, title } = this.state;
    if (url !== "" && title !== "") {
      this.props.createPost({ url, title });
    }
    
  }

  onUpload = (e) => {
    e.preventDefault();
    const { file ,title } = this.state;
    if (file && title !== "") {
      const newImage = fireStorage.child(file.name);
      toast.dark("Please wait, Upload in progress !");
      newImage.put(file).then((snap) => {
        newImage.getDownloadURL().then((url) => this.setState({ url: url }));
      });
    }
    else{
      toast.error('Please fill all the fields')
    }
  };

  onFileSelect = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  render() {
    return (
      <div>
        <Header />

        <div className="container-fluid pt-5 px-0">
          <div className="col-md-5 mx-auto pt-4 px-1">
            <div className="bg-grad-1 text-light rounded-lg p-3 shadow">
              <div className="h2">Create Post</div>
              <hr className="bg-light mb-3" />
              <form>
                <div className="mt-3 h5">Title</div>
                <input
                  type="text"
                  className="form-control my-3"
                  value={this.state.title}
                  onChange={(e) => this.setState({ title: e.target.value })}
                />
                <div className="mt-3 h5">Image</div>
                <input
                  type="file"
                  className="form-control my-3 p-1"
                  placeholder="Image"
                  // value={this.state.file.name}
                  onChange={this.onFileSelect}
                />
                <button className="btn btn-light my-3" onClick={this.onUpload}>
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { createPost })(Upload);
