import React,{useEffect,useState} from 'react'
import {useNavigate} from "react-router-dom"
import devpic from "../images/Dev.jpg";
import aboutpic from "../images/aboutpic.png";

const About = () => {
  const navigate=useNavigate();
  const [userData,setUserData]=useState({});

// Automatically calls itself when page loads for the first time and displays userdata if logged in.
  const callAboutPage = async () => {
    try {
        const res = await fetch('/about', {
            method: "GET",
            headers: {
                Accept: "application/json",     //cookie share
                "Content-Type": "application/json"
            },
            credentials: "include"      //token send
        });

        const data = await res.json();
        setUserData(data)

        if (!res.status === 200) {
            const error = new Error(res.error);
            throw error;
        }

    } catch (err) {
        console.log(err);
        navigate('/login');
    }
}

useEffect(() => {
    callAboutPage();
    // eslint-disable-next-line
}, []);
  

  return (
    <>
      <div className="container emp-profile">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img src={userData.name==='Devashish Pal'?devpic:aboutpic} alt="Dev" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="profile-head">
                <p className="profile-rating mt-3 mb-5">Ranking: <span> 1/10 </span></p>
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-2">
              <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
            </div>
          </div>

          <div className="row">
            {/* left side url  */}
            <div className="col-md-4">
              <div className="profile-work">
                <p style={{fontWeight:'bold'}}>Social</p>
                <a href="https://devashishpal-portfolio.netlify.app/" target="_blank" rel="noreferrer">Portfolio</a> <br />
                <a href="https://github.com/dev15031997" target="_blank" rel="noreferrer">Github</a> <br />
                <a href="https://www.linkedin.com/in/devashish-pal-90b1b3160/" target="_blank" rel="noreferrer">LinkedIn</a> <br />
                <a href="https://www.instagram.com/dev_45/" target="_blank" rel="noreferrer">Instagram</a> <br />
                <a href="https://www.instagram.com/dev_45/" target="_blank" rel="noreferrer">Facebook</a> <br />
                <a href="https://twitter.com/Devashishpal7" target="_blank" rel="noreferrer">Twitter</a> <br />
              </div>
            </div>

            {/* right side data toogle  */}
            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div className="row">
                    <div className="col-md-6">
                      <label>User Id</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData._id}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6 ">
                      <p>{userData.name}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.email}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.phone}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Profession</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.work}</p>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <div className="row">
                    <div className="col-md-6">
                      <label>Experience</label>
                    </div>
                    <div className="col-md-6">
                      <p>Beginner</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Hourly Rate</label>
                    </div>
                    <div className="col-md-6">
                      <p>5$/hr</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Total Projects</label>
                    </div>
                    <div className="col-md-6">
                      <p>30</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>English Fluency</label>
                    </div>
                    <div className="col-md-6">
                      <p>Intermediate</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Availability</label>
                    </div>
                    <div className="col-md-6">
                      <p>6 months</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default About