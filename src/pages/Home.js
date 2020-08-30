import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import { allUser, selectPosts, verifyUser } from "../actions";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import ImageCard from "../components/ImageCard";
import history from "../routes/history";

import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

export class Home extends Component {
  
  componentDidMount() {
    window.scrollTo(0, 0);
    this.funRelogin();
    this.props.allUser();
    this.props.selectPosts();
  }
  

  funRelogin = () => {
    const token = window.localStorage.getItem("token");
    try{
      let decoded = jwtDecode(token);
      const {email,password} = decoded.data;
      this.props.verifyUser({ email, password },false);
    }
    catch{
      history.push('/login');
      toast.error('Something went wrong!');
      toast.dark('Please login again!')
    }
  };

  viewProfile = (id) => {
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    if (id === currentUser.userId) return history.push("/profile");
    history.push(`/profile-view/${id}`);
  };

  render() {
    const { followingListInfo, suggestionList } = this.props;
    if (!followingListInfo) return <Loading />;

    return (
      <React.Fragment>
        <Header />
        <div className="container-fluid px-0">
          <div className="container py-5 px-custom min-height">
            <div className="row m-0 p-0">
              <div className="col-md-7 pb-4 p-0 m-0">
                <div className="mb-5 text-secondary small px-2">
                  Recent Posts
                </div>
                {followingListInfo.map((post) => (
                  <ImageCard post={post} key={post._id} />
                ))}
              </div>
              <div className="col-md-5">
                <div className="suggestions">
                  <div className="py-5 px-4">
                    <div className="h1 logo">
                      <img
                        src={this.props.currentUser.imgurl}
                        alt="profile-pic"
                        className="bg-grad-1 p-1 rounded-pill mr-2 mb-1"
                        height="50"
                        width="50"
                      />
                      {this.props.currentUser.name}
                      <img
                        src={require("../assets/verified.png")}
                        alt="profile-pic"
                        className="mb-1"
                        height="40"
                        width="40"
                      />
                    </div>

                    <div className="my-3 text-secondary small px-2">
                      Suggested users
                    </div>

                    <div className="mt-3">
                      {suggestionList.slice(0,6).map((user) => (
                        <div className="p-1 mb-2 mx-1" key={user._id}>
                          <button
                            onClick={(e) => this.viewProfile(user._id)}
                            className="btn btn-link btn-lg text-dark text-decoration-none p-0"
                          >
                            <img
                              src={user.imgurl}
                              alt="user"
                              className="bg-grad-1 mr-2 rounded-pill p-1 mb-1"
                              height="30"
                              width="30"
                            />
                            {user.name}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  let currentUser = JSON.parse(window.localStorage.getItem("currentUser"));

  currentUser = state.users[currentUser.userId];
  if (currentUser && currentUser.following) {
    var followingListInfo = Object.entries(state.posts)
      .filter(
        ([key, value]) =>
          currentUser.following.includes(value.user_id) ||
          value.user_id === currentUser._id
      )
      .map((userPost) => userPost[1])
      .reverse();

    var suggestionList = Object.entries(state.users)
      .filter(
        ([key, value]) =>
          !currentUser.following.includes(value._id) &&
          value._id !== currentUser._id
      )
      .map((userPost) => userPost[1])
      .reverse();
  }

  return {
    currentUser,
    followingListInfo,
    suggestionList
  };
}

export default connect(mapStateToProps, { allUser, selectPosts, verifyUser })(
  Home
);
