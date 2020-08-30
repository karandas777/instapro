import _ from "lodash";
import { ADD_USER, All_USER } from "../actions/typeConfig";

const ININTAL_STATE = {};

export default (state = ININTAL_STATE, action) => {
  switch (action.type) {
    case ADD_USER:
      return state;
    case All_USER:
      return _.mapKeys(action.payload, "_id");
    default:
      return state;
  }
};
