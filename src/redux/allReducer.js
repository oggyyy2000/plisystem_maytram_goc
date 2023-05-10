import { combineReducers } from "redux";
import MissionId from "./reducers/MissionId";
import VTInfo from "./reducers/VTInfo";

const myReducer = combineReducers({
  MissionId,
  VTInfo,
});

export default myReducer;
