---
id: cqyxl0e3
title: Company Master
file_version: 1.1.3
app_version: 1.15.3
---

## **CompMaster Component Documentation**

The `CompMaster` component is a React component that provides a user interface for managing company data. It displays a table of company information with various features such as filtering, column visibility control, and actions like viewing, editing, and deleting companies. This component relies on Bootstrap and Iconify libraries for styling and icons.

<br/>


<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/components/company settings/CompMaster.js
```javascript
1      import { Icon } from "@iconify/react";
2      import React, { useState, useEffect, useRef } from "react";
3      import { Button } from "react-bootstrap";
4      import CompanyModal from "./CompanyModal";
5      import VEModal from "./ViewComp";
6      export const compData = [
```

<br/>

*   `@iconify/react`: A library for using icons in React applications.

*   `react`: A JavaScript library for building user interfaces.

*   `useState`, `useEffect`, `useRef`: React hooks for managing state and side effects.

*   `react-bootstrap`: A library providing Bootstrap components for React.

*   `CompanyModal`: A custom modal component for adding and editing company data.

*   `VEModal`: A custom modal component for viewing and editing individual companies.

### **compData**

An array containing sample company data. Each object in the array represents a company with properties like ID, name, short name, sector details, and more.

### **CompMaster Component**

The `CompMaster` component serves as the main interface for managing company data. It features the following functionality:

1.  **State Management**

    *   `filteredData`: Stores filtered company data based on search queries.

    *   `isModalOpen`: Manages the visibility of the `CompanyModal` for adding/editing companies.

    *   `VE`: Manages the visibility of the `VEModal` for viewing/editing companies.

    *   `edit`: Indicates whether the `VEModal` is in edit mode.

    *   `Cid`: Stores the ID of the selected company for the `VEModal`.

    *   `menuOpen`: Manages the visibility of a menu for exporting data.

    *   `columnVisibility`: Tracks the visibility of table columns.

    *   `showDropdown`: Manages the visibility of the column visibility dropdown.

    *   `selectedColumns`: Stores the names of selected columns for display.

2.  **Event Handling Functions**

    *   `handleSearchChange`: Filters data based on search queries.

    *   `toggleColumn`: Toggles the visibility of table columns.

    *   `selectAllColumns`: Selects all columns for display.

    *   `deselectAllColumns`: Deselects all columns for display.

3.  **UseEffect Hooks**

    *   Sets up an event listener to close the menu when clicking outside of it.

4.  **Utility Functions**

    *   `getColumnMaxWidth`: Calculates the maximum width of a table column based on cell content.

    *   `getTextWidth`: Measures the width of a text string using a canvas context.

5.  **Rendering**

    *   Renders a header section with the company settings title, a column visibility dropdown, and an "Add Company" button.

    *   Renders the `CompanyModal` for adding/editing companies.

    *   Renders the company data table with columns, search inputs, and rows for company information.

    *   Handles actions such as viewing, editing, and deleting companies using icons and modals.

### **Additional Notes**

*   The component provides a comprehensive user interface for managing company data, including sorting, searching, filtering, and export options.

*   The modals (`CompanyModal` and `VEModal`) are used for adding/editing and viewing/editing company information, respectively.

*   The interface incorporates icons for actions and styling from Bootstrap for consistent design.

*   This component can be integrated into a larger application for efficient company data management.

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBU3lzdGVjaEhSTSUzQSUzQU11a3RhUGF0aWw=/docs/cqyxl0e3).