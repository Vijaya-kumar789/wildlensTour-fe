import { Button, Form, FormGroup, ListGroup } from "react-bootstrap";
import "./booking.css";
import { FaStar } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userServices } from "../../Instance/userServices";

const Booking = ({ tour, avgRating }) => {

  const {id} = useParams();
  const { price, reviews } = tour;

  const navigate = useNavigate()

  // const [credentials,setCredentials]=useState({
  //   userId : "01",
  //   userEmail:"vijay@gmail.com",
  //   fullName:"",
  //   phone:'',
  //   guestSize:1,
  //   bookAt:""
  // })

  // const handleChange =e=>{
  //   setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
  // }

  const [data, setData] = useState([]);
  const [fullName,setFullName] = useState('')
  const [guestSize,setGuestSize] = useState(1)
  const [phone,setPhone] = useState('')
  const [bookAt,setBookAt] = useState('')

  const serviceFee = 10
  const totalAmount = Number(price) * Number(guestSize) + Number(serviceFee) ;

  const handleClick = async() => {
    try {
      userServices.createBooking(fullName,phone,guestSize,bookAt,totalAmount,id)
      .then((res)=>{
        alert(res.data.message)
        console.log(res.data)
        setData(res.data)

        if(data.session.url){
          window.location.href = data.session.url
        }

      }).catch((err)=>{
        alert(err.message)
      })
    } catch (error) {
      alert(error.message)
    }
    
    // navigate("/thank-you")
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
              required 
              // onChange={handleChange}
              value={fullName}
              onChange={(e)=> setFullName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <input type="number" placeholder="Phone" id="phone"
              required 
              // onChange={handleChange}
              value={phone}
              onChange={(e)=> setPhone(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="d-flex align-items-center gap-3">
              <input type="date" placeholder="" id="bookAt"
              required 
              // onChange={handleChange}
              value={bookAt}
              onChange={(e)=> setBookAt(e.target.value)}
              />
              <input type="number" placeholder="Guest" id="guestSize"
              required 
              // onChange={handleChange}
              value={guestSize}
              onChange={(e)=> setGuestSize(e.target.value)}
              />
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
