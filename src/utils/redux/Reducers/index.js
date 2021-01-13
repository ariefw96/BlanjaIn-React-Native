import { combineReducers } from "redux";
import authReducer from './auth'
import addressReducer from './address'

const reducers = combineReducers({
  auth : authReducer,
  address: addressReducer,
});

export default reducers;