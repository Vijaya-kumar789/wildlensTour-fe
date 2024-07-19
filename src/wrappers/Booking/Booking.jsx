import { Button, Form, FormGroup, ListGroup } from "react-bootstrap";
import "./booking.css";
import { FaStar } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews } = tour;
  const navigate = useNavigate()

  const [credentials,setCredentials]=useState({
    userId : "01",
    userEmail:"vijay@gmail.com",
    fullName:"",
    phone:'',
    guestSize:1,
    bookAt:""
  })

  const handleChange =e=>{
    setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
  }
  const serviceFee = 10
  const totalAmount = Number(price) * Number(credentials.guestSize) + Number(serviceFee) ;

  const handleClick = e=>{
    e.preventDefault();
    
    navigate("/thank-you")
  }

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/per Person</span>
        </h3>
        <span className="rating d-flex align-items-center  ">
          <span><FaStar /></span>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

        <div className="booking__form">

          <h5>Information</h5>
          <Form className="booking__info-form" onSubmit={handleClick}> 
            <FormGroup>
              <input type="text" placeholder="Full Name" id="fullName"
              required onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
              <input type="number" placeholder="Phone" id="phone"
              required onChange={handleChange}/>
            </FormGroup>
            <FormGroup className="d-flex align-items-center gap-3">
              <input type="date" placeholder="" id="bookAt"
              required onChange={handleChange}/>
              <input type="number" placeholder="Guest" id="guestSize"
              required onChange={handleChange}/>
            </FormGroup>
          </Form>
        </div>

      <div className="booking__bottom">
        <ListGroup>
          <li className="border-0 px-0 li">
            <h5 className="d-flex align-items-center gap-1">${price} <RiCloseLine /> 1 person</h5>
            <span>${price}</span>
          </li>
          
          
          <li className="border-0 px-0 li">
            <h5>Service Charge</h5>
            <span>${serviceFee}</span>
          </li>
          
          
          <li className="border-0 px-0 total li">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </li>
          
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>Book Now</Button>
      </div>
    </div>
  );
};

export default Booking;
