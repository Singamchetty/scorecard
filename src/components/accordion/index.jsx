import React, { useState } from "react";
import AccordionTable from "./accordionTable";
import ModalButton from "../modal/modalButton";

function Accordion({ title, data }) {
  const [open, setOpen] = useState(false);

  const headers = [
    { title: "Name", id: "aName", width: "30%" },
    { title: "Date", id: "recorded_date", width: "20%" },
    { title: "Score", id: "score", width: "10%" },
    { title: "Comments", id: "comments", width: "40%" },
  ];
  return (
    <div className="px-4">
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="flex items-center justify-between w-full py-2 px-5 mt-4 font-medium rtl:text-right bg-[#B7B7B7] text-gray-500 border border-[#B7B7B7] focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
        data-accordion-target="#accordion-collapse-body-2"
        aria-expanded="false"
        aria-controls="accordion-collapse-body-2"
      >
        <span>{title}</span>
        <svg
          data-accordion-icon
          className="w-3 h-3 rotate-180 shrink-0"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>
      <div
        className={`${!open && "hidden"} mt-2`}
        aria-labelledby="accordion-collapse-heading-2"
      >
        <AccordionTable headers={headers} data={data} />
        <div className="flex justify-end mr-4">
             <ModalButton type={`${title === "Default Activities:" ? "default" : "initiative"}`}/>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
