import React from "react";

function Table({headers, data, isView}) {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((item) => (
              <th scope="col" class="px-6 py-3">
                {item.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
            {
                data?.map((item, index) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        {headers?.map((field) => (
                            field.id !== "action" ? <td class="px-6 py-4">{item[field.id]}</td> : <td class="px-6 py-4"><button>View</button></td>
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
