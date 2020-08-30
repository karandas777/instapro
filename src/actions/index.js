import postBox from "../apis/postbox";
import history from "../routes/history";
import {
  ADD_USER,
  All_USER,
  SELECT_POSTS,
  EDIT_POST,
  POST_COMMENT,
  ADD_COMMENT,
} from "./typeConfig";

import { toast } from "react-toastify";

// User

export const createUser = ({ name, email, password, dob }) => async (
  dispatch
) => {
  toast.dark("Please wait!");
  const response = await postBox.post("/add-user", {
    name,
    email,
    password,
    dob,
    imgurl: `https://avatars.dicebear.com/api/bottts/${name}.svg`,
    following: [],
    followers: [],
  });

  if (response.data.status === "OK") {
    toast.success("User created succesfully. Please Log in !");

    dispatch({
      type: ADD_USER,
    });

    history.push("/login");
  } else {
    toast.error("Something went wrong!");
  }
};

export const allUser = () => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");

    const {
      data: { message: allUser },
    } = await postBox.get("/select-user", {
      headers: {
        auth: token,
      },
    });

    dispatch({
      type: All_USER,
      payload: allUser,
    });
  } catch (error) {
    history.push("/error");
  }
};

export const editUser = (upateValue) => async (dispatch) => {
  const token = window.localStorage.getItem("token");

  await postBox.post("/edit-user", upateValue, {
    headers: {
      auth: token,
    },
  });

  dispatch(allUser());
};

export const verifyUser = ({ email, password }, showToast) => async (
  dispatch
) => {
  if (showToast === true) {
    toast.dark("Please wait!");
  }
  const response = await postBox.post("/verify-user", {
    email,
    password,
  });

  const token = response.data.token;
  const currentUser = JSON.stringify({
    name: response.data.name,
    userId: response.data._id,
  });

  // set token in localStorage after verify user

  window.localStorage.setItem("token", token);
  window.localStorage.setItem("currentUser", currentUser);

  if (response.data.status === "OK") {
    dispatch(allUser());

    if (showToast === true) {
      history.push("/");
      toast.dark("Welcome to Postbox " + response.data.name);
    }
  } else {
    // TODO: Make ui to user know this
    history.push("/register");
    toast.error("User not Found!");
    toast.dark("Create an account first");
  }
};

// Post

export const createPost = ({ title, url }) => async (dispatch) => {
  try {
    const { name, userId } = JSON.parse(
      window.localStorage.getItem("currentUser")
    );
    const token = window.localStorage.getItem("token");
    await postBox
      .post(
        "/add-post",
        {
          username: name,
          user_id: userId,
          title,
          imgurl: url,
          likedby: [],
        },
        {
          headers: {
            auth: token,
          },
        }
      )
      .then(() => {
        history.push("/profile");
        toast.success("Photo Uploaded!");
      });
  } catch (error) {
    history.push("/error");
  }
};

export const selectPosts = () => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await postBox.get("/select-post", {
      headers: {
        auth: token,
      },
    });

    dispatch({
      type: SELECT_POSTS,
      payload: response.data.message,
    });
  } catch (error) {
    history.push("/error");
  }
};

export const editPost = (updateValue) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");

    await postBox.post("/edit-post", updateValue, {
      headers: {
        auth: token,
      },
    });

    const response = await postBox.get("/select-post", {
      headers: {
        auth: token,
      },
    });

    dispatch({
      type: EDIT_POST,
      payload: response.data.message,
    });
  } catch (error) {
    history.push("/error");
  }
};

// Comment

export const addComment = (value) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");

    await postBox.post("/add-comment", value, {
      headers: {
        auth: token,
      },
    });

    const response = await postBox.post(
      "/post-comment",
      { post_id: value.post_id },
      {
        headers: {
          auth: token,
        },
      }
    );

    dispatch({
      type: ADD_COMMENT,
      payload: { post_id: value.post_id, comments: response.data.message },
    });
  } catch (error) {
    history.push("/error");
  }
};

export const postComment = (id) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await postBox.post(
      "/post-comment",
      { post_id: id },
      {
        headers: {
          auth: token,
        },
      }
    );

    dispatch({
      type: POST_COMMENT,
      payload: { post_id: id, comments: response.data.message },
    });
  } catch (error) {
    history.push("/error");
  }
};
