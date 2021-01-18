import { combineReducers } from "redux";
import authReducer from './auth'
import addressReducer from './address'
import bagReducer from './bag'
const reducers = combineReducers({
  auth : authReducer,
  address: addressReducer,
  bag: bagReducer
});

export default reducers;