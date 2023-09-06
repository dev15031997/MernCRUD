import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import loginpic from "../images/login.svg";
import { Link } from "react-router-dom";
import {Mail as MailIcon} from '@material-ui/icons'
import {Lock as LockIcon} from '@material-ui/icons'
import { userContext } from '../App';

const Login = () => {
  const {state,dispatch} = useContext(userContext)
  const navigate=useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Send login credentials to server
  const loginSub=async (e)=>{
    e.preventDefault();
    
    const res=await fetch('/login',{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email,password })
    })

    const data=await res.json()

    if(data.status===400 || !data)
    {
      window.alert('Invalid Credentials')
    }
    else
    {
      dispatch({type:'USER',payload:true})
      window.alert('Login Successful')
      navigate('/')
    }

  }

  return (
    <>
      <section className="sign-in">
        <div className="container mt-5">
          <div className="signin-content">

            <div className="signin-image">
              <figure>
                <img src={loginpic} alt="Login pic" />
              </figure>
              <Link to="/signup" className="signup-image-link">Create an Account</Link>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Sign In</h2>
              <form method="POST" className="register-form" id="register-form">

                <div className="form-group">
                  <label htmlFor="email">
                    <MailIcon/>
                  </label>
                  <input type="email" name="email" id="email" autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <LockIcon/>
                  </label>
                  <input type="password" name="password" id="password" autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password"
                  />
                </div>

                <div className="form-group form-button">
                  <input type="submit" name="signin" id="signin" className="form-submit"
                    value="Log In" onClick={loginSub}/>
                </div>

              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default Login