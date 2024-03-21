import { combineReducers } from 'redux';
import reporteesReducer from './reporteesSlice';
import userReducer from './userSlice';
import reportReducer from './viewreporteeSlice';
import  exporttableReducer from './exporttableslice';

const rootReducer = combineReducers({
    userDetails: userReducer,
    reportees: reporteesReducer,
    reports: reportReducer,
    totalreportees: exporttableReducer
});

export default rootReducer;