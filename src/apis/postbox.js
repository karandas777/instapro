import axios from "axios";

export default axios.create({
  baseURL: "https://postboxserver.herokuapp.com/api",
  headers: {
    "content-type": "application/json",
  },
});
