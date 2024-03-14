import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [id, setId] = useState(null);

  const handleNavigate = () => {
    navigate(`${id}/dashboard`);
  };

  return (
    <div className="container py-10 px-10 mx-0 min-w-full h-screen flex items-center justify-center bg-blue-100 ">
      <div class="">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight   md:text-5xl lg:text-6xl text-purple-900 mb-10 ">SCORE  CARD</h1>
      <div className="max-w-sm p-10 bg-white border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
        <label
          for="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Employee Id
        </label>
        <input
          type="text"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=""
          required
          onChange={(e) => setId(e.target.value)}
        />
        <button
          className="bg-purple-900 text-white disabled:bg-purple-900 hover:bg-blue-400 font-bold py-2 px-4 mt-6  rounded text-center ml-15"
          onClick={handleNavigate}
          disabled={!id}
        >
          Submit
        </button>
      </div>
      </div>
    </div>
  );
}

export default Home;
