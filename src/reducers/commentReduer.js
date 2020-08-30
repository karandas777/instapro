import { ADD_COMMENT, POST_COMMENT } from "../actions/typeConfig";

const ININTAL_STATE = {};

export default (state = ININTAL_STATE, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return { ...state, [action.payload.post_id]: action.payload.comments };
    case POST_COMMENT:
      return { ...state, [action.payload.post_id]: action.payload.comments };
    default:
      return state;
  }
};
