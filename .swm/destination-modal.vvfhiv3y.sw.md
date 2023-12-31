---
id: vvfhiv3y
title: Destination Modal
file_version: 1.1.3
app_version: 1.15.3
---

## **DestinationModal Component Documentation**

The `DestinationModal` component is a React component designed to provide a user interface for adding new destinations or editing existing destination details. It serves as a modal window that displays a form for entering destination information. This component can be utilized within an application's user interface to manage destination-related settings.

### **Dependencies**

The component relies on the following external dependencies:

*   **formik**: A library for managing form state in React applications.

*   **@iconify/react**: A library for using customizable icons in React applications.

### **Component Props**

*   **visible** (boolean): Controls the visibility of the modal.

*   **onClick** (function): A function to handle the "Close" button click event.

### **Formik Integration**

The component uses Formik to manage form state and validation. It utilizes the `useFormik` hook to create a form with initial values and submission behavior. The form captures the following destination details:

*   **ID**: Destination ID (number)

*   **Name**: Destination name (text)

*   **ContractorName**: Contractor name (select)

*   **Distance**: Distance to the destination in kilometers (number)

*   **EmployeeFare**: Fare for employees traveling to the destination (number)

*   **remark**: Remarks or additional information about the destination (text)

*   **status**: Active status of the destination (checkbox)

### **State Management**

*   **status** (boolean): Manages the active status of the destination.

*   **setStatus** (function): Toggles the active status of the destination.

### **User Interface Elements**

*   **Modal Background Overlay**: Covers the entire screen with a semi-transparent overlay.

*   **Modal Content Container**: Displays the form for entering destination details.

*   **Close Button**: Displays an "X" icon to close the modal when clicked.

*   **Form Fields**: Input fields and select elements for entering destination details.

*   **Status Checkbox**: Allows users to toggle the active status of the destination.

*   **Save Button**: Submits the form to save destination details.

*   **Close Button**: Closes the modal without saving changes.

### **Status Checkbox**

The status checkbox allows users to toggle the active status of the destination. When checked, the destination is marked as active; when unchecked, it is marked as inactive.

### **Responsive Styling**

The modal and its components have responsive styling that adapts to different screen sizes while maintaining alignment and spacing of UI elements.

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBU3lzdGVjaEhSTSUzQSUzQU11a3RhUGF0aWw=/docs/vvfhiv3y).
