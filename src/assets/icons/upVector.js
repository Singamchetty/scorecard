import React from "react";

function UpVector({isSelected}) {
  return (
    <svg
      fill="#000000"
      version="1.1"
      id="Capa_1"
      width="10px"
      height="10px"
      viewBox="0 0 123.959 123.959"
    >
      <g>
        <path
        style={{fill: isSelected ? '#3E79F7' : '#BFBFBF'}}
          d="M66.18,29.742c-2.301-2.3-6.101-2.3-8.401,0l-56,56c-3.8,3.801-1.1,10.2,4.2,10.2h112c5.3,0,8-6.399,4.2-10.2L66.18,29.742
		z"
        />
      </g>
    </svg>
  );
}

export default UpVector;
