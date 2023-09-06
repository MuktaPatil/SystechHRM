import React from "react";
import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import DeductionHeadsModal from "./DeductionHeadsModal";
import ViewDeductionHeads from "./ViewDeductionHeads";

export const DeductionHeads = [
  {
    DeductionHeadId: 1,
    DeductionHead: "Income Tax",
    ShortName: "IT",
    CalculationType: "Percentage",
    Status: true,
  },
  {
    DeductionHeadId: 2,
    DeductionHead: "Health Insurance",
    ShortName: "HI",
    CalculationType: "Fixed Amount",
    Status: false,
  },
  {
    DeductionHeadId: 3,
    DeductionHead: "401(k) Contribution",
    ShortName: "401(k)",
    CalculationType: "Percentage",
    Status: true,
  },
  {
    DeductionHeadId: 4,
    DeductionHead: "Life Insurance Premium",
    ShortName: "Life Ins",
    CalculationType: "Fixed Amount",
    Status: true,
  },
  {
    DeductionHeadId: 5,
    DeductionHead: "Employee Stock Purchase Plan",
    ShortName: "ESPP",
    CalculationType: "Percentage",
    Status: false,
  },
  {
    DeductionHeadId: 6,
    DeductionHead: "Union Dues",
    ShortName: "Union",
    CalculationType: "Fixed Amount",
    Status: true,
  },
  {
    DeductionHeadId: 7,
    DeductionHead: "Childcare Expenses",
    ShortName: "Childcare",
    CalculationType: "Percentage",
    Status: false,
  },
  {
    DeductionHeadId: 8,
    DeductionHead: "Student Loan Repayment",
    ShortName: "Loan Repay",
    CalculationType: "Fixed Amount",
    Status: true,
  },
  // Add more deduction heads as needed
];

const DeductionHeadsMaster = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (title, searchWord) => {
    const newFilter = DeductionHeads.filter((item) => {
      const value = item[title];
      return value && value.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const [veDeductionH, setVeDeductionH] = useState(false);
  const [edit, setEdit] = useState(false);
  const [EHid, setEHid] = useState();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [columnVisibility, setColumnVisibility] = useState({
    DeductionHead: true,
    ShortName: true,
    CalculationType: true,
    Status: true,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //Max Searchbar width
  const getColumnMaxWidth = (columnName) => {
    let maxWidth = 0;
    const allRows = [...DeductionHeads];

    allRows.forEach((row) => {
      const cellContent = row[columnName];
      const cellWidth = getTextWidth(cellContent, "11px"); // You can adjust the font size here
      maxWidth = Math.max(maxWidth, cellWidth);
    });

    return maxWidth + 10; // Adding some padding to the width
  };

  const getTextWidth = (text, fontSize) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = fontSize + " sans-serif";
    return context.measureText(text).width;
  };

  //Toggle columns
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([
    ...Object.keys(columnVisibility),
  ]);

  const toggleColumn = (columnName) => {
    if (selectedColumns.includes(columnName)) {
      setSelectedColumns((prevSelected) =>
        prevSelected.filter((col) => col !== columnName)
      );
    } else {
      setSelectedColumns((prevSelected) => [...prevSelected, columnName]);
    }
  };

  useEffect(() => {
    console.log("Selected Columns:", selectedColumns);
  }, [selectedColumns]);

  const selectAllColumns = () => {
    setSelectedColumns([...Object.keys(columnVisibility)]);
  };

  const deselectAllColumns = () => {
    setSelectedColumns([]);
  };

  return (
    <div className="top-25 min-w-[40%]">
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 sm:whitespace-nowrap text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-x-auto">
        <div className="flex items-center gap-4">
          <div className="mr-auto text-[15px] whitespace-nowrap">
            Payroll Settings / Deduction Heads Master
          </div>
          <div className="relative sticky lg:ml-[340px] sm:ml-8">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex text-[13px] bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white duration-200 font-semibold px-4 rounded-lg cursor-pointer whitespace-nowrap"
            >
              Column Visibility
              <Icon
                icon="fe:arrow-down"
                className={`mt-1.5 ml-2 ${
                  showDropdown ? "rotate-180" : ""
                } cursor-pointer`}
              />
            </button>
          </div>
          {showDropdown && (
            <div className="absolute top-[16%] lg:ml-[42%] sm:mr-[20%] bg-white border border-gray-300 shadow-md rounded-lg p-2 z-50 top-[calc(100% + 10px)]">
              {/* Dropdown content */}
              <div className="flex items-center mb-2">
                <button
                  className="text-blue-500 hover:text-blue-700 underline mr-2 text-[13px]"
                  onClick={selectAllColumns}
                >
                  Select All
                </button>
                <button
                  className="text-blue-500 hover:text-blue-700 underline text-[13px]"
                  onClick={deselectAllColumns}
                >
                  Deselect All
                </button>
              </div>
              {Object.keys(columnVisibility).map((columnName) => (
                <label
                  key={columnName}
                  className="flex items-center capitalize text-black text-[13px]"
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedColumns.includes(columnName)}
                    onChange={() => toggleColumn(columnName)}
                  />
                  <span
                    className={
                      selectedColumns.includes(columnName)
                        ? "font-semibold"
                        : ""
                    }
                  >
                    {columnName}
                  </span>
                </label>
              ))}
            </div>
          )}

          <div className="min-w-[40%]">
            <button
              className="text-white font-semibold px-4 rounded-lg text-[13px] border border-white"
              onClick={() => setModalOpen(true)}
            >
              Add Company
            </button>
          </div>
        </div>
        <div className="flex items-center mb-2 lg:mr-[210px] sm:mr-[60px]">
          <button
            className=" cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon icon="carbon:menu" color="white" width="27" height="27" />
          </button>
          {menuOpen && (
            <div
              ref={menuRef}
              className="w-24 flex flex-col absolute lg:top-28 lg:right-38 bg-white border border-gray-300 shadow-md rounded-lg p-1 items-center mb-2"
            >
              <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-1 px-4 rounded-lg mb-2 z-50">
                Copy
              </button>
              <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-1 px-4 rounded-lg mb-2 z-50">
                CSV
              </button>
              <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-1 px-4 rounded-lg mb-2">
                Excel
              </button>
              <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-1 px-4 rounded-lg mb-2">
                PDF
              </button>
              <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-1 px-4 rounded-lg mb-2">
                Print
              </button>
            </div>
          )}
        </div>
      </div>
      <DeductionHeadsModal
        visible={isModalOpen}
        onClick={() => setModalOpen(false)}
      />
      <div className="grid gap-4  justify-between">
        <div className="my-1 rounded-2xl bg-white p-2 pr-8">
          <table className="min-w-full text-center  rounded-lg justify-center whitespace-normal">
            <thead>
              <tr>
                <th className=" px-1 text-[13px] font-bold text-black border-2 border-gray-400">
                  Actions
                </th>
                <th className=" w-auto px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                  ID
                </th>
                {selectedColumns.map((columnName) => (
                  <th
                    key={columnName}
                    className={`px-1 text-[13px] font-bold text-black border-2 border-gray-400 ${
                      columnVisibility[columnName] ? "" : "hidden"
                    }`}
                  >
                    {columnName}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="border-2"></th>
                <th className="p-2 font-semibold text-black border-2" />
                {selectedColumns.map((columnName) => (
                  <th
                    key={columnName}
                    className="p-2 font-bold text-black border-2 text-[11px]"
                  >
                    <input
                      type="text"
                      placeholder={`Search `}
                      className="w-auto text-[11px] h-6 border-2 border-slate-500 rounded-lg justify-center text-center whitespace-normal"
                      style={{ maxWidth: getColumnMaxWidth(columnName) + "px" }}
                      onChange={(e) =>
                        handleSearchChange(columnName, e.target.value)
                      }
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {filteredData.length > 0
                ? filteredData.map((result, key) => (
                    <tr key={key}>
                      <td className="px-2 border-2">
                        <div className="flex gap-2 text-center">
                          <Icon
                            icon="lucide:eye"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setVeDeductionH(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setEHid(result.DeductionHeadId); // Pass ID to VEModal
                            }}
                          />
                          <ViewDeductionHeads
                            visible={veDeductionH}
                            onClick={() => setVeDeductionH(false)}
                            edit={edit}
                            ID={EHid}
                          />
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setVeDeductionH(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setEHid(result.DeductionHeadId); // Pass ID to VEModal
                            }}
                          />
                          <ViewDeductionHeads
                            visible={veDeductionH}
                            onClick={() => setVeDeductionH(false)}
                            edit={edit}
                            ID={EHid}
                          />
                          <Icon
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                          />
                        </div>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        {result.DeductionHeadId}
                      </td>
                      {selectedColumns.map((columnName) => (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-[11px] text-left${
                            columnVisibility[columnName] ? "" : "hidden"
                          }`}
                        >
                          {columnName === "Status"
                            ? result[columnName]
                              ? "Active"
                              : "Inactive"
                            : result[columnName]}
                        </td>
                      ))}
                    </tr>
                  ))
                : DeductionHeads.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-2 border-2">
                        <div className="flex items-center gap-2 text-center justify-center">
                          <Icon
                            icon="lucide:eye"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setVeDeductionH(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setEHid(entry.DeductionHeadId); // Pass ID to VEModal
                            }}
                          />
                          <ViewDeductionHeads
                            visible={veDeductionH}
                            onClick={() => setVeDeductionH(false)}
                            edit={edit}
                            ID={EHid}
                          />
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setVeDeductionH(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setEHid(entry.DeductionHeadId); // Pass ID to VEModal
                            }}
                          />
                          <ViewDeductionHeads
                            visible={veDeductionH}
                            onClick={() => setVeDeductionH(false)}
                            edit={edit}
                            ID={EHid}
                          />
                          <Icon
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                          />
                        </div>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        {entry.DeductionHeadId}
                      </td>
                      {selectedColumns.map((columnName) => (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-left text-[11px]${
                            columnVisibility[columnName] ? "" : "hidden"
                          }`}
                        >
                          {columnName === "Status"
                            ? entry[columnName]
                              ? "Active"
                              : "Inactive"
                            : entry[columnName]}
                        </td>
                      ))}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeductionHeadsMaster;
