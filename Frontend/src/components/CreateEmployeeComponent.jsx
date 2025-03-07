import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

export default function CreateEmployeeComponent() {
  let navigate = useNavigate();

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [alert, setAlert] = useState({ message: "", type: "", visible: false });

  const handleClick = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const saveHandler = (e) => {
    e.preventDefault();

    // Validation: Check if all fields are filled
    if (!employee.firstName || !employee.lastName || !employee.email) {
      setAlert({ message: "All fields are required!", type: "danger", visible: true });
      return;
    }

    console.log("employee => " + JSON.stringify(employee));

    EmployeeService.createEmployee(employee)
      .then((res) => {
        setAlert({ message: "Employee added successfully!", type: "success", visible: true });
        setTimeout(() => navigate("/employees"), 2000); // Redirect after 2 seconds
      })
      .catch((error) => {
        setAlert({ message: "Error adding employee. Please try again.", type: "danger", visible: true });
      });
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    const confirmCancel = window.confirm("Are you sure you want to cancel?");
    if (confirmCancel) {
      setAlert({ message: "Action cancelled!", type: "warning", visible: true });
      setTimeout(() => navigate("/employees"), 2000);
    }
  };

  return (
    <div className="container d-flex jusitfy-content-center align-items-center vh-100">
      <div className="row w-100">
        <div className="card shadow-lg p-4 rounded text-white mx-auto" style={{background:"#000",border:"1px solid #444",maxWidth:"500px"}}>
          <h3 className="text-center text-primary fw-bold">Add Employee</h3>
          <div className="card-body">

            {/* Bootstrap Alert */}
            {alert.visible && (
              <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                {alert.message}
              </div>
            )}

            <form>
              <div className="form-group my-2">
                <label>First Name:</label>
                <input
                  placeholder="First Name"
                  name="firstName"
                  className="form-control"
                  value={employee.firstName}
                  onChange={handleClick}
                  required
                />
              </div>
              <div className="form-group my-2">
                <label>Last Name:</label>
                <input
                  placeholder="Last Name"
                  name="lastName"
                  className="form-control"
                  value={employee.lastName}
                  onChange={handleClick}
                  required
                />
              </div>

              <div className="form-group my-2">
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="form-control"
                  value={employee.email}
                  onChange={handleClick}
                  required
                />
              </div>
              <button className="btn btn-success" onClick={saveHandler}>
                Save
              </button>
              <button className="btn btn-danger" onClick={cancelHandler} style={{ marginLeft: "10px" }}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
