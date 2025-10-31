import React from 'react'
import '../../src/index.css'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
export const Form = () => {
      const today = new Date().toISOString().split('T')[0];
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
       toast.success('Fetched State Successfully');
      // You can set state here using setState or update your UI
    } else {
      console.warn("Invalid pincode or no data found");
      toast.error('Pincode inserviceable');
    }
  } catch (error) {
    console.error("API error:", error.message);
  }
};
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
            <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" placeholder='City' />
            <label htmlFor="state">State</label>
            <input type="text" name="state" id="state" placeholder='State' />
            <ToastContainer/>
            <label htmlFor="return">Return Date</label>
            <input type="date" name="return" id="" placeholder='Date'  min={today}/>
            
            <button type='button'>Submit Details</button>
        </form>
    </div>
    </>
  )
}
