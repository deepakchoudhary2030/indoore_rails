import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import './Bookings.css';
function Table() {
  const [items, setItems] = useState([]);
  let token = localStorage.getItem('token')
  let i = 1;
  /////////////////////// For Get Users \\\\\\\\\\\\\\\\\\\
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

  ///////////////////// For Accept Request \\\\\\\\\\\\\\\\\\\
  const Approved = async (id) => {
    let data = { "status": true }
    await fetch(`http://localhost:3001/api/v1/user/worker/requests/${id}/`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }).then((response) => {
      response.json()
    }).catch((error) => {
      console.warn(error);
    })
  }
  return (
    <div>
      <Header />
      {items.length != 0 ?
      <div className="container booking">
        <table className="table" >
          <thead>
            <tr>
              <th scope="col">S.no</th>
              <th scope="col">Name</th>
              <th scope="col">Booking Date</th>
              <th scope="col">Acceptence Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody >
            { 
              
              items.map((elem) => {
                const { id } = elem;
                let Book = elem.created_at.substr(0, 10);
                return (
                  <tr className="red" key={id}>
                    <th scope="row">{i}</th>
                    <td  data-toggle="tooltip" data-html="true" title={`Name: ${elem.UserName} ${elem.UserLname}`}>{elem.UserName} {elem.UserLname}</td>
                    <td>{Book}</td>
                    {elem.status === true ? (
                    <td>{elem.updated_at.substr(0, 10)}</td>
                  ) : (
                    <td>Not Accepted Yet</td>
                  )}
                  {elem.status === true ? (
                    <td>
                      <button className="btn btn-danger" type="button">
                        &#10004;
                      </button>
                    </td>
                  ) : (
                    <td>
                      <button
                        className="btn btn-success"
                        type="button"
                        onClick={() => Approved(elem.id)}
                      >
                        &#10004;
                      </button>
                    </td>
                  )}
                    <input type="hidden" id={i++}></input>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div> : <div className="container booking"><h3>&#128218; No Record Found</h3></div>}
    
    </div>
  );
}
export default Table;






