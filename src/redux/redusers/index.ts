import { combineReducers } from "redux";
import { listReducer, userReducer } from "./redusers";

export default combineReducers({
        list: listReducer,
        user: userReducer,
    });
