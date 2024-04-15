import { useFormik } from "formik";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useAuth } from "../Login";

const MVEModal = ({ visible, onClick, edit, ID }) => {
  const [details, setDetails] = useState([]);
  const [personal, setPersonal] = useState([]);
  const [Shifts, setShift] = useState([]);
  const [Jobs, setJobs] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [formattedDate, setFormattedDate] = useState("");

  const { token } = useAuth();
  const formik = useFormik({
    initialValues: {
      AttendanceId: ID,
      ApprovalFlag: "P",
      AttendanceDate: "",
      FYear: "",
      EmployeeTypeId: "",
      AMonth: "",
      AYear: "",
      EmployeeId: "",
      ShiftId: "",
      InTime: "",
      OutTime: "",
      JobTypeId: "",
      AttendanceFlag: "",
      SanctionBy: "",
      Remark: "",
      AcFlag: "Y",
      IUFlag: "U",
    },
    onSubmit: (values) => {
      console.log(values);
      // compData.push(values);
      const updatedData = {
        AttendanceId: values.AttendanceId,
        ApprovalFlag: values.ApprovalFlag,
        AttendanceDate: values.AttendanceDate,
        AttendanceFlag: values.AttendanceFlag,
        FYear: values.FYear,
        EmployeeTypeId: values.EmployeeTypeId,
        AMonth: formik.values.AMonth,
        AYear: formik.values.AYear,
        EmployeeId: values.EmployeeId,
        ShiftId: values.ShiftId,
        InTime: values.InTime,
        JobTypeId: values.JobTypeId,
        AttendanceFlag: values.AttendanceFlag,
        SanctionBy: values.SanctionBy,
        Remark: values.Remark,
        IUFlag: "U",
      };

      // Send a PUT request to update the data
      axios
        .post(
          `http://localhost:5500/manual-attendance/FnAddUpdateDeleteRecord`,
          updatedData,
          {
            params: { AttendanceId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          // Handle success
          alert("Data updated successfully", response);
          onClick();
          // You can also perform additional actions here, like closing the modal or updating the UI.
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating data", error);
        });
    },
  });

  useEffect(() => {
    fetchManData();
  }, [ID]);

  console.log(ID);
  const fetchManData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/manual-attendance/FnShowParticularData",
        {
          params: { AttendanceId: ID },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      setDetails(data);
    } catch (error) {
      console.error("Error while fetching company data: ", error.message);
    }
  };
  console.log("ID:", ID);
  console.log(details);

  useEffect(() => {
    if (details) {
      formik.setValues({
        AttendanceId: details.AttendanceId,
        ApprovalFlag: details.ApprovalFlag,
        AttendanceDate: details.AttendanceDate,
        AttendanceFlag: details.AttendanceFlag,
        FYear: details.FYear,
        EmployeeTypeId: details.EmployeeTypeId,
        AMonth: details.AMonth,
        AYear: details.AYear,
        EmployeeId: details.EmployeeId,
        ShiftId: details.ShiftId,
        InTime: details.InTime,
        OutTime: details.OutTime,
        JobTypeId: details.JobTypeId,
        SanctionBy: details.SanctionBy,
        Remark: details.Remark,
      });
    }
  }, [details]);

  // All API Calls
  const fetchPersonalData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/employee/personal/FnShowActiveData`,
        {
          headers: { Authorization: `Bearer ${token}` }, // Moved headers here
        }
      );
      console.log("Response Object", response);
      const data = response.data;
      setPersonal(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };

  // Get
  useEffect(() => {
    fetchPersonalData();
  }, [token]);

  // getting Employee Types
  useEffect(() => {
    const fetchEmployeeTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee-type/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        setEmployeeTypes(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchEmployeeTypes();
  }, [token]);

  // Shifts
  useEffect(() => {
    const fetchShift = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/k8g2d4j9/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        setShift(data);
        console.log(response);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchShift();
  }, [token]);

  //Job types
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/job-type/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        setJobs(data);
        console.log(response);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchJobs();
  }, [token]);

  const extractHoursMinutes = (datetimeString) => {
    if (!datetimeString) return '';
    // Split the datetime string by 'T' to separate date and time
    const parts = datetimeString.split('T');
    // Get the second part which contains the time
    const timePart = parts[1];
    // Extract only the time part (HH:MM)
    const time = timePart.split('.')[0]; // Remove milliseconds if present
    const [hours, minutes] = time.split(':');
    // Return the extracted hours and minutes
    return `${hours}:${minutes}`;
  };

  //Date Formats
  const handleFormatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const formatted = date.toISOString().split("T")[0];
      setFormattedDate(formatted);
    } catch (error) {
      console.error("Invalid date string:", dateString, error);
    }
  };
  useEffect(() => {
    handleFormatDate(details.AttendanceDate);
  }, [details]); // Run the effect when formikValues changes

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold text-center">
              Manual Attendance Entry
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
              <div className="flex">
                <label className="flex items-center text-[13px]">
                  <input
                    type="radio"
                    name="AttendanceFlag"
                    className="mr-2"
                    checked={formik.values.AttendanceFlag === "M"}
                    onChange={formik.handleChange}
                  />
                  Manual Attendance
                </label>
                <label className="flex items-center text-[13px]">
                  <input
                    type="radio"
                    name="AttendanceFlag"
                    className="mr-2 ml-2"
                    checked={formik.values.AttendanceFlag === "O"}
                    onChange={formik.handleChange}
                  />
                  OutDoor Duty
                </label>
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Attendance ID
                </p>
                <input
                  id="AttendanceId"
                  type="text"
                  value={details?.AttendanceId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Attendance Date</p>
                <input
                  id="AttendanceDate"
                  type="text"
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  value={formattedDate}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">FYear</p>
                <input
                  id="FYear"
                  type="text"
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  value={formik.values.FYear}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Employee Name</p>
                <select
                  id="EmployeeId"
                  name="EmployeeId"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
                  value={formik.values.EmployeeId}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="" disabled>
                    Select an employee
                  </option>
                  {personal.length > 0 &&
                    personal.map((employee) => (
                      <option
                        key={employee.EmployeeId}
                        value={employee.EmployeeId}
                      >
                        {employee.EmployeeName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="py-1">
                <p className="font-semibold text-[13px]">Employee Type</p>
                <select
                  name="EmployeeTypeId"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
                  value={formik.values.EmployeeTypeId}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Type</option>
                  {employeeTypes.map((entry) => (
                    <option
                      key={entry.EmployeeTypeId}
                      value={entry.EmployeeTypeId}
                    >
                      {entry.EmployeeType}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-[13px] font-semibold">Attendance Month</p>
                <input
                  id="AMonth"
                  type="number"
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  value={formik.values.AMonth}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Attendance Year</p>
                <input
                  id="AYear"
                  type="number"
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  value={formik.values.AYear}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="mb-1 font-semibold text-[13px]">Shift</p>
                <select
                  id="ShiftId"
                  name="ShiftId"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
                  value={formik.values.ShiftId}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Shift</option>
                  {Shifts.map((entry) => (
                    <option key={entry.ShiftId} value={entry.ShiftId}>
                      {entry.ShiftName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="mb-1 font-semibold text-[13px]">Job Type</p>
                <select
                  id="JobTypeId"
                  name="JobTypeId"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
                  value={formik.values.JobTypeId}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Job Type</option>
                  {Jobs.map((entry) => (
                    <option key={entry.JobTypeId} value={entry.JobTypeId}>
                      {entry.JobTypeName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-[13px] font-semibold">In Time</p>
                <input
                  id="InTime"
                  type="time" // Change the input type to handle date and time
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  value={extractHoursMinutes(formik.values.InTime)}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>

              <div>
                <p className="text-[13px] font-semibold">Remark</p>
                <input
                  id="Remark"
                  type="text"
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  value={formik.values.Remark}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
            </div>
            <div className="flex mt-5 gap-10 justify-center">
              <button
                type="submit"
                className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36 text-[13px]"
              >
                Save
              </button>
              <button
                className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36 text-[13px]"
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

export default MVEModal;
