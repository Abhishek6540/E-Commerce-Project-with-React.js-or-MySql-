import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form,Button,Container } from 'react-bootstrap'

const Payment = () => {
    const [customername, setCustomername] = useState('');
    const [cardno, setCardno] = useState('');
    const [password, setPassword] = useState('');
    const [amount, setAmount] = useState('');

useEffect(()=>{
    setAmount(localStorage.getItem("gross"));
    setCustomername(localStorage.getItem("cname"));
})

function mysubmit() 
{
const data={"cname":customername,"cardno":cardno,"amount":amount,"products":localStorage.getItem("products")};
console.log(data);
Axios.post("http://localhost:4200/payment",data).then(
res=> console.log("payment done") );
setCardno('');
setPassword('');
window.alert("payment done");
}


return (
    <>
    <div>
        <br/><br/><br/>

<Container>

<Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Customer Name</Form.Label>
    <Form.Control type="text" value={customername}
          onChange={(e)=>setCustomername(e.target.value)}

/>
    
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Card No</Form.Label>
    <Form.Control type="text" value={cardno}
          onChange={(e)=>setCardno(e.target.value)}

/>
    
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password"
 value={password}
          onChange={(e)=>setPassword(e.target.value)}
 />
  </Form.Group>
  

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Amount</Form.Label>
    <Form.Control type="text" placeholder="Amount"
 value={amount}
         
 />
  </Form.Group>
 
  <Button variant="primary" type="button" onClick={mysubmit}>
    Submit
  </Button>
</Form>

<a href="/bill">Generate Bill </a>

</Container>

      </div>
        </>
  )
}

export default Payment
