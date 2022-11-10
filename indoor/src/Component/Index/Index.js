import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../Header';
import paint from '../Images/paint.png';
import hacksaw from '../Images/hacksaw.png';
import plug from '../Images/plug.png';
import plumber from '../Images/plumber.png';
import air from '../Images/air.png';
import more from '../Images/more.png';
import logo1 from '../Images/Indoor.png';
import './Index.css';
import Popup from '../Popup/Popup';


function Home() {
  
  const history = useHistory();
  const [pincode, setPincode] = useState(localStorage.getItem('pincode'));
  const [isOpen, setIsOpen] = useState(false);
  
  localStorage.setItem('pincode', pincode);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  function logout() {
    localStorage.clear();
    history.push('/')
  }
  return (
    <div >
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent fixed-top" style={{ height: '5em' }} >
        <div className="container-fluid">
          <a className="navbar-brand" >INDOOR</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {localStorage.getItem('user-info') ? <div></div> :
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                    Register
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/userregister">User</Link></li>
                    <li><Link className="dropdown-item" to="/workerregister" >Worker</Link></li>
                  </ul>
                </li>
              }
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/about">About</Link>
              </li>
            </ul>
            <form className="d-flex">
              {localStorage.getItem('worker-info') ? <Link style={{ textDecoration: 'none' }}><button className="btn btn-outline-light my-3" type="submit" onClick={logout}>LogOut</button></Link>
                :
                localStorage.getItem('user-info') ? <Link style={{ textDecoration: 'none' }}><button className="btn btn-outline-light my-3" type="submit" onClick={logout}>LogOut</button></Link>
                  : <p className="btn btn-outline-light" onClick={togglePopup}>LogIn</p>
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
      {localStorage.getItem('user-info') ? <section id="hero" className="d-flex align-items-center justify-content-center" >
        <div className="container" data-aos="fade-up" key="id">
          <div className="flex-item2" data-aos="fade-up" data-aos-delay="150">
            <h1><span><img src={logo1} className="bd-placeholder-img  m-3 " alt="" width="50em" height="50em" /></span>INDOOR</h1>
          </div>
          <div className="form-box flex-item2 mt-4">
            <input type="text" className="search-field location" placeholder="Pincode" value={pincode} onChange={((e) => { setPincode(e.target.value) })} />
            <input type="text" className="search-field search" placeholder="Search" />
          </div>

          <div className="gy-4 mt-4 flex-item1 " data-aos="zoom-in" data-aos-delay="250">
            <div className="icon-box">
              <Link className="link" to={{
                pathname: '/workers',
                state: { category: 'Carpenter' }
              }}><img src={hacksaw} value="hacksaw"
                className="bd-placeholder-img  m-2 " alt="" width="50em" height="50em" /><br />
                <p>Carpenter</p></Link>
            </div>

            <div className="icon-box">
              <Link className="link" to={{
                pathname: '/workers',
                state: { category: 'Electrition' }
              }}><img src={plug}
                className="bd-placeholder-img  m-2 " alt="" width="50em" height="50em" /><br />
                <p>Electricition</p></Link>
            </div>

            <div className="icon-box">
              <Link className="link" to={{
                pathname: '/workers',
                state: { category: 'Plumber' }
              }}><img src={plumber}
                className="bd-placeholder-img  m-2 " alt="" width="50em" height="50em" /><br />
                <p>Plumber</p></Link>
            </div>

            <div className="icon-box">
              <Link className="link" to={{
                pathname: '/workers',
                state: { category: 'Painter' }
              }}><img src={paint} className=" bd-placeholder-img  m-2 " alt="" width="50em" height="50em" /><br />
                <p>Painter</p></Link>
            </div>

            <div className="icon-box">
              <Link className="link" to={{
                pathname: '/workers',
                state: { category: 'Air-Conditioner' }
              }}><img src={air}
                className="bd-placeholder-img  m-2 " alt="" width="50em" height="50em" /><br />
                <p>Air Conditioner</p></Link>
            </div>

            <div className="icon-box">
              <Link className="link" to="/category"><img src={more}
                className="bd-placeholder-img  m-2 " alt="" width="50em" height="50em" /><br />
                <p>More</p></Link>
            </div>
          </div>
        </div>
      </section> : localStorage.getItem('worker-info') ? <div><Header />
        <section className="welcome d-flex align-items-center justify-content-center" >
          <div className="container" data-aos="fade-up" key="id">
            <div className="welcome-flex-item">
              <h1><span role="img" aria-label="open">&#x1F44B;</span>Welcome!</h1><br />
              <h5>Thank You For Choosing Indoor</h5><br />
            </div>
          </div>
        </section></div> : <section id="hero" className="d-flex align-items-center justify-content-center" >
        <div className="container" data-aos="fade-up" key="id">
          <div className="flex-item2" data-aos="fade-up" data-aos-delay="150">
            <h1><span><img src={logo1} className="bd-placeholder-img  m-3 " alt="" width="50em" height="50em" /></span>INDOOR</h1>
          </div>
          <div className="form-box flex-item2 mt-4">
            <input type="text" className="search-field location" placeholder="Pincode" value={pincode} onChange={((e) => { setPincode(e.target.value) })} />
            <input type="text" className="search-field search" placeholder="Search" />
          </div>

          <div className="gy-4 mt-4 flex-item1 " data-aos="zoom-in" data-aos-delay="250">
            <div className="icon-box">
              <Link className="link" to={{
                pathname: '/workers',
                state: { category: 'Carpenter' }
              }}><img src={hacksaw} value="hacksaw"
                className="bd-placeholder-img  m-2 " alt="" width="50em" height="50em" /><br />
                <p>Carpenter</p></Link>
            </div>

            <div className="icon-box">
              <Link className="link" to={{
                pathname: '/workers',
                state: { category: 'Electrition' }
              }}><img src={plug}
                className="bd-placeholder-img  m-2 " alt="" width="50em" height="50em" /><br />
                <p>Electricition</p></Link>
            </div>

            <div className="icon-box">
              <Link className="link" to={{
                pathname: '/workers',
                state: { category: 'Plumber' }
              }}><img src={plumber}
                className="bd-placeholder-img  m-2 " alt="" width="50em" height="50em" /><br />
                <p>Plumber</p></Link>
            </div>

            <div className="icon-box">
              <Link className="link" to={{
                pathname: '/workers',
                state: { category: 'Painter' }
              }}><img src={paint} className=" bd-placeholder-img  m-2 " alt="" width="50em" height="50em" /><br />
                <p>Painter</p></Link>
            </div>

            <div className="icon-box">
              <Link className="link" to={{
                pathname: '/workers',
                state: { category: 'Air-Conditioner' }
              }}><img src={air}
                className="bd-placeholder-img  m-2 " alt="" width="50em" height="50em" /><br />
                <p>Air Conditioner</p></Link>
            </div>

            <div className="icon-box">
              <Link className="link" to="/category"><img src={more}
                className="bd-placeholder-img  m-2 " alt="" width="50em" height="50em" /><br />
                <p>More</p></Link>
            </div>
          </div>
        </div>
      </section>

      }
    </div>
  );
}
export default Home;

