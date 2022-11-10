import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Header from '../Header';
import Worker from '../Images/worker.png';
import './WorkerProfile.css';
import Popup from '../Popup/Popup';
import Popup1 from '../Popup/Popup1';
function WorkerProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const [isOpen1, setIsOpen1] = useState(false);
  const togglePopup2 = () => {
    setIsOpen1(!isOpen1);
  }
  const [user, setUser] = useState([]);
  const [profession, setProffesion] = useState([]);
  let token = localStorage.getItem('token')

  ////////////////////////////////FOR GET USER PROFILE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
 
  const getUsers = async () => {
    await fetch('http://localhost:3001/api/v1/user/users/0/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    }).then((response) => { return response.json() })
      .then((response) => {
        setUser(response)
      }).catch((error) => { alert(error + 'please try again!!!!!') })
  }
  useEffect(() => {
    getUsers();
    AddProfession();
  }, [])

  ////////////////////////////////FOR ADD USER PROFESSION \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  const AddProfession = async () => {
    await fetch(`http://localhost:3001/api/v1/categories/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    }).then((response) => {
      return response.json()
    }).then((response) => {
      setProffesion(response)
    }).catch((error) => { console.warn(error) })
  }
  

  ////////////////////////////////FOR GET PROFESSION name \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  function myFunction(name) {
    Create(name)
    document.getElementById(name).style.background = "red"
  }
  let arr = [];
  function Create(name) {
    arr.push(name);
  }
  ////////////////////////////////FOR CREATE USER PROFESSION \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  const CreateProfession = async () => {
    let data = {
      "professions": arr
    }
    console.log(JSON.stringify(data))
    await fetch(`http://localhost:3001/api/v1/user/users/0/`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      
      body: JSON.stringify(data)
    }).catch((err)=>{console.log(err)})
    window.location.reload();
  }
  
  function myFunction2(name) {
    Create2(name)
    document.getElementById(name).style.background = "red"
}
  let a = user.professions
  let arr2 = [].concat(a);
  function Create2(name) {
    if (!arr2.includes(name)) {
      arr2.push(name);
    }
  }
  /////////////////////////////// FOR UPDATE USER PROFESSION \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  const UpdateProfession = async () => {
    let data = {
      "professions": arr2
    }
    console.log(JSON.stringify(data))
    await fetch(`http://localhost:3001/api/v1/user/users/0/`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    window.location.reload();

  }
 

  return (
    <div>
      <Header />
      <div className="container WorkProfile ">
        <section className="form mb-3 d-flex justify-content-center" >
          <div className="row d-flex">
            <div className="card work" key={user.id}>
            <div className="edit-work-button"><Link  title="Edit Profile" to={{
                      pathname: '/editProfile',
                      state: { user: user }
                    }}>✏️</Link></div>
              <div className="work-img2">
                <img src={Worker} className="img-fluid bg-dark" alt="" />
              </div>
              <div className="main-text">
                <h2>{user.email}</h2>
                <h6 className="text-muted my-2">{user.fname} {user.lname}</h6>
                <div style={{ display: "flex",justifyContent: "space-around"}}>
                { user.length !== 0 &&
                user.professions.map((elem) => <h6 className="text-muted">{elem}</h6>)}
              </div>
              </div>
              <div className="container">
                <div className="flu1">
                  <div className="flu">
                    <h6>City</h6>
                    <h6>{user.city}</h6>
                  </div>
                  <div className="flu">
                    <h6>State</h6>
                    <h6>{user.state }</h6>
                  </div>
                  <div className="flu">
                    <h6>Pincode</h6>
                    <h6>{user.pincode}</h6>
                  </div>
                </div>
              </div>
              <div className="container-fluid fcontainer1">
                <div className="row mx-3 ">
                  <div className="col-md-5">
                    <h5>Phone</h5>
                    <h6 className="text-muted">{}</h6>
                  </div>
                  <div className="col-md-5">
                    <h5>Address</h5>
                    <h6 className="text-muted">{user.address}</h6>
                  </div>
                </div>
                <div className="main-text">
                  <button className="work-button" type="button" onClick={togglePopup}>Create Profession</button>
                  <button className="work-button mx-1" type="button" onClick={togglePopup2}>Add Profession</button>
                </div>
              </div>
            </div>
          </div>
          {isOpen && <Popup
            content={<div>
              <b>Select your Profession </b><br />
              <form className="done">
                {
                  profession.map((elem) => {
                    const { name, id } = elem
                    return (
                      <div key={id}>
                        <button className="profession mx-1" id={name} value={name} type="button" onClick={() =>myFunction(name)}>{name}</button>
                      </div>)
                  }) 
                }
              </form>
              <button className="btn btn-primary mt-3 mb-1" onClick={CreateProfession} >Done</button>
            </div>}
            handleClose={togglePopup}
          />}
          {isOpen1 && <Popup1
            content={<div>
              <b>Update your Profession </b><br />
              <form className="done">
                {
                  profession.map((elem) => {
                    const { name, id } = elem
                    return (
                      <div key={id}>
                        <button className="profession mx-1" id={name} value={name} type="button" onClick={() =>myFunction2(name)}>{name}</button>
                      </div>)
                  })
                }

              </form>
              <button className="btn btn-primary mt-3 mb-1" onClick={UpdateProfession} >Done</button>
            </div>}
            handleClose1={togglePopup2}
          />}
        </section>
      </div>
    </div>
  );
}
export default WorkerProfile;