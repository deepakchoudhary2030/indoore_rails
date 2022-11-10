import React, { useState, useEffect } from 'react';
import Header from '../Header';
import {Link, useHistory } from 'react-router-dom';
import plumber from '../Images/plumber.png';

// import './WorkerRegister.css'; 
function editProfile(props) {
  let token = localStorage.getItem('token')
  let user_info = props.location.state.user
  const [fname, setFname] = useState(user_info.fname);
  const [lname, setLname] = useState(user_info.lname);
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState(user_info.email);
  const [city, setCity] = useState(user_info.city);
  const [state, setState] = useState(user_info.state);
  const [pincode, setPincode] = useState(user_info.pincode);
  const [address, setAddress] = useState(user_info.address);
  const history = useHistory();
  async function editData() {
    let data = {
      "fname": fname,
      "lname": lname,
      "email": email,
      "pincode": pincode,
      "address": address,
      "city" : city,
      "state": state
    }
    await fetch('http://localhost:3001/api/v1/user/users/0/', {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }).then(async (response) => {
      if (!response.ok) {
         const text = await response.text()
         const myArr = JSON.parse(text);
         setStatus(myArr)
         history.goBack()
      }else {      
         setStatus(response.status)  
         history.goBack()
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
            Details Updated Sucessfully
          </div>
        }
        <div className="sec1">
          <img src={plumber} className="bd-placeholder-img rounded-circle m-2 bg-dark " width="100em" height="100em" alt="" />
          <h4>Edit Details</h4>
        </div>

        <section className="form">
          <div className="row d-flex justify-content-center">

            <div className="col-md-9 col-lg-8">
              <input className="form-control my-2 p-2" type="text" placeholder="First name" required="required" value={fname} onChange={(e) => { setFname(e.target.value) }} />
            </div>

            <div className="col-md-9 col-lg-8">
              <input className="form-control my-2 p-2" type="text" placeholder="Last Name" required="required" value={lname} onChange={(e) => { setLname(e.target.value) }} />
            </div>

            <div className="col-md-9 col-lg-8">
              <input className="form-control my-2 p-2" type="email" placeholder="Email" required="required" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div>

            <div className="col-md-9 col-lg-8">
              <input className="form-control my-2 p-2" type="number" placeholder="Pincode" required="required" value={pincode} onChange={(e) => { setPincode(e.target.value) }} />
            </div>

            <div className="col-md-9 col-lg-8">
              <input className="form-control my-2 p-2" type="text" placeholder="City" required="required" value={city} onChange={(e) => { setCity(e.target.value) }} />
            </div>

            <div className="col-md-9 col-lg-8">
              <input className="form-control my-2 p-2" type="text" placeholder="State" required="required" value={state} onChange={(e) => { setState(e.target.value) }} />
            </div>

            <div className="col-md-9 col-lg-8">
              <textarea className="form-control my-2 p-2" type="text" placeholder="Enter your Address" rows="3" required="required" value={address} onChange={(e) => { setAddress(e.target.value) }} />
            </div>

            <div className="sec1">
              <button className="btn1 my-3 mb-5 p-2" type="button" onClick={editData} >Save</button>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}
export default editProfile;







