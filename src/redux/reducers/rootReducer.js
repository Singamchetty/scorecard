import { combineReducers } from 'redux';
import reporteesReducer from './reporteesSlice';
import userReducer from './userSlice';


const rootReducer = combineReducers({
    userDetails: userReducer,
    reportees: reporteesReducer
});

export default rootReducer;