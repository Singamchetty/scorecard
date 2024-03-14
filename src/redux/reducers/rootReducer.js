import { combineReducers } from 'redux';
import reporteesReducer from './reporteesSlice';
import userReducer from './userSlice';
import reportReducer from './reportSlice';


const rootReducer = combineReducers({
    userDetails: userReducer,
    reportees: reporteesReducer,
    reports: reportReducer
});

export default rootReducer;