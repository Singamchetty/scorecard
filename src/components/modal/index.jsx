import React, { useState } from "react";


export default function MyModal({ visible, onClose }) {
  const [aId,setAId]=useState("");
  const [aName,setAName]=useState("");
  const [valueType,setvalueType]=useState("");
  const [score,setScore]=useState(0);
  const [comments,setComments]=useState('');

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm   flex items-center justify-center">
      <div className="bg-white rounded w-4/12">
        <div className=" text-white py-3 pl-2 bg-blue-500">Default Activity</div>
        <div>
          <div>


            <form class=" p-2 max-w-sm mx-auto">
              <div className="flex items-center  my-5">
              <label for="countries">Default Activity List : </label>
              <select id="countries" class="bg-gray-50 ml-2 w-7/12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>List Types</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>

              </div>
              <div class="flex items-center mb-4 ">
                <label for="default-radio-1" class=" text-sm font-medium text-gray-900 dark:text-gray-300">Appreciation:</label>
                <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 m-3 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" />
                <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Depreciation:</label>
                <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 m-3 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" />
              </div>
              <div className="flex ">
                <span>Score</span>
                <select  className="border w-1/5">
                  <option value={1} selected>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>

              <div className="flex items-center my-5">
              <label for="message" class="block w-3/12 mb-20 text-sm font-medium text-gray-900 dark:text-white">Comments :</label>
              <textarea id="message" rows="4" class="block ml-2 p-2.5 w-9/12 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="..."></textarea>
              </div>
              <div className="flex items-center justify-end mb-3">
            <button onClick={onClose} className="px-3 py-2 bg-gray-700 text-white rounded">Cancel</button>
            <button  className="px-3  py-2 ml-5 bg-gray-700 text-white rounded">Save</button>
          </div>

            </form>
            

          </div>
          
         
        </div>
      </div>
    </div>
  );
}