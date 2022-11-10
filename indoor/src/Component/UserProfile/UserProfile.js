import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Header from '../Header';
import logo from '../Images/in.png';
import profile from '../Images/user.png';
import './UserProfile.css';
function UserProfile() {
  let token = localStorage.getItem('token')
  const [user, setUsers] = useState("");
  const getUsers = async () => {
    await fetch('http://localhost:3001/api/v1/user/users/0/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    }).then((response) => { return response.json() })
      .then((response) => {
        setUsers(response)
      }).catch((error) => { alert(error + 'please try again!!!!!') })
  }
  useEffect(() => {
    getUsers();
  }, [])
  return (
    <div>
      <Header />
      <div className="container UserProfile ">
        <section className="form  d-flex justify-content-center" >
          <div className="row d-flex">
            <div className=" col-md-5">
              <div className="card car">
                <div className="img1"><img src={logo} className="img-fluid" alt="" /></div>
                <div className="img2"><img src={profile} className="img-fluid bg-dark" alt="" /></div>
                <div>
                  <div className="main-text">
                    <h2>{user.email}</h2>
                  </div>
                  <div className="container-fluid">
                    <div className="fcontainer">
                      <div className="row mx-3">
                        <div className="col-md-4 col-lg-7">
                          <h6>Name - {user.fname} {user.lname}</h6>
                          <h6>Phone - {user.email}</h6>
                          <h6>Address -{user.address} </h6>
                        </div>
                        <div className="col-md-4 col-lg-5">
                          <h6>Pincode - {user.pincode}</h6>
                          <h6>City - {user.city }</h6>
                          <h6>State - { user.state}</h6>
                        </div>
                        <div className="edit-work-button">
                          <Link  title="Edit Profile" to={{
                            pathname: '/editProfile',
                            state: { user: user }
                          }}>✏️</Link>
                        </div>  
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default UserProfile;







