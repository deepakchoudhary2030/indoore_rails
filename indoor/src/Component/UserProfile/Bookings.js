import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Worker from '../Images/worker.png';
import { Link } from 'react-router-dom';
import './Bookings.css';

function Bookings() {
    let token = localStorage.getItem('token')
    const [items, setItems] = useState([]);
    const getUsers = async () => {
        await fetch(`http://localhost:3001/api/v1/user/worker/requests/0/`, {
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            setItems(response)
        })
    }
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            <Header />
            <div className="jumbotron-fluid jumb ">
                <h1>My Bookings</h1>
                <div className="container ">
                    <div className="row">
                        {items.map((elem) => {
                            let Book = elem.created_at.substr(0, 10);
                            return (
                                <div className="col-md-4 col-lg-4 my-4 text-center"  key={elem.id} >
                                    <div className="H" >
                                        <img src={Worker} className=" bd-placeholder-img rounded-circle mx-auto m-3 mb-1 bg-dark " alt="" width="150em" height="150em" /><br />
                                        <div className="card-body">
                                            <h5 className="small text-uppercase text-muted">{elem.WorkerName} {elem.WorkerLname}</h5>
                                            <h5 className="small text-uppercase text-muted">Booking Date: {Book}</h5>
                                            {/* ///////////////////////////////// Approved Or Not\\\\\\\\\\\\\\\\\\\\\\\\ */}
                                            <div>
                                                {elem.status === true ? <h5 className="small text-uppercase text-muted">Acceptance Date: {elem.updated_at.substr(0, 10)} </h5>: <div></div>}
                                                <Link to={{
                                                    pathname: '/userworkerprofile',
                                                    state: { id: elem.worker_id,
                                                             booking_id: elem.id,
                                                             status:elem.status }
                                                }}>
                                                <button className="button2">Profile</button>
                                                </Link>
                                                { elem.status === true ? <button className="Approved">Approved</button> : <button className="pending">Pending</button> }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )})}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Bookings;

