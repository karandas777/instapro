import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import { allUser, editUser, selectPosts } from "../actions";
import Loading from "../components/Loading";
import UserListModal from "../components/UserListModal";
import ImageCard from "../components/ImageCard";

export class ProfileView extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.allUser();
    this.props.selectPosts();
  }

  isFollowing = (otherUserId) => {
    const { currentUser } = this.props;
    return currentUser.following.includes(otherUserId);
  };

  updateFollow = (otherUserId) => {
    const { currentUser, users } = this.props;

    let otherUser = users[otherUserId];

    let followingUser = currentUser.following.includes(otherUserId);
    if (currentUser._id !== otherUser._id) {
      if (followingUser) {
        this.props.editUser({
          ...currentUser,
          following: currentUser.following.filter((id) => id !== otherUserId)
        });
        this.props.editUser({
          ...otherUser,
          followers: otherUser.followers.filter((id) => id !== currentUser._id)
        });
      } else {
        this.props.editUser({
          ...currentUser,
          following: [...currentUser.following, otherUserId]
        });
        this.props.editUser({
          ...otherUser,
          followers: [...otherUser.followers, currentUser._id]
        });
      }
    }
  };

  render() {
    const { viewUser, viewUserPost, users, currentUser } = this.props;

    if (!viewUser || !currentUser) return <Loading />;

    let followersList = [];
    let followingList = [];
    followersList = viewUser.followers.map((followerId) => users[followerId]);
    followingList = viewUser.following.map((followingId) => users[followingId]);

    return (
      <React.Fragment>
        <Header />
        <div className="container py-5 min-height">
          <div className="row">
            <div className="col-md-3 pb-3 text-center">
              <img
                src={viewUser.imgurl}
                className="profile-pic bg-grad-1 rounded-pill p-1"
                alt="profile-pic"
              />
            </div>
            <div className="col-md-9 profile-title p-4">
              <div className="display-4">{viewUser.name}</div>
              <button
                className="btn btn-link btn-sm text-primary font-weight-bold text-decoration-none mb-4"
                onClick={() => this.updateFollow(viewUser._id)}
              >
                {this.isFollowing(viewUser._id) ? "Following" : "Follow"}
              </button>
            </div>
            <div className="col-md-12 py-3">
              <div className="btn-group w-100">
                <button className="btn btn-light btn-sm">
                  <span className="font-weight-bold mr-1">
                    {viewUserPost.length}
                  </span>
                  Posts
                </button>
                <button
                  className="btn btn-light btn-sm"
                  data-toggle="modal"
                  data-target="#followersModal"
                >
                  <span className="font-weight-bold mr-1">
                    {viewUser.followers.length}
                  </span>
                  Follower
                </button>
                <button
                  className="btn btn-light btn-sm"
                  data-toggle="modal"
                  data-target="#followingModal"
                >
                  <span className="font-weight-bold mr-1">
                    {viewUser.following.length}
                  </span>
                  Following
                </button>
              </div>
            </div>
          </div>

          <div className="postHolder">
            {viewUserPost.map((post) => (
              <ImageCard post={post} key={post._id} />
            ))}
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

function mapStateToProps(state, ownProps) {
  const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
  const { id } = ownProps.match.params;

  let viewUser = state.users[id];

  //viewUserPost
  const viewUserPost = Object.entries(state.posts)
    .filter(([key, value]) => value.user_id === id)
    .map((post) => post[1])
    .reverse();

  return {
    users: state.users,
    viewUser,
    viewUserPost,
    currentUser: state.users[currentUser.userId]
  };
}

export default connect(mapStateToProps, {
  allUser,
  selectPosts,
  editUser
})(ProfileView);
