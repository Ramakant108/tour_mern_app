import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

const LoginSignup = ({setUser}) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [firstName,setFirstName]=useState();
  const [lastName,setLastName]=useState();
  const navigate=useNavigate()


  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

 
        
  
  const handlesignup=async(e)=>{
       e.preventDefault();
       try {
        if(firstName&&lastName&&email&&password){
          const response= await axios.post("http://localhost:3001/users/register",{
            username:`${firstName} ${lastName}`,
            email,
            password
           });
          console.log(response.data)
          setUser(response.data)
           toast.success("Register Successfuly")
           navigate('/')
        }
        else{
          toast.error("All filds are mendatory")
        }
       
       } catch (error){
        toast.error(error.response.data.message)
       }
  }
  const handlelogin=async(e)=>{
       try {
        e.preventDefault();
        const params={
          email,
          password
        }
        const response=await axios.get("http://localhost:3001/users/login",{params});
        setUser(response.data)
        console.log(response.data)
        toast.success("Login Successfuly")
        navigate('/')
       }catch (error){
        console.log(error)
        toast.error(error.response.data.message)
       }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center">{isLogin ? 'Login' : 'Signup'}</h2>
        {isLogin ? (
          <form>
            {/* Login Form */}
            <div className="mb-3">
              <label htmlFor="loginEmail" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                id="loginEmail"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="loginPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                id="loginPassword"
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" onClick={handlelogin}  className="btn btn-primary w-100">
              Login
            </button>
          </form>
        ) : (
          <form>
            {/* Signup Form */}
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
                placeholder="Enter your first name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
                placeholder="Enter your last name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="signupEmail" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                id="signupEmail"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="signupPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="signupPassword"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" onClick={handlesignup} className="btn btn-success w-100">
              Signup
            </button>
          </form>
        )}
        {/* Toggle Button */}
        <div className="text-center mt-3">
          <button
            type="button"
            className="btn btn-link"
            onClick={toggleForm}
          >
            {isLogin
              ? "Don't have an account? Signup"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
