---
id: 0x1c25ky
title: Cost Center Master
file_version: 1.1.3
app_version: 1.15.3
---

## **Cost Center Master Component Documentation**

The `CostCenterMaster` component is a React component that provides a user interface for managing and displaying a list of cost centers. It allows users to search for cost centers by name and status, view details of each cost center, and perform various actions such as adding, editing, and deleting cost center records.

### **Dependencies**

The component relies on the following external dependencies:

*   **React**: The core library for building user interfaces in React applications.

*   **@iconify/react**: A library for easily using icons from different icon packs in React applications.

*   **CostCenterModal**: An external component for displaying a modal to add new cost center records.

*   **VECost**: An external component for viewing and editing cost center details.

### **Data**

The component uses a predefined array `costCenters` to initialize the list of cost centers. Each cost center has the following properties:

*   `costCenterID`: Unique identifier for the cost center.

*   `costCenterName`: Name of the cost center.

*   `Remarks`: Additional remarks (currently unused).

*   `status`: Status of the cost center (`Y` for active, `N` for inactive).

### **State and Functionality**

The `CostCenterMaster` component manages the following state variables:

*   `isModalOpen`: Boolean indicating whether the add record modal is open.

*   `filteredData`: An array of cost centers that match the search criteria.

*   `veCost`: Boolean indicating whether the view/edit modal is open.

*   `edit`: Boolean indicating whether the view/edit modal is in edit mode.

*   `CCid`: Holds the ID of the selected cost center for the view/edit modal.

*   `menuOpen`: Boolean indicating whether the action menu is open.

The component provides the following functionality:

*   Search functionality to filter cost centers by name and status.

*   Handling click events to open the add record modal.

*   Handling click events to open the action menu.

*   Handling click events to open the view/edit modal for cost centers.

*   Dynamic calculation of column widths based on cell content.

### **Rendering**

The component renders the following elements:

*   A header section with the title "Company Settings / Cost Center Master" and a button to add a new record.

*   The add record modal component (`CostCenterModal`) when `isModalOpen` is `true`.

*   A table that displays the list of cost centers with columns for actions, ID, cost center name, and status.

*   Search inputs for filtering cost centers by name and status.

*   An action menu with options to copy, export to CSV, Excel, PDF, and print.

*   The view/edit modal component (`VECost`) when `veCost` is `true`.

### **Event Handling**

The component handles the following events:

*   Click events for icons to open the view/edit modal and perform actions.

*   Click events to open and close the action menu.

*   Search input changes to dynamically filter cost center data.

*   Click events outside the action menu to close it.

### **Performance Considerations**

The component calculates the maximum width of columns dynamically based on cell content to ensure proper column sizing. This could lead to potential performance concerns if there are a large number of rows or if the content in cells is excessively long. However, the performance impact is likely to be minimal for most use cases.

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBU3lzdGVjaEhSTSUzQSUzQU11a3RhUGF0aWw=/docs/0x1c25ky).