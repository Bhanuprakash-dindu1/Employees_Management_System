import React, { Component, useEffect } from 'react'
import { useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';



export default function UpdateEmployeeComponent(props)
{
  
    let navigate = useNavigate();
   

    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const {id}= useParams();



  useEffect(()=>
  {
    EmployeeService.getEmployeeById(id).then((res)=>
    {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setEmail(res.data.email);

    }).catch(error=>
        {
            console.log(error);
        })

  },[])

 
  const updateHandler = (e) => {
    e.preventDefault();
    const employee = { firstName, lastName, email };

    console.log("Updating Employee:", employee); // Debugging

    if (id) {
        EmployeeService.updateEmployee(id, employee)
            .then((res) => {
                console.log("Update Successful:", res.data); // Check response
                navigate('/employees');
            })
            .catch((error) => {
                console.error("Error updating employee:", error);
            });
    } else {
        EmployeeService.createEmployee(employee)
            .then((res) => {
                console.log("Employee Created:", res.data);
                window.alert("Employee Created Successfully !")
                navigate('/employees');
            })
            .catch((error) => {
                console.error("Error creating employee:", error);
            });
    }
};

  
  const cancelHandler=(e)=>
  {
    navigate('/employees');
  }
 
  
    return (
      <div className="container d-flex justify-content-center align-items-center ">
          <div className="row w-100">
            <div className="card shaddow-lg p-2 rounded-lg text-white mx-auto" style={{background:"#000",border:"1px solid #444", maxWidth:"500px"}}>
              <h3 className="text-center">Update Employee</h3>
              <div className="card-body">
                <form>
                  <div className="form-group my-2">
                    <label>First Name:</label>
                    <input placeholder="First Name" name="firstName" className="form-control"
                           value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
                  </div>
                  <div className="form-group my-2">
                    <label>Last Name:</label>
                    <input placeholder="Last Name" name="lastName" className="form-control"
                           value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
                  </div>

                  <div className="form-group my-2">
                    <label>Email:</label>
                    <input placeholder="Email" name="email" className="form-control"
                           value={email} onChange={(e)=> setEmail(e.target.value)}/>
                  </div>
                  <button className='btn btn-success' onClick={updateHandler}>save</button>
                  <button className='btn btn-danger' onClick={cancelHandler} style={{marginLeft:"10px"}}>cancel</button>
                </form>
              </div>
            </div>
          </div>  
      </div>

    )
  }
