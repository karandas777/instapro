import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import commentReducer from "./commentReduer";

export default combineReducers({
  users: userReducer,
  posts: postReducer,
  comments: commentReducer
});
