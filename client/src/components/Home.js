import React,{useState,useEffect} from 'react'

const Home = () => {
  const [userName,setUserName]=useState('')
  const [show,setShow]=useState(false)

   // Show Data
   const homePage = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      setUserName(data.name)
      setShow(true)
    }
     catch (err) {
      console.log(err);
      setShow(false)
    }
  }

  useEffect(() => {
    homePage();
    // eslint-disable-next-line
  }, []);
  
  return (
    <>
      <div className="home-page">
        <div className="home-div">
          <p className="pt-5">WELCOME</p>
          <h1>{userName}</h1>
          <h2>{show ? "Good to see you Back!" :"To Paradise"}</h2>
        </div>
      </div>
    </>
  )
}

export default Home


