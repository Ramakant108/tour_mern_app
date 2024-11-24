import { Routes ,Route, useNavigate} from 'react-router-dom';
import './App.css';
import Navbar from './Componant/Header';
import Home from './Componant/home';
import CreateTourForm from './Componant/createAdit';
import { useEffect, useState } from 'react';
import LoginSignup from './Componant/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  const [user,setUser]=useState(null);
  const navigate=useNavigate();
  useEffect(()=>{
        if(user===null){
           navigate('/login')
        }
        // console.log(user)
  },[user])

  return (
    <div className="App">
      <ToastContainer/>
     {user==null?<></>:<Navbar user={user}  setUser={setUser}/>}
     {/*<Navbar/>*/}
    <Routes>
      <Route path='/' element={<Home user={user}/>}/>
      <Route path='/getuser/:title' element={<Home user={user}/>}/>
      <Route path='/login'  element={<LoginSignup setUser={setUser}/>}/>
      <Route path='/create' element={<CreateTourForm user={user}/>}/>
      <Route path='/update/:id' element={<CreateTourForm user={user}/>}/>
      <Route path='*' element={<h1>page not found</h1>}/>
    </Routes>
    </div>
  );
}

export default App;
