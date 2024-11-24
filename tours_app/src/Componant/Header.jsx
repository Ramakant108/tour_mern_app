import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';


const Navbar = ({user,setUser}) => {
 const [input,setInput]=useState("")
 const navigate=useNavigate()
  const onsearch=(e)=>{
    e.preventDefault();
       navigate(`/getuser/${input}`)
       setInput("")
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Left: Logo */}
        <a className="navbar-brand" href="#">
          <img
            src="https://via.placeholder.com/50"
            alt="Logo"
            width="50"
            height="50"
            className="d-inline-block align-text-top"
          />
        </a>

        {/* Center: Search Field */}
        <form className="d-flex mx-auto" style={{ flexGrow: 1, maxWidth: '500px' }}>
          <input
            className="form-control"
            type="search"
            value={input}
            placeholder="Search"
            aria-label="Search"
            onChange={(e)=>setInput(e.target.value)}
          />
          {/* <Link to={`/getuser/${input}`}><button onClick={onsearch} className="btn btn-outline-secondary">
            <FaSearch />
          </button></Link> */}
          <button onClick={onsearch} className="btn btn-outline-secondary">
            <FaSearch/>
          </button>
        </form>

        {/* Right: Buttons */}
        <div>
          <Link to="/create"><button className="btn btn-primary me-2">Create Tours</button></Link>
          <Link><button className="btn btn-danger" onClick={()=>setUser(null)}>Logout</button></Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
