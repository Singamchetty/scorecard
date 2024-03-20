import {resetUser} from '../redux/reducers/userSlice';
import {resetReportees} from '../redux/reducers/reporteesSlice';
import { resetReports } from '../redux/reducers/viewreporteeSlice';

const clearStore = (dispatch) => {
    dispatch(resetUser());
    dispatch(resetReportees());
    dispatch(resetReports())
};

export default clearStore;