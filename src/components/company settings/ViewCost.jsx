import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { useAuth } from "../Login";

const VECost = ({ visible, onClick, edit, ID }) => {
  const [status, setStatus] = useState(false);
  const [details, setDetails] = useState();
  const { token } = useAuth();

  const formik = useFormik({
    initialValues: {
      CostCenterName: "",
      Remark: "",
      Status: status,
    },
    onSubmit: async (values) => {
      const stat = status === true;
      const updatedData = {
        CostCenterId: ID,
        CostCenterName: values.CostCenterName,
        Remark: values.Remark,
        ModifiedOn: new Date(),
        IUFlag: "U",
        Status: stat,
      };
      axios
        .post(
          `http://localhost:5500/cost-center/FnAddUpdateDeleteRecord`,
          updatedData,
          {
            params: { CostCenterId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          // Handle success
          console.log("Data updated successfully", response);
          // You can also perform additional actions here, like closing the modal or updating the UI.
          window.location.reload();
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating data", error);
        });
    },
  });

  // API
  useEffect(() => {
    fetchNewData();
  }, [ID]);

  const fetchNewData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/cost-center/FnShowParticularData`,
        {
          params: { CostCenterId: ID },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      console.log(data);
      setDetails(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };

  console.log("details", details);
  useEffect(() => {
    if (details.length > 0) {
      formik.setValues({
        CostCenterId: details[0].CostCenterId,
        CostCenterName: details[0].CostCenterName,
        Remark: details[0].Remark,
        Status: details[0].Status === "1", // Assuming "1" means true
      });
      setStatus(details[0].Status === "1");
    }
  }, [details]);

  const [isStatusChecked, setStatusChecked] = useState(false);
  const handleCheckboxChange = (fieldName, setChecked, event) => {
    const checked = event.target.checked;
    setChecked(checked);
    formik.setValues({
      ...formik.values,
      [fieldName]: checked,
    });
  };

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold text-center">
              Cost Center Master
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
                  Cost Center ID
                </p>
                <input
                  id="CostCenterId"
                  type="number"
                  value={ID}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  disabled={true}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Cost Center Name
                </p>
                <input
                  id="CostCenterName"
                  type="text"
                  value={formik.values.CostCenterName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">Remarks</p>
                <textarea
                  id="Remark"
                  value={formik.values.Remark}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capitalize font-semibold  text-[13px]">Status</p>
                <label className="capitalize font-semibold  text-[11px]">
                  <input
                    id="Status"
                    type="checkbox"
                    checked={formik.values.Status}
                    className={`w-5 h-5 mr-2 mt-5 focus:outline-gray-300 border-2 rounded-lg`}
                    onChange={(event) =>
                      handleCheckboxChange("status", setStatusChecked, event)
                    }
                    disabled={!edit}
                  />
                  Active
                </label>
              </div>
            </div>
            <div className="flex mt-5 gap-10 justify-center">
              {edit && ( // Only show the "Save" button if edit is true
                <button
                  type="submit"
                  className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
                >
                  Save
                </button>
              )}
              <button
                className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
                onClick={onClick}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default VECost;
