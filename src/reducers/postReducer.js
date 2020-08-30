import _ from "lodash";
import { SELECT_POSTS, EDIT_POST } from "../actions/typeConfig";

const ININTAL_STATE = {};

export default (state = ININTAL_STATE, action) => {
  switch (action.type) {
    // case ADD_USER:
    //   return state;
    case SELECT_POSTS:
      return _.mapKeys(action.payload, "_id");
    case EDIT_POST:
      return _.mapKeys(action.payload, "_id");
    default:
      return state;
  }
};
