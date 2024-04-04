import React, {useState, useEffect} from "react";
import { useSelector, useDispatch} from "react-redux";
import {setSortKey, setSortOrder} from '../../redux/reducers/reporteesSlice';
import Loading from "../loading Component/Loading";
import SortButton from "../sortButton";

function Table({headers, data,loading, handleSorting }) {
  const dispatch = useDispatch();
  const {sortKey,  sortOrder} = useSelector((state) => state.reportees);
  // const [sortedData, setSortedData] = useState([]);
  // const [sortKey, setSortKey] = useState(null);
  // const [sortOrder, setSortOrder] = useState('asc');

  // useEffect(() => {
  //   if(sortKey) {
  //     setSortKey(null);
  //   }
  //   setSortedData(data);
  // }, [data]);

  // useEffect(() => {
  //   if(sortKey) {
      
  //   }
  // }, [sortKey, sortOrder])

  const handleSort = (key) => {

    const order = key === sortKey ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
    if(sortOrder === 'desc' && key === sortKey) {
        dispatch(setSortKey(null))
      dispatch(setSortOrder('asc'));
        handleSorting(null, order)
    } else {
     dispatch(setSortKey(key));
      dispatch(setSortOrder(order));
      handleSorting(key, order)
    }
   

    // if(sortOrder === 'desc' && key === sortKey) {
    //   setSortedData(data);
    //   setSortKey(null);
    //   setSortOrder('asc');
    // } else {
    //   const sorted = [...data].sort((a, b) => {
    //     if (typeof a[key] === 'string') {
    //       return order === 'asc' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
    //     }
    //     return order === 'asc' ? a[key] - b[key] : b[key] - a[key];
    //   });
    //   setSortedData(sorted);
    //   setSortKey(key);
    //   setSortOrder(order);
    // }

  };

  if(loading) return <Loading/>
  else
  return (
    <div className={` overflow-auto sm:rounded-lg p-4 `}>
      <table className="w-full text-sm text-left rtl:text-right  bg-transparent justify-center ">
        <thead className="  uppercase bg-white font-extrabold">
          <tr className="mb-2 border-2 border-black-200">
            {headers?.map((item,index) => (
              <th key={index} scope="col" className={`px-6 py-4 w-[${item.width}]`} > 
                { item.renderHeader ? item.renderHeader(item.title) : item.isSorting ? 
                <span className="flex items-center">
                  <span className="mr-4">{item.title}</span> 
                  <SortButton selected={item.id === sortKey ? sortOrder : ''} handleClick={() =>handleSort(item.id)}/>
                </span> :
                 <span>{item.title}</span>
                }
              </th>
            ))}
          </tr>
        </thead>
       { 
       (data?.length)?<tbody >
         {
           data?.map((item, index) => (
               <tr key={item.id} className="bg-[#eef5ff] font-medium hover:bg-white " >
                   {
                     headers?.map(({render, id}) => (
                       <td className="px-6 py-2 "  >
                        {render ? render(item[id]) : item[id] === "" ? "NA" : item[id] }
                        </td>
                     ))
                   }
               </tr>
           ))
         }
         </tbody>:null
       }
      </table>
      {
        (!data?.length)?<div className="w-full h-full">
        <p className="text-center align-middle pt-14 pb-14 text-blue-500  font-bold">No Records Found</p>
     </div>:null
      }
    </div>
  );
}

export default Table;
