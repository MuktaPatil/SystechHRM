import React from 'react'
import { useFormik } from 'formik'
import { useState } from 'react';
import { Icon } from '@iconify/react';

const ProfesionalTaxModal = ({visible, onClick}) => {
    const formik = useFormik({
        initialValues:{
        ProfessionalTaxId:"",
        Gender: "",
        UpperLimit: "",
        LowerLimit: "",
        PTAmount: "",
        PTAmountFebruary: "",
         Remark:"",
         Status: "",
        },
        onSubmit:(values) =>{
         console.log(values)
        }
     })

     const [isStatusChecked, setStatusChecked] = useState(false)
     const handleCheckboxChange = (fieldName, setChecked, event) => {
         const checked = event.target.checked;
         setChecked(checked);
         formik.setValues({
           ...formik.values,
           [fieldName]: checked.toString(),
         });
       };

       
if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[15px] font-semibold text-center">
              Professional Tax Master
            </p>
            <Icon
              icon="maki:cross"
              color="white"
              className="cursor-pointer"
              onClick={onClick}
              width="24"
              height="24"
            />
          </div>
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Professional Tax ID
                </p>
                <input
                  id="ProfessionalTaxId"
                  type="number"
                  value={formik.values.ProfessionalTaxId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
             <div>
                <p className="capitalize font-semibold text-[13px]">Gender</p>
                <div>
                  <input
                    type="radio"
                    className="mr-2"
                    name="Gender"
                    value="Male"
                    onChange={formik.handleChange}
                  />
                  <label className="text-[13px]">Male</label>
                </div>
                <div>
                  <input
                    type="radio"
                    className="mr-2"
                    name="Gender"
                    value="Female"
                    style={{ marginTop: "10px" }}
                    onChange={formik.handleChange}
                  />
                  <label className="text-[13px]">Female</label>
                </div>
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Upper Limit
                </p>
                <input
                  id="UpperLimit"
                  type="number"
                  value={formik.values.UpperLimit}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Lower Limit
                </p>
                <input
                  id="LowerLimit"
                  type="number"
                  value={formik.values.LowerLimit}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  PT Amount
                </p>
                <input
                  id="PTAmount"
                  type="number"
                  value={formik.values.PTAmount}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  PT Amount Feburary
                </p>
                <input
                  id="PTAmountFeburary"
                  type="number"
                  value={formik.values.PTAmountFeburary}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">Remark</p>
                <input
                  id="Remark"
                  type="text"
                  value={formik.values.Remark}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold  text-[13px]">Status</p>
                <label className="capitalize font-semibold  text-[11px]">
                  <input
                    id="status"
                    type="checkbox"
                    checked={isStatusChecked}
                    value={formik.values.Status}
                    className={`w-5 h-5 mr-2 mt-2 focus:outline-gray-300 border-2 rounded-lg`}
                    onChange={(event)=> handleCheckboxChange('Status', setStatusChecked, event)}
                  />
                  Active
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-10 justify-center">
            <button
              type="submit"
              className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
            >
              Save
            </button>
            <button
              className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
              onClick={onClick}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfesionalTaxModal