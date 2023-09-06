import React, { useEffect, useState } from 'react'

const Contact = () => {
  const [userData, setUserData] = useState({ name: '', email: '', phone: '', message: '' });

  // Show Data
  const contactPage = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone })

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    contactPage();
    // eslint-disable-next-line
  }, []);


  const handleInput = async (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value })
  }

  // Send Message 
  const contactForm = async (e) => {
    e.preventDefault();
    try {
      const { message } = userData;

      const res = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message
        })
      });

      const data = await res.json()

      if (!data) {
        window.alert('Message Send Failure')
      }
      else {
        window.alert('Message Sent')
        setUserData({...userData,message:""})
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="contact_info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_info_container d-flex flex-lg-row flex-column justify-content-between align-items-between">
                <div className="contact_info_item d-flex flex-row align-items-center justify-content-start">
                  <div className="contact_info_image">
                    <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="" /></div>
                  <div className="contact_info_content">
                    <div className="contact_info_title">Phone</div>
                    <div className="contact_info_text">+91 8805 714 266</div>
                  </div>
                </div>
                <div className="contact_info_item d-flex flex-row align-items-center justify-content-start">
                  <div className="contact_info_image"><img src="https://img.icons8.com/ultraviolet/24/000000/filled-message.png" alt="" /></div>
                  <div className="contact_info_content">
                    <div className="contact_info_title">Email</div>
                    <div className="contact_info_text">devashishpal15@gmail.com</div>
                  </div>
                </div>
                <div className="contact_info_item d-flex flex-row align-items-center justify-content-start">
                  <div className="contact_info_image"><img src="https://img.icons8.com/ultraviolet/24/000000/map-marker.png" alt="" /></div>
                  <div className="contact_info_content">
                    <div className="contact_info_title">Address</div>
                    <div className="contact_info_text">Pune, Maharashtra India</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Contact Us Form  */}
      <div className="contact_form">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-5">
                <div className="contact_form_title">
                  Get in Touch </div>
                <form method="POST" id="contact_form">
                  <div className="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between">
                    <input type="text" id="contact_form_name"
                      className="contact_form_name input_field"
                      name="name"
                      value={userData.name}
                      onChange={handleInput}
                      placeholder="Your name" required />

                    <input type="email" id="contact_form_email"
                      className="contact_form_email input_field"
                      name="email"
                      value={userData.email}
                      onChange={handleInput}
                      placeholder="Your Email" required />

                    <input type="number" id="contact_form_phone"
                      className="contact_form_phone input_field"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInput}
                      placeholder="Your Phone Number" required />
                  </div>

                  <div className="contact_form_text mt-5">
                    <textarea className="text_field contact_form_message"
                      name="message"
                      value={userData.message}
                      onChange={handleInput}
                      placeholder="Message" cols="30" rows="10"></textarea>
                  </div>

                  <div className="contact_form_button">
                    <button type="submit" className="button contact_submit_button" onClick={contactForm}>Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact