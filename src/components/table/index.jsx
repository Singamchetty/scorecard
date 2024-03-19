import React from "react";
import Loading from "../loading Component/Loading";

function Table({headers, data,loading, maxHeight}) {
  if(loading) return <Loading/>

  return (
    <div className={` overflow-auto sm:rounded-lg p-4 bg-gray-100`}>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-transparent justify-center border-separate border-spacing-y-2">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700  dark:text-white">
          <tr className="mb-2">
            {headers.map((item,index) => (
              <th key={index} scope="col" className={`px-6 py-4 w-[${item.width}]`} > 
                {item.title}
              </th>
            ))}
          </tr>
        </thead>
       { (data?.length)?
         <tbody>
         {
           data?.map((item, index) => (
               <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600">
                   {
                     headers?.map(({render, id}) => (
                       <td   className="px-6 py-4 listData" >{render ? render(item[id]) : item[id] === "" ? "NA" : item[id] }</td>
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
        <p className="text-center align-middle pt-14 pb-14 text-blue-500  font-bold">No records to display</p>
     </div>:null
      }
    </div>
  );
  // else
//   return <div className="w-full h-full">
//      <p className="text-center align-middle pt-14 pb-14 text-blue-500  font-bold">No records to display</p>
//   </div>
}

export default Table;
