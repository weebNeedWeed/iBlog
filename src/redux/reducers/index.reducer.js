import { combineReducers } from "redux";
import tesRedu from "./test";

const indexReducer = combineReducers({ test: tesRedu });

export default indexReducer;
