import React, { useState, useEffect } from 'react';
import Header from '../Header';
import {Link, useHistory } from 'react-router-dom';
import plumber from '../Images/plumber.png';

import './WorkerRegister.css';
function Register() {

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  // const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('worker-info')) {
      alert("You Need to LogOut");
      history.push("/")
    }

  }, [])

  async function saveData() {
    let data = {
      "fname": fname,
      "lname": lname,
      "email": email,
      "pincode": pincode,
      "role": "worker",
      "professions": [],
      "address": address,
      "password": password
    }
    await fetch('http://localhost:3001/api/v1/user/users/', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(async (response) => {
      if (!response.ok) {
         const text = await response.text()
         const myArr = JSON.parse(text);
         setStatus(myArr)
      }else {      
         setStatus(response.status)  
      }
    }).catch((error) => console.log(error))
   }
  return (
    <div>
      <Header />
      <div className="container sec">
      {
          status.error && 
          <div className="alert alert-danger" role="alert">
            {status.error}
          </div>
        }
        {
          (status === 201 || status === 200) && 
          <div className="alert alert-success" role="alert">
            User Registred Sucessfully <Link to="/userlogin">Login</Link>
          </div>
        }
        <div className="sec1">
          <img src={plumber} className="bd-placeholder-img rounded-circle m-2 bg-dark " width="100em" height="100em" alt="" />
          <h4>Worker</h4>
        </div>

        <section className="form">
          <div className="row d-flex justify-content-center">

            <div className="col-md-9 col-lg-8">
              <input className="form-control my-2 p-2" type="text" placeholder="First Name" required="required" value={fname} onChange={(e) => { setFname(e.target.value) }} />
            </div>

            <div className="col-md-9 col-lg-8">
              <input className="form-control my-2 p-2" type="text" placeholder="Last Name" required="required" value={lname} onChange={(e) => { setLname(e.target.value) }} />
            </div>

            <div className="col-md-9 col-lg-8">
              <input className="form-control my-2 p-2" type="email" placeholder="Email" required="required" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div>

            {/* <div className="col-md-9 col-lg-8">
              <input className="form-control my-2 p-2" type="Email" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div> */}

            <div className="col-md-9 col-lg-8">
              <input className="form-control my-2 p-2" type="number" placeholder="Pincode" required="required" value={pincode} onChange={(e) => { setPincode(e.target.value) }} />
            </div>

            <div className="col-md-9 col-lg-8">
              <textarea className="form-control my-2 p-2" type="text" placeholder="Enter your Address" rows="3" required="required" value={address} onChange={(e) => { setAddress(e.target.value) }} />
            </div>

            <div className="col-md-9 col-lg-8">
              <input className="form-control my-2 p-2" type="password" placeholder="Password" required="required" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </div>

            <div className="sec1">
              <button className="btn1 my-3 mb-5 p-2" type="button" onClick={saveData} >Register</button>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}
export default Register;







