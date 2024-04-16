import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { fetchData } from "../../pages/admin";
 
const MyCreateModal = ({ setShowMyModal,handleRefresh}) => {
  const [formData, setFormData] = useState({
    atype: "",
    aName: "",
    appreciate: "",
    depreciate: "",
  });
  const [enableSubmit, setEnableSubmit] = useState(false);
 
  const handleInputChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    },
    [formData]
  );
 
  const handleRadioChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value === "true" });
    },
    [formData]
  );
 
  useEffect(() => {
    const { atype, aName, appreciate, depreciate } = formData;
    if (
      atype !== "" &&
      aName !== "" &&
      (appreciate === true || appreciate === false) &&
      (depreciate === true || depreciate === false)
    ) {
      // All conditions met
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }
  }, [formData]);
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
     // console.log(formData.atype);
      await axios.post(`${base_url}/addMasterActivity`, formData)
      .then((res)=>fetchData())
      setShowMyModal(false);
      setFormData({
        atype: "",
        aName: "",
        appreciate: "",
        depreciate: "",
      });
      handleRefresh()
      
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };
 
  return (
    <div className="absolute w-full h-full inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-md lg:w-4/12 sm:w-100">
        <div className="text-white py-3 pl-2 bg-blue-500 rounded-md text-start">
          atype Type
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="p-2 max-w-sm mx-auto text-[12px]"
          >
            <div className="flex items-center my-5">
              <label htmlFor="atype">
                SELECT atype<span className="text-[15px]">*</span>:{" "}
              </label>
              <select
                id="atype"
                name="atype"
                value={formData.atype}
                onChange={handleInputChange}
                className="bg-gray-50 ml-2 w-6/12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              >
                <option value="">Select</option>
                <option value="duties">Duties</option>
                <option value="initiative">Initiative</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="font-medium mr-2">
                atype Name<span className="text-[15px]">*</span>:
              </label>
              <input
                type="text"
                placeholder="Enter atype name"
                name="aName"
                value={formData.aName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2"
              />
            </div>
            <div className="flex items-center mb-1">
              <label htmlFor="appreciate" className="font-medium">
              Appreciate<span className="text-[15px]">*</span>:
              </label>
              <label htmlFor="appreciateTrue" className="font-medium ms-2">
                True{" "}
              </label>
              <input
                id="appreciateTrue"
                type="radio"
                value="true"
                name="appreciate"
                checked={formData.appreciate === true}
                onChange={handleRadioChange}
                className="w-4 h-4 m-3 text-blue-600 bg-gray-100 border-gray-300"
              />
              <label htmlFor="appreciateFalse" className="font-medium">
                False{" "}
              </label>
              <input
                id="appreciateFalse"
                type="radio"
                value="false"
                name="appreciate"
                checked={formData.appreciate === false}
                onChange={handleRadioChange}
                className="w-4 h-4 m-3 text-blue-600 bg-gray-100 border-gray-300"
              />
            </div>
            <div className="flex items-center mb-1">
              <label htmlFor="depreciate" className="font-medium">
              Depreciate<span className="text-[15px]">*</span>:
              </label>
              <label htmlFor="depreciateTrue" className="font-medium ms-2">
                True{" "}
              </label>
              <input
                id="depreciateTrue"
                type="radio"
                value="true"
                name="depreciate"
                checked={formData.depreciate === true}
                onChange={handleRadioChange}
                className="w-4 h-4 m-3 text-blue-600 bg-gray-100 border-gray-300"
              />
              <label htmlFor="depreciateFalse" className="font-medium">
                False{" "}
              </label>
              <input
                id="depreciateFalse"
                type="radio"
                value="false"
                name="depreciate"
                checked={formData.depreciate === false}
                onChange={handleRadioChange}
                className="w-4 h-4 m-3 text-blue-600 bg-gray-100 border-gray-300"
              />
            </div>
            <div className="flex items-center justify-end mb-3">
              <button className="px-3 py-2 rounded-md bg-gray-700 text-white"
              onClick={()=>setShowMyModal(false)}
              >
                Cancel
             
              </button>
              <button
                type="submit"
                className={`px-3 py-2 ml-5 rounded-md ${
                  enableSubmit
                    ? "bg-blue-500 text-white"
                    : "bg-gray-400 text-white"
                }`}
                disabled={!enableSubmit}
                title="Please fill all fields to submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
 
export default MyCreateModal;