import { combineReducers } from 'redux';
import reporteesReducer from './reporteesSlice';


const rootReducer = combineReducers({
    reportees: reporteesReducer
});

export default rootReducer;