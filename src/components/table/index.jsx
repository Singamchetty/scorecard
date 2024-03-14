import React from "react";
import {Link} from 'react-router-dom';

function Table({headers, data, isView}) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-transparent justify-center">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
          <tr>
            {headers.map((item) => (
              <th scope="col" className="px-6 py-3" > 
                {item.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
            {
                data?.map((item, index) => (
                    <tr className="bg-white border-b-8 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        {headers?.map((field) => (
                            field.id !== "action" ?<td className="px-6 py-4 listData" >{field.id==="empName"?<span className="flex items-center"><img className="pr-2" src="/user.png" width="30px" height="30px"/>{item[field.id]}</span> :item[field.id]}</td> : <td className="px-6 py-3 border-l-2"><Link to={`/${item.empId}/reports`}><button type="button" className="bg-blue-400 text-white rounded-md px-3 py-1">View</button></Link></td>
                        ))}
                        
                    </tr>
                ))
            }

        </tbody>
      </table>
    </div>
  );
}

export default Table;
