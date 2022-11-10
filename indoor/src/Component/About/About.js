import React from 'react';
import Header from '../Header';
import Deepak from '../Images/Deepak.JPG';
import Akhilesh from '../Images/Akhilesh.jpg';
import Rani from '../Images/Rani.jpeg';
import './About.css';

function About() {
  return (
    <div>
      <Header />
      <div className="jumbotron-fluid ">
        <section className="About">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-title">
                  <h2> About Us</h2>
                </div>
              </div>
              <div className="container">
                
                <p className="mt-5 mb-5">Indoor is a digital platform which has Best service Providers . You must be wondering how we differ from other platforms? Indoor was established with a simple idea: all the customers 
                must be satisfied with our services. Here we care your trust.The platform helps customers book reliable & high quality services - beauty treatments, massages, haircuts, home cleaning, handymen, appliance repair, painting, pest control 
                and many more – delivered by trained professionals conveniently at home. Our 
                vision is to empower millions of professionals to deliver services at home.
                It is a non-profitable platform where users can create their profile without 
                paying money they get a platform where  they can take and provide  services.</p>
              </div>
              
              
              <div className="container mt-4" >
                <h4>Team</h4>
                <div className="row">
                  <div className="col-md-3 my-3 text-center">
                    <img src={Deepak} width="100em" height="100em"
                      className="bd-placeholder-img rounded-circle m-2" alt="" /><br />
                    <h5>Deepak Choudhary</h5>
                  </div>

                  <div className="col-md-3 my-3 text-center">
                    <img src={Akhilesh} width="100em" height="100em"
                      className="bd-placeholder-img rounded-circle m-2" alt="" /><br />
                    <h5>Akhilesh Parmar</h5>
                  </div>

                  <div className="col-md-3 my-3 text-center">
                    <img src={Rani} width="100em" height="100em"
                      className="bd-placeholder-img rounded-circle m-2" alt="" /><br />
                    <h5>Rani Bod</h5>
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
export default About;

