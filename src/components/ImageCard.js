import React, { Component } from "react";
import Loading from "./Loading";
import { connect } from "react-redux";
import { allUser, editPost, addComment, postComment } from "../actions";
import history from "../routes/history";
import { Modal, ModalBody } from "reactstrap";

import LazyLoad from "react-lazyload";
import { toast } from "react-toastify";

export class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      comment: "",
      modal: false,
    };

    this.commentRef = React.createRef();
  }

  componentDidMount() {
    this.props.allUser();
    const { post } = this.props;
    if (post) {
      this.props.postComment(post._id);
    }
  }

  // componentDidUpdate(prevProp, prevState) {
  //   if (prevState.isOpen !== this.state.isOpen) {
  //     this.state.isOpen && this.commentRef.current.focus();
  //   }
  // }

  funToggleComment = () => {
    this.setState({ isOpen: !this.state.isOpen }, () => {
      this.state.isOpen && this.commentRef.current.focus();
    });
  };

  toggle = () => this.setState({ modal: !this.state.modal });

  viewProfile = (id) => {
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    if (id === currentUser.userId) return history.push("/profile");
    history.push(`/profile-view/${id}`);
  };

  onPost = async (user_id, post_id, comment) => {
    if(this.state.comment !== ""){
      await this.props.addComment({
        user_id,
        post_id,
        comment,
      });
      this.setState({ comment: "", isOpen: false });
    }
    else{
      toast.error('Please add a valid comment')
    }

  };

  onLike = (post) => {
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    let likedby = [];
    if (post.likedby.includes(currentUser.userId)) {
      likedby = post.likedby.filter((id) => id !== currentUser.userId);
    } else {
      likedby = [...post.likedby, currentUser.userId];
    }
    this.props.editPost({ ...post, likedby });
  };

  render() {
    const { post, userDetail, postComments, users } = this.props;
    if (!post && !userDetail && !users) return <Loading />;

    const postdate = new Date(post.createdAt);

    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    const isLike = post.likedby.includes(currentUser.userId);

    return (
      <div className="postCard card mb-3 py-1 border-0 d-inline-block w-100">
        <LazyLoad height={200}>
          <div className="px-2 my-1">
            <img
              src={userDetail.imgurl}
              alt="profile-pic"
              className="bg-grad-1 rounded-pill mb-1 p-1"
              height="40"
              width="40"
            />
            <button
              className="btn btn-link text-decoration-none text-dark"
              onClick={() => this.viewProfile(userDetail._id)}
            >
              {post.username}
            </button>
          </div>
          <img
            src={post.imgurl}
            alt={post.title}
            className="post-img rounded"
            onClick={(e) => {
              if (e.detail === 1) this.toggle();
              if (e.detail === 2) this.onLike(post);
            }}
          />
          <div className="px-2">
            <div className="mt-2">
              <button
                className="btn btn-link text-decoration-none text-dark p-0 mr-3"
                onClick={() => this.onLike(post)}
              >
                {isLike ? (
                  <i className="fa fa-heart text-danger fa-2x"></i>
                ) : (
                  <i className="fa fa-heart-o fa-2x"></i>
                )}
              </button>
              <button
                className="btn btn-link text-decoration-none text-dark p-0"
                onClick={this.funToggleComment}
              >
                <i className="fa fa-comment-o fa-2x"></i>
              </button>
              <a
                className="text-decoration-none text-dark float-right"
                href={post.imgurl}
                download
              >
                <i className="fa fa-bookmark-o fa-2x"></i>
              </a>
            </div>
            <div className="mt-2 small font-weight-bold">
              {post.likedby.length} Likes
            </div>
            <div className="mt-2">
              <span className="font-weight-bold mr-2">{post.username}</span>
              {post.title}
            </div>
            {/* Show Comment if length > 1 */}
            <div>
              {postComments && postComments.length > 0 && (
                <div className="small font-weight-bold mt-2">
                  {postComments.length} Comments
                </div>
              )}
            </div>
            <div>
              {postComments && postComments.length > 1
                ? [postComments[0], postComments[1]].map((post, i) => (
                    <div className="text-muted small" key={i}>
                      <span className="font-weight-bold">
                        {users[post.user_id].name}{" "}
                      </span>
                      {post.comment}
                    </div>
                  ))
                : ""}
            </div>
            {this.state.isOpen ? (
              <div className="my-3 px-3">
                <div className="row border rounded">
                  <div className="col-9 px-0">
                    <input
                      type="text"
                      ref={this.commentRef}
                      className="form-control border-0"
                      placeholder="Write a Comment"
                      value={this.state.comment}
                      onChange={(e) =>
                        this.setState({ comment: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-3 pl-1 pr-0">
                    <button
                      className="btn btn-light w-100"
                      onClick={() =>
                        this.onPost({
                          user_id: currentUser.userId,
                          post_id: post._id,
                          comment: this.state.comment,
                        })
                      }
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mb-3 mt-2 text-muted ultra-small">
              {postdate.toDateString()}
            </div>
          </div>
        </LazyLoad>

        {/* Image Modal  */}
        <div>
          <Modal isOpen={this.state.modal}>
            <ModalBody className="p-0">
              <div className="p-2 mt-1">
                <img
                  src={userDetail.imgurl}
                  alt="profile-pic"
                  className="bg-grad-1 rounded-pill mb-1 p-1"
                  height="40"
                  width="40"
                />
                <button
                  className="btn btn-link text-decoration-none text-dark"
                  onClick={() => this.viewProfile(userDetail._id)}
                >
                  {post.username}
                </button>
              </div>
              <img
                src={post.imgurl}
                alt={post.title}
                className="post-img"
                onClick={(e) => {
                  if (e.detail === 2) this.onLike(post);
                }}
              />
              <div className="px-3">
                <div className="mt-2">
                  <button
                    className="btn btn-link text-decoration-none text-dark p-0 mr-3"
                    onClick={() => this.onLike(post)}
                  >
                    {isLike ? (
                      <i className="fa fa-heart text-danger fa-2x"></i>
                    ) : (
                      <i className="fa fa-heart-o fa-2x"></i>
                    )}
                  </button>
                  <button className="btn btn-link text-decoration-none text-dark p-0">
                    <i className="fa fa-comment-o fa-2x"></i>
                  </button>
                  <a
                    className="text-decoration-none text-dark float-right"
                    href={post.imgurl}
                    download
                  >
                    <i className="fa fa-bookmark-o fa-2x"></i>
                  </a>
                </div>

                <div className="mt-2 small font-weight-bold">
                  {post.likedby.length} Likes
                </div>

                <div className="mt-2">
                  <span className="font-weight-bold mr-2">{post.username}</span>
                  {post.title}
                </div>

                <div>
                  {postComments && postComments.length > 0 && (
                    <div className="small font-weight-bold mt-2">
                      {postComments.length} Comments
                    </div>
                  )}
                </div>

                <div>
                  {postComments && postComments.length > 0
                    ? postComments.map((post, i) => (
                        <div className="small" key={i}>
                          <span className="font-weight-bold">
                            {users[post.user_id].name}{" "}
                          </span>
                          {post.comment}
                        </div>
                      ))
                    : ""}
                </div>

                <div className="my-3 px-2">
                  <div className="row border rounded">
                    <div className="col-9 px-0">
                      <input
                        type="text"
                        className="form-control border-0"
                        placeholder="Write a Comment"
                        value={this.state.comment}
                        onChange={(e) =>
                          this.setState({ comment: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-3 pr-0 pl-1">
                      <button
                        className="btn btn-light w-100"
                        onClick={() =>
                          this.onPost({
                            user_id: currentUser.userId,
                            post_id: post._id,
                            comment: this.state.comment,
                          })
                        }
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mb-3 mt-2 text-muted ultra-small">
                  {postdate.toDateString()}
                </div>
              </div>
              <div className="text-center my-3">
                <button
                  className="btn btn-danger btn-sm rounded-pill p-1"
                  onClick={this.toggle}
                >
                  <i className="fa fa-times px-1 fa-2x"></i>
                </button>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { user_id, _id } = ownProps.post;
  // console.log(state.users);

  return {
    userDetail: state.users[user_id],
    postComments: state.comments[_id],
    users: state.users,
  };
}

export default connect(mapStateToProps, {
  allUser,
  editPost,
  addComment,
  postComment,
})(Card);
