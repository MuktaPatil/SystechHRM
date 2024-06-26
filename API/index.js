require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./route/userRoutes"); // Import the user routes and secretKey
const jwt = require("jsonwebtoken");
const cors = require("cors"); // Import the cors middleware
app.use(express.json()); // Parse JSON requests
// const CompMaster = require("./route/CMRoute");
const CompConfig = require("./route/CompanyConfigRoute");
const BankMaster = require("./route/MBankRoutes");
// const DestinationMaster = require("./route/DestinationMasterRoute");
// const ThreeFieldMaster = require("./route/ThreeFieldsRoutes");
// const TwoFieldMaster = require("./route/TwoFieldsRoutes");
const CCMaster = require("./route/MCostCenterRoute");
// const EmpPersonal = require("./route/EmpPersonalRoute");
const EmpWork = require("./route/MEmployeeWorkProfile");
const MEmployeeSalary = require("./route/MEmployeeSalary");
const MEmployeeProfessional = require("./route/MEmployeeProfessional");
const MEmployeeAcademic = require("./route/MEmployeeAcademic");
const MEmployeeType = require("./route/MEmployeeType");
const MEmployeeGrade = require("./route/MEmployeeGrade");
const MDesignation = require("./route/MDesignation");
const MKRA = require("./route/MKRA");
const MJobResponsibility = require("./route/MJobResponsibility");
const MShift = require("./route/MShift");
const MLeaveType = require("./route/MLeaveType");
const TLeaves = require("./route/TLeaves");
const MWeeklyOff = require("./route/MWeeklyOff");
const EarningHeadsMaster = require("./route/MEarningHeads");
const MHoliday = require("./route/MHoliday");
const DeductionHeadsMaster = require("./route/MDeductionHeads");
const ProfessionalTaxMaster = require("./route/MProfessTax");
const AdvanceRequest = require("./route/TAdvanceRequest");
// const EmployeeId = require("./route/EmployeeIdRoute");
// const AttendanceMaster = require("./route/AttendanceMasterRoute");
// const EDImports = require("./route/EDImportsRoute");
const MEmployeeFamily = require("./route/MEmployeeFamily");
// const Currencies = require("./route/CurrenciesRoute");
const MCompany = require("./route/MCompany");
const MFinancialYear = require("./route/MFinancialYear");
const MEmployee = require("./route/MEmployee");
const MEmployeeWorkProfile = require("./route/MEmployeeWorkProfile");
const MDepartment = require("./route/MDepartment");
const MEmployeewiseEarning = require("./route/MEmployeewiseEarning");
const MEmployeewiseDeduction = require("./route/MEmployeewiseDeduction");
const MJobType = require("./route/MJobType");
const MCaderwiseEarning = require("./route/MCaderwiseEarning");
const MCaderwiseDeduction = require("./route/MCaderwiseDeduction");
const MDevice = require("./route/MDeviceRoute");
const TManualAttendance = require("./route/TManualAttendance");
const MGatePass = require("./route/MGatePass");
const HandleImage = require("./route/HandleImage");
const MLeaves = require("./route/MLeaves");
const MTwoField = require("./route/MTwoField");
const MMasterName = require("./route/MMasterName");
const EmpDocs = require("./route/MEmployeeDocs");
const NodeMailer = require("./route/NodeMailer");
const MLAttendance = require("./route/MLAttendance");
const MCostCenter = require("./route/MCostCenterRoute");
const AdvanceInstallments = require("./route/TAdvanceInstallments");
const CreateUserRoles = require("./route/CreateUserRoles");
const BranchMaster = require("./route/MBranchMaster");
const TMonthlyAttendance = require("./route/TMonthlyAttendance");
const TSalaryProcessing = require("./route/TSalaryProcessing");
const TMonthlyEarningImport = require("./route/TMonthlyEarningImport");
const TMonthlyDeductionImport = require("./route/TMonthlyDeductionImport");

// Apply the cors middleware to allow requests from any origin
app.use(cors());
// app.use(express.static("public"));
// Use the user routes
app.use("/users", userRoutes);
app.use("/nodemail", NodeMailer);
app.use("/companies", MCompany);
app.use("/financials", MFinancialYear);
app.use("/employee/personal", MEmployee);
app.use("/employee/work", MEmployeeWorkProfile);
app.use("/employee/salary-structure", MEmployeeSalary);
app.use("/employee/professional", MEmployeeProfessional);
app.use("/employee/academic", MEmployeeAcademic);
app.use("/employee/family", MEmployeeFamily);
app.use("/employee/documents", EmpDocs);
app.use("/company-config", CompConfig);
app.use("/bankmaster", BankMaster);
app.use("/departmentmaster", MDepartment);
// app.use("/threefieldmaster", ThreeFieldMaster);
app.use("/two-field", MTwoField);
app.use("/financials", MFinancialYear);
app.use("/job-type", MJobType);
// app.use("/destinationmaster", DestinationMaster);
app.use("/cost-center", MCostCenter);
app.use("/employee-type", MEmployeeType);
app.use("/employee-grade", MEmployeeGrade);
app.use("/d9e7x2a1", MDesignation);
app.use("/KRA-master", MKRA);
app.use("/job-responsibility", MJobResponsibility);
app.use("/k8g2d4j9", MShift);
app.use("/leave-type", MLeaveType);
app.use("/a5d3g2p6", TLeaves);
app.use("/weekly-off", MWeeklyOff);
app.use("/earning-heads", EarningHeadsMaster);
app.use("/s3f9n7v2", MHoliday);
app.use("/deduction-heads", DeductionHeadsMaster);
app.use("/professional-tax", ProfessionalTaxMaster);
app.use("/a0bdhs87t", AdvanceRequest);
// app.use("/attendance-master", AttendanceMaster);
// // app.use("/employeeid", EmployeeId);
// app.use("/ed-imports", EDImports);
// app.use("/currency", Currencies);
app.use("/employee-wise-earning", MEmployeewiseEarning);
app.use("/employee-wise-deductions", MEmployeewiseDeduction);
app.use("/caderwise-earning", MCaderwiseEarning);
app.use("/caderwise-deduction", MCaderwiseDeduction);
app.use("/job-type", MJobType);
app.use("/device", MDevice);
app.use("/manual-attendance", TManualAttendance);
app.use("/gate-pass", MGatePass);
app.use("/leave-balance", MLeaves);
app.use("/master-names", MMasterName);
app.use("/advance-installments", AdvanceInstallments);
app.use("/create-user-roles", CreateUserRoles);
app.use("/MLAttendance", MLAttendance);
app.use("/l3r2o5v7", BranchMaster);
app.use("/monthly-attendance", TMonthlyAttendance);
app.use("/salary-processing", TSalaryProcessing);
app.use("/monthly-earning-import", TMonthlyEarningImport);
app.use("/monthly-deduction-import", TMonthlyDeductionImport);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
// app.use(`file-upload`, HandleImage)

// Start the server
const port = 5500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
