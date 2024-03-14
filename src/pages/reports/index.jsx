import React, {useState, useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { fetchReports } from "../../redux/reducers/reportSlice";

function Reports() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const reportees = useSelector((state) => state.reportees.reportees);
    const [empDetails, setEmpDetails] = useState(null);
    const { report, loading, error}=useSelector((state)=>state.reports)

    /*Example post data
{
    "empId":41689,
    "fromDate":"2024-03-10",
    "toDate":"2024-03-11"
}
*/

    useEffect(() => {
        if(id) {
            const emp = reportees?.filter((item) => item.empId === Number(id));
            setEmpDetails(emp[0]);
            const data = {
                "empId":Number(id),
                "fromDate":"2024-03-10",
                "toDate":"2024-03-15"
            }
            dispatch(fetchReports(data))
        }
        return (() => {
            setEmpDetails(null)
        })
    },[id]);
    
    useEffect(()=>{console.log( report, loading, error)},[ report, loading, error])

    return (
        <div>This Perots</div>
    )
}

export default Reports
