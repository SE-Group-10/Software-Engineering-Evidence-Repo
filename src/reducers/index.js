import { combineReducers } from "redux";
import userReducer from "./isLogged";

const allReducers = combineReducers({ seerUserReducer: userReducer });

export default allReducers;
