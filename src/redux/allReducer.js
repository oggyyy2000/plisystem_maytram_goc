import { combineReducers } from "redux";
import MissionId from "./reducers/MissionId";
import VTInfo from "./reducers/VTInfo";
import CurrentLocation from "./reducers/CurrentLocation";
import DefectInfo from "./reducers/DefectInfo";

const myReducer = combineReducers({
  MissionId,
  VTInfo,
  CurrentLocation,
  DefectInfo,
});

export default myReducer;
