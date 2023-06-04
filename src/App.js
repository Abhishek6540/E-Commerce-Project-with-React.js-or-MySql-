import Contact from "./component/Contact";
import About from "./component/About";
import Login from "./component/Login";
import Home from "./component/Home";
import Error from "./component/Error";
import ViewCart from './component/ViewCart';
import Admin from "./component/Admin_Home";
import Customer from './component/Customer';
import Register from "./component/Register";
import Payment from "./component/Payment";
import { Routes, Route} from "react-router-dom";
import NoteState from "./NoteContext/NoteState";
import NavBar from "./NavBar";



const App=()=> {
  return (
    <>
    <NoteState>  
     <NavBar/>
     
    <Routes>
      <Route exact path="/" element={<Home/>}/> 
      <Route path="/about" element={<About/>}/>
      <Route  path="/login" element={<Login/>} />
      <Route path="/contact" element={<Contact/>}/> 
      <Route path="/register" element={<Register/>}/> 
      <Route path="/ViewCart" element={<ViewCart/>}/> 
      <Route  path="/admin" element={<Admin/>} />
      <Route  path="/customer" element={<Customer/>} />
      <Route path="/payment" element={<Payment/>}/>
      <Route path="*" element={<Error/>}/>
    </Routes>
    </NoteState>
 
    </>
    
  );
}

export default App;
