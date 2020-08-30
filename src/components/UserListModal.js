import React from "react";
import history from "../routes/history";

const isFollowing = (followingList, otherUserId) => {
  return followingList.map((user) => user._id).includes(otherUserId);
};

const handleFollow = (id) => {
  const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
  if (id === currentUser.userId) return history.push("/profile");
  history.push(`/profile-view/${id}`);
};

function UserListModal({ type, followersList, followingList, addRemoveId }) {
  const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
  const active = type === "followers" ? followersList : followingList;

  return (
    <div className="modal fade" id={`${type}Modal`} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-scrollable" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <h4 className="mb-2 mt-1 type">
              {type}
              <button
                className="btn btn-danger float-right"
                data-dismiss="modal"
              >
                <i className="fa fa-times"></i>
              </button>
            </h4>
            <hr />
            {/* List of user */}
            <div>
              {active.map((user) => (
                <div
                  className="row bg-light p-1 mb-3 mx-1 rounded shadow-sm"
                  key={user._id}
                >
                  <div className="col-9 m-0 p-0">
                    <img
                      src={user.imgurl}
                      alt="user"
                      className="mini-profile bg-grad-1 mr-2 rounded p-1"
                    />
                    <button
                      onClick={(e) => handleFollow(user._id)}
                      className="btn btn-light btn-lg text-decoration-none"
                      data-dismiss="modal"
                    >
                      {user.name}
                    </button>
                  </div>
                  <div className="col-3 m-0 p-0 text-right">
                    {user._id !== currentUser.userId && (
                      <button
                        className="btn btn-light"
                        onClick={() => addRemoveId(user._id)}
                      >
                        {isFollowing(followingList, user._id) ? (
                          <i className="fa fa-check-circle fa-fw fa-2x text-primary"></i>
                        ) : (
                          <i className="fa fa-plus-circle fa-fw fa-2x text-secondary"></i>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserListModal;
