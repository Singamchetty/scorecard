import {resetUser} from '../redux/reducers/userSlice';
import {resetReportees} from '../redux/reducers/reporteesSlice';
import { resetReports } from '../redux/reducers/viewreporteeSlice';
import {resetReporteesTableData} from '../redux/reducers/exporttableslice';
const clearStore = (dispatch) => {
    dispatch(resetUser());
    dispatch(resetReportees());
    dispatch(resetReports())
    dispatch(resetReporteesTableData())
};

export default clearStore;