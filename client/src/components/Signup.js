import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import signpic from "../images/signup.svg";
import { Person as PersonIcon } from '@material-ui/icons'
import { Mail as MailIcon } from '@material-ui/icons'
import { LocalPhone as LocalPhoneIcon } from '@material-ui/icons'
import { Work as WorkIcon } from '@material-ui/icons'
import { Lock as LockIcon } from '@material-ui/icons'


const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: ""
  });

  const handleInputs = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value });
  }

  // Send data to server
  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user

    const res = await fetch("/register", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          name, email, phone, work, password, cpassword
      })
  });

    const data = await res.json()

    if (data.status === 422 || !data) {
      window.alert('Registration Failed')
    }
    else {
      window.alert('Registration Successful')
      navigate('/')
    }
  }

  return (
    <>
      <section className="signup">
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign Up</h2>
              <form method="POST" className="register-form" id="register-form">

                <div className="form-group">
                  <label htmlFor="name">
                    <PersonIcon />
                  </label>
                  <input type="text" name="name" id="name" autoComplete="off"
                    value={user.name}
                    onChange={handleInputs}
                    placeholder="Your Name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <MailIcon />
                  </label>
                  <input type="email" name="email" id="email" autoComplete="off"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Your Email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <LocalPhoneIcon />
                  </label>
                  <input type="number" name="phone" id="phone" autoComplete="off"
                    value={user.phone}
                    onChange={handleInputs}
                    placeholder="Your Phone"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="work">
                    <WorkIcon />
                  </label>
                  <input type="text" name="work" id="work" autoComplete="off"
                    value={user.work}
                    onChange={handleInputs}
                    placeholder="Your Profession"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <LockIcon />
                  </label>
                  <input type="password" name="password" id="password" autoComplete="off"
                    value={user.password}
                    onChange={handleInputs}
                    placeholder="Your Password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cpassword">
                    <LockIcon />
                  </label>
                  <input type="password" name="cpassword" id="cpassword" autoComplete="off"
                    value={user.cpassword}
                    onChange={handleInputs}
                    placeholder="Confirm Your Password"
                  />
                </div>

                <div className="form-group form-button">
                  <input type="submit" name="signup" id="signup" className="form-submit"
                    value="register" onClick={PostData} />
                </div>
              </form>
            </div>

            <div className="signup-image">
              <figure>
                <img src={signpic} alt="registration pic" />
              </figure>
              <Link to="/login" className="signup-image-link">Already Registered?</Link>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default Signup