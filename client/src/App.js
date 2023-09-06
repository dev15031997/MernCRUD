import React, { createContext,useReducer } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from "./components/Home"
import About from "./components/About"
import Contact from "./components/Contact"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Error from './components/Error'
import Logout from './components/Logout'
import { initialState,reducer } from './reducer/UseReducer';
import "./App.css"

//context
export const userContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <Router>
        <userContext.Provider value={{ state, dispatch }}>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </userContext.Provider>
      </Router>
    </>
  )
}

export default App