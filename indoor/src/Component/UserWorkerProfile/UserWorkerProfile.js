import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Header';
import user from '../Images/user.png';
import Worker from '../Images/worker.png';
import './UserWorkerProfile.css';
import Popup from '../Popup/Popup';
function UserWorkerProfile(props) {
  let history = useHistory();
  let token = localStorage.getItem('token')
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  let id = props.location.state.id
  let booking_id = props.location.state.booking_id
  let stats_approved = props.location.state.status
  const [worker, setWorker] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState();
  const [ratting, setE] = useState(1);

  const getUsers = async () => {
    await fetch(`http://localhost:3001/api/v1/user/users/${id}/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    }).then((response)=>{
      return response.json()
    }).then((response)=>{
      setWorker(response)
    }).catch((error)=>{
      alert(error)
      history.push('/')
    })
   
  }

  const Appoint = async()=> {
    let data = { "worker_id": id }
    await fetch('http://localhost:3001/api/v1/user/worker/requests', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }).then(async (response) => {
      if (response.ok) {
        setStatus(response.status)
        alert("Appoint Sucessfully if you want to cancel just click on cancel request Thank You !!!")
        //  const text = await response.text()
        //  const myArr = JSON.parse(text);
        //  console.log(myArr)  
      }else {      
         alert("Something went Wrong!!!!")  
      }
    }).catch((error) => console.log(error))
    
  }

  const  RemoveAppoint = async()=> {
    await fetch(`http://localhost:3001/api/v1/user/worker/requests/${booking_id}/`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(async (response) => {
      if (response.ok) {
        setStatus(response.status)
        history.push('/userbookings')
      }else {      
         alert("Something went Wrong!!!!")  
      }
    }).catch((error) => console.log(error))
    
  }
 

  const getFeedback = async () => {
    await fetch(`http://localhost:3001/api/v1/user/rattings/${id}/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    }).then((result) => {
      result.json().then((response) => {
        console.log('response: ', response);
        setFeedback(response)
      })
    })
  }
  console.log("feedback", feedback)

  useEffect(() => {
    getFeedback();
    getUsers();
  }, [])


  const Feedback = async()=> {
    let data = 
    {
      "ratting":ratting,
      "comment": comment,
      "worker_id": id
  }
    await fetch(`http://localhost:3001/api/v1/user/rattings`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }).then((response) => {
      response.json();
      history.push('/userbookings')
    }).catch((error) => {
      alert(error)
    })
  }
  return (
    <div>
      <Header />
      <div className="container WorkProfile ">
        <div className="comment3">
          <section className="form mb-3 d-flex justify-content-center" >
            <div className="row d-flex">
              <div className="card work" key={worker.id}>
                <div className="work-img2"><img src={Worker} className="img-fluid bg-dark" alt="" /></div>
                <div className="main-text">
                  <h2>{worker.fname} {worker.lname}</h2>
                  <h6 className="text-muted my-2">{ }</h6>
                  <h6 className="text-muted">{}</h6>
                </div>
                <div className="container">
                  <div className="flu1">
                    <div className="flu">
                      <h6>City</h6>
                      <h6>{worker.city }</h6>
                    </div>
                    <div className="flu">
                      <h6>State</h6>
                      <h6>{worker.state }</h6>
                    </div>
                    <div className="flu">
                      <h6>Pincode</h6>
                      <h6>{worker.pincode}</h6>
                    </div>
                  </div>
                </div>
                <div className="main-text">
                  {stats_approved === false && booking_id ?  <button className="work-cance-button" onClick={RemoveAppoint}>Cancel Request</button> : <button className="work-button" onClick={Appoint}>Appoint</button>}     
                  <button className="work-button mx-2 my-1" onClick={togglePopup}>Ratting</button>
                </div>
                <div className="container-fluid fcontainer1">
                  <div className="row mx-3 ">
                    <div className="col-md-5">
                      <h5>Email</h5>
                      <h6 className="text-muted">{worker.email}</h6>
                    </div>
                    <div className="col-md-5">
                      <h5>Address</h5>
                      <h6 className="text-muted">{worker.address}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="chatbox">
            <section className="chat-window">
              {feedback.map((elem, i) => {
                let Date = elem.created_at.substr(0,10);
                return (
                  <div key={i}>
                    <article className="msg-container msg-remote" id="msg-0">
                      <div className="msg-box">
                        <img className="user-img" id="user-0" src={user} alt="" />
                        <div className="flr">
                          <div className="messages">
                            <div className="msg" id="msg-0">
                              {elem.comment}<br/>                          
                              {
                                Array.apply(0, Array(elem.ratting)).map(function (x, i) {
                                  return (
                                     <span className="fa fa-star checked "></span>
                                  );
                                })
                              }
                            </div>
                          </div>
                          <span className="timestamp"><span className="username">{elem.fname} {elem.lname}</span>•<span className="posttime">{Date}</span></span>
                        </div>
                      </div>
                    </article>
                  </div>)
              })
            }

            </section>
          </section>
          {isOpen && <Popup
            content={<div>
              <b>Give Your Ratting </b><br />
              <form>
                <span className="rating-star">
                  <input type="radio" name="rating" defaultValue={5} onChange={(e) => { setE(e.target.value) }} /><span className="star" />
                  <input type="radio" name="rating" defaultValue={4} onChange={(e) => { setE(e.target.value) }} /><span className="star" />
                  <input type="radio" name="rating" defaultValue={3} onChange={(e) => { setE(e.target.value) }} /><span className="star" />
                  <input type="radio" name="rating" defaultValue={2} onChange={(e) => { setE(e.target.value) }} /><span className="star" />
                  <input type="radio" name="rating" defaultValue={1} onChange={(e) => { setE(e.target.value) }} /><span className="star" />
                </span><br />
                <input type="text" autoComplete="on" placeholder="Type a message" value={comment} onChange={(e) => { setComment(e.target.value) }} />
              </form>
              <button className="btn btn-primary mt-2" type="button" onClick={Feedback} >Submit</button>
            </div>}
            handleClose={togglePopup}
          />}
        </div>
      </div>

    </div>
  );
}
export default UserWorkerProfile;







