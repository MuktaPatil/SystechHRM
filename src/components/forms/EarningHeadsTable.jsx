import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Login";
import { useEmployeeType } from "./personal";

const EarningHeadsTable = ({ ID }) => {
  const { token } = useAuth();
  const { employeeTypeId } = useEmployeeType();
  const [details, setDetails] = useState([]);
  const [caderwiseEarnings, setCaderwiseEarnings] = useState([]);
  const [earningDetails, setEarningDetails] = useState([]);
  const [heads, setHeads] = useState([]);
  const [selectedHeads, setSelectedHeads] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [basicSalaryAmount, setBasicSalaryAmount] = useState();

  useEffect(() => {
    const fetchHeadsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/earning-heads/FnShowActiveData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        setHeads(data);
      } catch (error) {
        console.log("Error while fetching course data: ", error);
      }
    };
    fetchHeadsData();
  }, [token, ID]);

  useEffect(() => {
    const fetchCaderwiseEarning = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/caderwise-earning/FnShowParticularData",
          {
            params: { EmployeeTypeId: employeeTypeId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const caderwiseData = response.data;

        // Check if employee-wise entry exists
        const employeeWiseResponse = await axios.get(
          "http://localhost:5500/employee-wise-earning/FnShowParticularData",
          {
            params: { EmployeeId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const employeeWiseData = employeeWiseResponse.data;

        if (employeeWiseData.length > 0) {
          setCaderwiseEarnings(employeeWiseData);
        } else {
          setCaderwiseEarnings(caderwiseData);
        }
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchCaderwiseEarning();
  }, [token, ID, employeeTypeId]);

  useEffect(() => {
    const updatedHeads = heads.map((head) => ({
      ...head,
      Selected: caderwiseEarnings.some(
        (earnings) => earnings.EarningHeadId === head.EarningHeadId
      ),
    }));
    setHeads(updatedHeads);
  }, [caderwiseEarnings]);

  useEffect(() => {
    let isMounted = true;

    const fetchEmpSalary = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/employee/salary-structure/FnShowParticularData`,
          {
            params: { EmployeeId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        if (isMounted) {
          setDetails(data); // Update state with fetched data only if component is mounted
        }
      } catch (error) {
        console.error("Error fetching salary details:", error);
      }
    };

    if (ID) {
      fetchEmpSalary(); // Call fetch function when ID changes
    }

    return () => {
      // Cleanup function to run when component unmounts or ID changes
      isMounted = false; // Set mounted flag to false to prevent state updates after unmount
    };
  }, [ID, token]);

  useEffect(() => {
    const fetchEmployeeTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee-type/FnShowParticularData",
          {
            params: { EmployeeTypeId: employeeTypeId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        setEmployeeTypes(data);
        // colsole.log("Employee Type Data", data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchEmployeeTypes();
  }, [token]);

  useEffect(() => {
    const fetchBasicSalary = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/earning-heads/FnGetBasicSalary",
          {
            params: { EmployeeId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        setBasicSalaryAmount(data);
        console.log("Basic Salary", data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchBasicSalary();
  }, [token, ID]);

  const calculateValue = (formula, salary, calculationValue) => {
    try {
      const totalEarning = salary;
      if (formula === null) {
        return calculationValue || 0;
      } else {
        const basicSalary = basicSalaryAmount;
        // Replace placeholders with actual values
        const modifiedFormula = formula
          .replace("P1", salary)
          .replace("P2", basicSalary)
          .replace("P3", totalEarning);

        // Evaluate conditional formulas
        const result = evaluateFormula(modifiedFormula, salary, basicSalary);
        // console.log("result", result);
        return result;
      }
    } catch (error) {
      console.error("Error in formula calculation: ", error);
      return "Error";
    }
  };

  const evaluateFormula = (formula, P1, P2) => {
    try {
      console.log("Formula:", formula);
      const parts = formula.split(/:(?![^(]*\))/).map((part) => part.trim()); // Split by ':' but ignore ':' inside parentheses
      console.log("Parts:", parts);
      const defaultCalculation = parts.pop().trim(); // Last part is default calculation
      console.log("Default Calculation:", defaultCalculation);
      const conditionCalculations = parts.map((part) => {
        const [condition, calculation] = part
          .split("?")
          .map((item) => item.trim());
        return { condition, calculation };
      });
      console.log("Condition Calculations:", conditionCalculations);

      // Evaluating the conditions and returning the result
      for (const { condition, calculation } of conditionCalculations) {
        console.log("Current Condition:", condition);
        console.log("Current Calculation:", calculation);
        if (eval(condition.replace("P1", P1).replace("P2", P2))) {
          const result = eval(calculation.replace("P1", P1).replace("P2", P2));
          console.log("Result:", result);
          return result;
        }
      }

      // If none of the conditions are met, return the default calculation
      const defaultResult = eval(
        defaultCalculation.replace("P1", P1).replace("P2", P2)
      );
      console.log("Default Result:", defaultResult);
      return defaultResult;
    } catch (error) {
      console.error("Error in formula evaluation: ", error);
      return "Error";
    }
  };

  const handleCalculationValueChange = (index, newValue) => {
    const updatedHeads = [...heads];
    const calculatedValue = calculateValue(
      updatedHeads[index].Formula,
      details ? details.GrossSalary : 0,
      parseFloat(newValue)
    );
    updatedHeads[index].CalculationValue = calculatedValue;
    console.log("Updated heads before state update:", updatedHeads);
    setHeads(updatedHeads);
  };

  const handleFormulaChange = (index, newValue) => {
    const updatedHeads = [...heads];
    updatedHeads[index].Formula = newValue;
    setHeads(updatedHeads);
  };

  const handleCheckboxChange = (index) => {
    const updatedHeads = [...heads];
    updatedHeads[index].Selected = !updatedHeads[index].Selected;
    setHeads(updatedHeads);
  };

  useEffect(() => {
    const selectedHeadsData = heads
      .filter((item) => item.Selected)
      .map(
        ({
          EarningHeadId,
          EarningHead,
          CalculationType,
          CalculationValue,
          Formula,
        }) => ({
          EmployeeType: employeeTypes?.ShortName,
          EarningHeadId,
          EarningHead,
          ECalculationType: CalculationType,
          ECalculationValue:
            CalculationType === "Amount"
              ? CalculationValue
              : calculateValue(Formula, details ? details.GrossSalary : 0, 0),
          Formula,
          EmployeeId: ID,
          EmployeeTypeId: employeeTypes?.EmployeeTypeId,
          EmployeeTypeGroup: employeeTypes?.EmployeeTypeGroup,
          IUFlag: "U",
        })
      );
    setSelectedHeads(selectedHeadsData);
  }, [heads, employeeTypes, ID]);

  const addEmployeewiseEarning = async () => {
    try {
      const response = axios.post(
        "http://localhost:5500/employee-wise-earning/FnAddUpdateDeleteRecord",
        selectedHeads,
        {
          params: { EmployeeId: ID },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Employee-wise Earning Heads Added");
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    const updatedHeads = heads.map((head) => ({
      ...head,
      CalculationValue: calculateValue(
        head.Formula,
        details ? details.GrossSalary : 0,
        head.CalculationValue
      ),
    }));
    setHeads(updatedHeads);
  }, [token, basicSalaryAmount]); // Add basicSalaryPercentage as a dependency

  return (
    <div className="gap-4 justify-between">
      <div className="my-1 rounded-2xl bg-white p-2 pr-8">
        <table className="text-center h-auto text-[11px] rounded-lg justify-center whitespace-normal">
          <thead>
            <tr>
              <th
                colSpan="6"
                className="bg-blue-900 text-white font-semibold border-white border-2"
              >
                Earning Heads
              </th>
            </tr>
            <tr>
              <th className="text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white">
                Select
              </th>
              <th className="text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white ">
                Earning <br /> Head
              </th>
              <th className="text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white">
                Short <br /> Name
              </th>
              <th className="text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white">
                Calculation <br /> Type
              </th>
              <th className="text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white">
                Calculation <br /> Value
              </th>
              <th className="text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white">
                Formula
              </th>
            </tr>
          </thead>
          <tbody>
            {heads.map((item, index) => (
              <tr
                key={index}
                className={`${item.Selected ? "" : "bg-gray-100"} `}
              >
                <td>
                  <label className="capitalize font-semibold text-[11px]">
                    <input
                      type="checkbox"
                      className="w-5 h-5 mr-2 mt-2 focus:outline-gray-300 border border-blue-900 rounded-lg"
                      checked={item.Selected}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </label>
                </td>
                <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                  {item.EarningHead}
                </td>
                <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                  {item.ShortName}
                </td>
                <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                  {item.CalculationType}
                </td>
                <td className="px-2 border-2 whitespace-normal text-left text-[11px]">
                  <input
                    type="number"
                    className="w-16 py-1 rounded-md text-center"
                    value={calculateValue(
                      item.Formula,
                      details ? details.GrossSalary : 0,
                      item.CalculationValue
                    )}
                    onChange={(e) =>
                      handleCalculationValueChange(index, e.target.value)
                    }
                  />
                </td>
                <td className="px-2 border-2 whitespace-normal text-left text-[11px]">
                  <input
                    type="text"
                    className=" w-20 py-1 rounded-md text-center"
                    value={item.Formula}
                    onChange={(e) => handleFormulaChange(index, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex mt-2 justify-center gap-4">
          <button
            type="button"
            className="px-2 py-2 bg-blue-900 text-white text-xs rounded-md"
            onClick={addEmployeewiseEarning}
          >
            Submit Earning Heads Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EarningHeadsTable;
