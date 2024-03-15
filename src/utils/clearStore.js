import {resetUser} from '../redux/reducers/userSlice';
import {resetReportees} from '../redux/reducers/reporteesSlice';

const clearStore = (dispatch) => {
    dispatch(resetUser());
    dispatch(resetReportees());
};

export default clearStore;