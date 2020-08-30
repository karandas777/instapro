import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import { allUser, editUser, selectPosts } from "../actions";
import Loading from "../components/Loading";
import fireStorage from "../firebase/config";
import UserListModal from "../components/UserListModal";
import ImageCard from "../components/ImageCard";

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: "",
      name: "",
      email: "",
      dob: "",
      imgurl: "",
      password: "",
      file: null,
      following: [],
      followers: [],
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.allUser();
    this.props.selectPosts();
  }

  setEdit = (user) => {
    this.setState({ ...user });
  };

  funChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onUpdateUser = () => {
    const { file } = this.state;

    if (file) {
      const newImage = fireStorage.child(file.name);
      newImage.put(file).then(async (snap) => {
        const url = await newImage.getDownloadURL();
        this.setState({ imgurl: url });
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      _id,
      name,
      email,
      dob,
      imgurl,
      password,
      following,
      followers,
    } = this.state;

    if (
      prevState.name !== name ||
      prevState.email !== email ||
      prevState.dob !== dob ||
      prevState.imgurl !== imgurl ||
      prevState.password !== password ||
      prevState.following !== following ||
      prevState.followers !== followers
    ) {
      this.props.editUser({
        _id,
        name,
        email,
        dob,
        imgurl,
        password,
        following,
        followers,
      });
    }
  }

  updateFollow = (otherUserId) => {
    const { currentUser, users } = this.props;

    let otherUser = users[otherUserId];

    let followingUser = currentUser.following.includes(otherUserId);

    if (followingUser) {
      this.props.editUser({
        ...currentUser,
        following: currentUser.following.filter((id) => id !== otherUserId),
      });
      this.props.editUser({
        ...otherUser,
        followers: otherUser.followers.filter((id) => id !== currentUser._id),
      });
    } else {
      this.props.editUser({
        ...currentUser,
        following: [...currentUser.following, otherUserId],
      });
      this.props.editUser({
        ...otherUser,
        followers: [...otherUser.followers, currentUser._id],
      });
    }
  };

  render() {
    let { currentUser, currentUserPost, users } = this.props;

    if (!currentUser) return <Loading />;

    let followersList = [];
    let followingList = [];
    followersList = currentUser.followers.map(
      (followerId) => users[followerId]
    );
    followingList = currentUser.following.map(
      (followingId) => users[followingId]
    );

    return (
      <React.Fragment>
        <Header />
        <div className="container py-5 px-custom min-height">
          <div className="row">
            <div className="col-md-3 pb-3 text-center">
              <img
                src={currentUser.imgurl}
                className="profile-pic bg-grad-1 rounded-pill p-1"
                alt="profile-pic"
              />
            </div>
            <div className="col-md-9 profile-title p-4">
              <div className="display-4">
                {currentUser.name}{" "}
                <img
                  src={require("../assets/verified.png")}
                  alt="profile-pic"
                  className="mb-2"
                />
              </div>
              <button
                data-toggle="modal"
                data-target="#editModal"
                className="btn btn-link btn-sm text-secondary text-decoration-none mb-4"
                onClick={() => {
                  this.setEdit(currentUser);
                }}
              >
                Edit Profile
              </button>
            </div>
            <div className="col-md-12 py-3">
              <div className="btn-group w-100">
                <button className="btn btn-light btn-sm">
                  <span className="font-weight-bold mr-1">
                    {currentUserPost.length}
                  </span>
                  Posts
                </button>
                <button
                  className="btn btn-light btn-sm"
                  data-toggle="modal"
                  data-target="#followersModal"
                  onClick={() => {
                    this.setEdit(currentUser);
                  }}
                >
                  <span className="font-weight-bold mr-1">
                    {currentUser.followers.length}
                  </span>
                  Follower
                </button>
                <button
                  className="btn btn-light btn-sm"
                  data-toggle="modal"
                  data-target="#followingModal"
                  onClick={() => {
                    this.setEdit(currentUser);
                  }}
                >
                  <span className="font-weight-bold mr-1">
                    {currentUser.following.length}
                  </span>
                  Following
                </button>
              </div>
            </div>
          </div>

          <div className="postHolder">
            {currentUserPost.map((post) => (
              <ImageCard post={post} key={post._id} />
            ))}
          </div>
        </div>

        {/* Edit Profile modals */}

        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <h5 className="mb-4">Hey {this.state.name} !</h5>
                <div className="text-center my-3">
                  <img
                    src={this.state.imgurl}
                    className="w-50 bg-grad-1 rounded-pill p-1"
                    alt="profile-pic"
                  />
                </div>
                <input
                  type="text"
                  className="form-control my-3"
                  name="name"
                  value={this.state.name}
                  onChange={this.funChangeHandler}
                  placeholder="Name"
                />
                <input
                  type="text"
                  className="form-control my-3"
                  name="email"
                  value={this.state.email}
                  onChange={this.funChangeHandler}
                  placeholder="Email"
                />
                <input
                  type="date"
                  className="form-control my-3"
                  name="dob"
                  value={this.state.dob}
                  onChange={this.funChangeHandler}
                  placeholder="DOB"
                />
                <input
                  type="file"
                  className="form-control p-1 my-3"
                  name="imgurl"
                  onChange={(e) => this.setState({ file: e.target.files[0] })}
                  placeholder="Img"
                />
                <input
                  type="password"
                  className="form-control my-3"
                  name="password"
                  value={this.state.password}
                  onChange={this.funChangeHandler}
                  placeholder="Password"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onUpdateUser}
                  data-dismiss="modal"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Followers list Modal */}
        <UserListModal
          type="followers"
          followersList={followersList}
          followingList={followingList}
          addRemoveId={this.updateFollow}
        />
        {/* Following list Modal */}
        <UserListModal
          type="following"
          followersList={followersList}
          followingList={followingList}
          addRemoveId={this.updateFollow}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));

  //currentUserPost
  const currentUserPost = Object.entries(state.posts)
    .filter(([key, value]) => value.user_id === currentUser.userId)
    .map((post) => post[1])
    .reverse();

  return {
    currentUser: state.users[currentUser.userId],
    currentUserPost,
    users: state.users,
  };
}

export default connect(mapStateToProps, { allUser, editUser, selectPosts })(
  Profile
);
