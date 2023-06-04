import './login.css';
import {useNavigate} from 'react-router-dom';
import React, { useContext, useState } from 'react';
import NoteContext from '../NoteContext/NoteContext';

function Login(props) {
    const      [username, setUserName] = useState('');
    const      [password, setPassword] = useState(''); 
    const navigate = useNavigate();

    const valueContext=useContext(NoteContext);
     
    function handleChange1(e)  {
      e.preventDefault();
        
      setUserName(e.target.value);
    };
    function handleChange2(e)  {
      e.preventDefault();
        
      setPassword(e.target.value);
    }; 


    async function mysubmit() 
      {
        valueContext.setUser(username);
    const data={"username":username,"password":password};
  
       const config = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
      }
      const response = await fetch('http://localhost:4200/login', config)    
      const json = await response.json();
   
  
  console.log(json);
  if(json.length==0)
    {
     console.log("invalid user try again");
       
      }
  else if(json[0].type=="admin")
   { console.log("welcome admin");
     navigate("/admin");
  }
  else if(json[0].type=="customer")
   { console.log("customer ");
      localStorage.setItem("cname",username);
      navigate("/customer");
    }
  
  
      
  }
    return (
      <>
     <div class="wrapper">
        <div class="logo">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0_7hio3Q2raEntDCPcoD-ZlSHuJVwY9538QjMbNtgPatrEv8&s" alt=""/>
        </div>
        <div class="text-center mt-4 name">
            Login Here
        </div>
        <form class="p-3 mt-3">
            <div class="form-field d-flex align-items-center">
                <span class="far fa-user"></span>
                <input type="text" onChange={handleChange1} name="username" id="username" placeholder="Username"/>
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="fas fa-key"></span>
                <input type="password" onChange={handleChange2} name="password" id="pwd" placeholder="Password"/>
            </div>
            <button class="btn mt-3" type="button" onClick={mysubmit}>Login</button>
        </form>
        <div class="text-center fs-6">
            <a href="#">Forget password?</a> or <a href="/register">Sign up</a>
        </div>
    </div>
      </>
    );
  }
  
  export default Login;
  