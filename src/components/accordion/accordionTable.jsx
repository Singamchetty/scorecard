import React from "react";
import moment from "moment";

function AccordionTable({ headers, data }) {   
    const getDate = (utc) => {
        return moment(utc).format('DD-MM-YYYY');
    }
  return (
    <div className="p-4">
      <table className="border-2 border-collapse w-full border-[#B7B7B7]">
        <thead>
          <tr>
            {headers?.map(({ title, width }) => (
              <th
                className={`border-2 p-2 border-[#B7B7B7] text-start font-medium bg-[#D9D9D9] w-[${width}]`}
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr>
              {headers?.map((header) => (
                <td
                  className={`border-2 p-2 border-[#B7B7B7] bg-${
                    header.id === "aName" ? "[#D9D9D9]" : "white"
                  }`} 
                >
                  {header?.id === 'recorded_date' ? <span>{getDate(item[header?.id])}</span> : <span className="truncate overflow-hidden whitespace-nowrap overflow-ellipsis">{item[header?.id]}</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccordionTable;
