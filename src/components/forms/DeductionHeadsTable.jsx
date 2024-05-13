import React, { useEffect, useState } from "react";
import { useAuth } from "../Login";
import axios from "axios";
import { useEmployeeType } from "./personal";

const DeductionHeadsTable = ({ ID }) => {
  console.log("ID in deduciton", ID);
  const { token } = useAuth();
  const { employeeTypeId } = useEmployeeType();
  const [caderwiseDeductions, setCaderwiseDeductions] = useState([]);
  const [selectedHeads, setSelectedHeads] = useState([]);
  const [details, setDetails] = useState([]);
  const [heads, setHeads] = useState([]);
  const [checked, setChecked] = useState([]);
  const [basicSalaryAmount, setBasicSalaryAmount] = useState()
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [Designation, setDesignation] = useState()

  useEffect(() => {
    const fetchHeadsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/deduction-heads/FnShowActiveData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        console.log(data);
        setHeads(data);
      } catch (error) {
        console.log("Error while fetching course data: ", error);
      }
    };
    fetchHeadsData();
  }, [token, ID]);

  useEffect(() => {
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
        setDetails(data);
        console.log(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchEmpSalary();
  }, [ID, token]);

  useEffect(() => {
    const fetchCaderwiseDeduction = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/caderwise-deduction/FnShowParticularData",
          {
            params: { EmployeeTypeId: employeeTypeId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const caderwiseData = response.data;
        console.log("Caderwise data", caderwiseData);

        // Check if employee-wise entry exists
        const employeeWiseResponse = await axios.get(
          "http://localhost:5500/employee-wise-deductions/FnShowParticularData",
          {
            params: { EmployeeId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const employeeWiseData = employeeWiseResponse.data;
        console.log("Employee wise data", employeeWiseData);

        if (employeeWiseData.length > 0) {
          console.log("Deduction heads have already been defined");
          setCaderwiseDeductions(employeeWiseData);
        } else {
          console.log("Mapping from Caderwise deductions");
          setCaderwiseDeductions(caderwiseData);
        }
        console.log("Deduction for the employee", caderwiseDeductions);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchCaderwiseDeduction();
  }, [token, ID, employeeTypeId]);

  useEffect(() => {
    const updatedHeads = heads.map((head) => ({
      ...head,
      Selected: caderwiseDeductions.some(
        (deduction) => deduction.DeductionHeadID === head.DeductionHeadID
      ) || head.Selected // Also check if the head was previously selected
    }));
  
    setHeads(updatedHeads);
  }, [caderwiseDeductions]);

  useEffect(() => {
    // Calculate and update CalculationValue for all heads when relevant dependencies change
    const updatedHeads = heads.map((head) => ({
      ...head,
      CalculationValue: calculateValue(
        head.Formula,
        details ? details.GrossSalary : 0,
        head.CalculationValue
      )
    }));
    setHeads(updatedHeads);
  }, [details]);
  

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
        console.log("Employee Type Data", data);
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
        setBasicSalaryAmount(data)
        console.log("Basic Salary", data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchBasicSalary();
  }, [token, ID]);

  useEffect(() => {
    const fetchDesignation = async() => {
      try {
        const response = await axios.get('http://localhost:5500/employee/salary-structure/FnGetEmployeeDesignation',
        {
          params: { EmployeeId: ID },
          headers: { Authorization: `Bearer ${token}`}
        }
        )
        const data = response.data
        setDesignation(data)
        console.log('Designation', data)
      } catch (error) {
        console.error('Error', error);
      }
    }
    fetchDesignation()
  },[token, ID])

  const calculateValue = (formula, salary, calculationValue, Designations) => {
    try {
      const totalEarning = salary;
      if (formula === null) {
        return calculationValue || 0;
      } else {
        const basicSalary = basicSalaryAmount; // Assuming basicSalaryAmount is defined elsewhere
  
        // Replace placeholders with actual values
        const modifiedFormula = formula
          .replace("P1", salary)
          .replace("P2", basicSalary)
          .replace("P3", totalEarning)
          .replace("DESG", Designations);
  
        // Evaluate the modified formula
        const result = evaluateFormula(modifiedFormula, salary, basicSalary);
        console.log('result', result);
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
      const parts = formula.split(/:(?![^(]*\))/).map(part => part.trim()); // Split by ':' but ignore ':' inside parentheses
      console.log("Parts:", parts);
      const defaultCalculation = parts.pop().trim(); // Last part is default calculation
      console.log("Default Calculation:", defaultCalculation);
      const conditionCalculations = parts.map(part => {
        const [condition, calculation] = part.split('?').map(item => item.trim());
        return { condition, calculation };
      });
      console.log("Condition Calculations:", conditionCalculations);
  
      // Evaluating the conditions and returning the result
      for (const { condition, calculation } of conditionCalculations) {
        console.log("Current Condition:", condition);
        console.log("Current Calculation:", calculation);
        const designationMatch = condition.match(/DESG\s*=\s*'([^']+)'/);
        if (designationMatch) {
          const designation = designationMatch[1];
          if (designation === P1) {
            const result = eval(calculation.replace("P1", P1).replace("P2", P2));
            console.log("Result:", result);
            return result;
          }
        } else if (eval(condition.replace("P1", P1).replace("P2", P2))) {
          const result = eval(calculation.replace("P1", P1).replace("P2", P2));
          console.log("Result:", result);
          return result;
        }
      }
  
      // If none of the conditions are met, return the default calculation
      const defaultResult = eval(defaultCalculation.replace("P1", P1).replace("P2", P2));
      console.log("Default Result:", defaultResult);
      return defaultResult;
    } catch (error) {
      console.error("Error in formula evaluation: ", error);
      return "Error";
    }
  };
  
  

  const handleCalculationValueChange = (index, newValue) => {
    console.log("New value:", newValue);
    const updatedHeads = [...heads];
    const calculatedValue = calculateValue(
      updatedHeads[index].Formula,
      details ? details.GrossSalary : 0,
      parseFloat(newValue)
    );
    console.log("Calculated value:", calculatedValue);
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
          DeductionHeadID,
          DeductionHead,
          CalculationType,
          CalculationValue,
          Formula,
        }) => ({
          EmployeeType: employeeTypes?.ShortName,
          DeductionHeadId: DeductionHeadID,
          DeductionHead,
          DCalculationType: CalculationType,
          DCalculationValue: CalculationType === 'Amount' ? CalculationValue : calculateValue(Formula, details ? details.GrossSalary : 0, 0),
          Formula,
          EmployeeId: ID,
          EmployeeTypeId: employeeTypes?.EmployeeTypeId,
          EmployeeTypeGroup: employeeTypes?.EmployeeTypeGroup,
          IUFlag: "U",
        })
      );
    setSelectedHeads(selectedHeadsData);
    console.log("Selected Heads", selectedHeads);
  }, [heads, employeeTypes, ID]);

  const addEmployeewiseDeduction = async () => {
    try {
      const response = axios.post(
        "http://localhost:5500/employee-wise-deductions/FnAddUpdateDeleteRecord",
        selectedHeads,
        { params: { EmployeeId: ID},
          headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Employee-wise Deduction Heads Added");
    } catch (error) {
      console.error("Error", error);
    }
  };

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
                Deduction Heads
              </th>
            </tr>
            <tr>
              <th className="text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white">
                Select
              </th>
              <th className="text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white ">
                Deduction <br /> Head
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
                  {item.DeductionHead}
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
            onClick={addEmployeewiseDeduction}
          >
            Submit Deduction Heads Details
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeductionHeadsTable;
