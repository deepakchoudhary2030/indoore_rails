import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Popup from './Popup/Popup';
function Header() {
  const history = useHistory();
  function logout() {
    localStorage.clear();
    history.push('/')
  }

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{ height: '5em' }} >
        <div className="container-fluid bg-dark">
          <a className="navbar-brand" href="/">INDOOR</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {localStorage.getItem('user-info') ?
                <div className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      My Profile
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><Link className="dropdown-item" to="/userprofile">Profile</Link></li>
                      <li><Link className="dropdown-item" to="/userbookings">My Bookings</Link></li>
                    </ul>
                  </li>
                  <li className="nav-item">
                <Link className="nav-link" to="/category">Category</Link>
              </li>
                </div>
                :
                localStorage.getItem('worker-info') ?
                  <div>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        My Profile
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><Link className="dropdown-item" to="/workerprofile">Profile</Link></li>
                        <li><Link className="dropdown-item" to="/booking">Customer Request</Link></li>
                      </ul>
                    </li>
                  </div>
                  :
                  <div>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Register
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><Link className="dropdown-item" to="/userregister">User</Link></li>
                        <li><a className="dropdown-item" href="/workerregister">Worker</a></li>
                      </ul>
                    </li>
                  </div>
              }
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
            </ul>
            <form className="d-flex mb-2">
              {localStorage.getItem('token')!= undefined && localStorage.getItem('token') ? <Link style={{ textDecoration: 'none' }}><button className="btn btn-outline-light my-3" type="submit" onClick={logout}>LogOut</button></Link> : <div><p className="btn btn-outline-light" onClick={togglePopup}>LogIn</p></div>
              }
              {isOpen && <Popup
                content={<div>
                  <b>Choose Your Login </b><br />
                  <Link to="/userlogin" style={{ textDecoration: 'none' }}><button className="btn btn-success" type="submit" >User Login</button></Link>
                  <Link to="/workerlogin" style={{ textDecoration: 'none' }}><button className="btn btn-primary my-3 mx-3" type="submit" >Worker Login</button></Link>
                </div>}
                handleClose={togglePopup}
              />}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Header;