import { combineReducers } from 'redux';
import reporteesReducer from './reporteesSlice';
import userReducer from './userSlice';
import reportReducer from './viewreporteeSlice';
import  exporttableReducer from './exporttableslice';
import activitiesReducer from './activitiesSlice'

const rootReducer = combineReducers({
    userDetails: userReducer,
    reportees: reporteesReducer,
    reports: reportReducer,
    totalreportees: exporttableReducer, 
    activities: activitiesReducer,
});

export default rootReducer;