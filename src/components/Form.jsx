import React, { useState } from 'react'
import '../../src/index.css'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
export const Form = ({validate,msg,validPan,panMessage}) => {
      const today = new Date().toISOString().split('T')[0];
      const[message,setMessage]=useState({
        text:'',
        clr:'',
      });
     const fetchState = async (e) => {
  const pincode = e.target.value;

  // Only proceed if pincode is exactly 6 digits
  if (pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
    return; // Exit early if not valid
  }

  try {
    const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = response.data;

    if (data[0].Status === "Success") {
       document.getElementById('city').value=data[0].PostOffice[0].District;
       document.getElementById('state').value=data[0].PostOffice[0].State;  
       setMessage({text:'Pincode Serviceable',clr:'green'});
       setTimeout(()=>setMessage({text:''}),1000);

      // You can set state here using setState or update your UI
    } else {
      console.warn("Invalid pincode or no data found");
      setMessage({text:'Pincode unserviceable',clr:'red'});
      setTimeout(()=>setMessage({text:''}),1000);
    }
  } catch (error) {
    console.error("API error:", error.message);
  }
};
const SubmitData=async (e)=>{
  e.preventDefault();
  const res=await axios.post('http://localhost:5000/send',{
    to:'saurabhverma2295@gmail.com',
    subject:'Request For Loan Enquiry',
    text:'',
  });
  console.log(res.data);

}
  return (
    <>
    <div className="form-container">
        <h3>ILC Private Limited (IPC)</h3>
        <br/>
        <form action="">
            <label htmlFor="name">Full Name</label>
            <input type="text" name="name" id="" placeholder='Full Name' />
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" id="" placeholder='Email Address' />
            <label htmlFor="phone">Phone </label>
            <input type="tel" name="phone" id="" placeholder='Phone Number' />
            <label htmlFor="pincode">Pincode</label>
            <input type="tel" name="pincode" pattern="\d{6}" id="" placeholder='Pincode' maxLength="6" onChange={fetchState} />
            <span style={{color:message.clr}}>{message.text}</span>
            <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" placeholder='City' />
            <label htmlFor="state">State</label>
            <input type="text" name="state" id="state" placeholder='State' />
            <label htmlFor="aadhar-card">Aadhar Card</label>
            <input type="text" name="aadhar"  placeholder='Aadhar Card Number' onChange={(e)=>validate(e.target.value)} maxLength="12"/>
            <span>{msg}</span>
              <label htmlFor="pan-card">Pan Card</label>
            <input type="text" name="pan"  placeholder='PAN Card Number' onChange={(e)=>validPan(e.target.value)} maxLength="10"/>
            <span>{panMessage}</span>
            <label htmlFor="return">Return Date</label>
            <input type="date" name="return" id="" placeholder='Date'  min={today}/>
            
            <button type='button' onClick={SubmitData}>Submit Details</button>
        </form>
    </div>
    </>
  )
}
