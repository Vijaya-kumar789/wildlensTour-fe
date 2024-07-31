import { Button, Form, FormGroup, ListGroup } from "react-bootstrap";
import "./booking.css";
import { FaStar } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userServices } from "../../Instance/userServices";
import { bookingSchema } from "../../formikSchema/schema";
import { useFormik } from "formik";
import { BASE_URL } from "../../utils/config";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const Booking = ({ tour, avgRating }) => {
  const { id } = useParams();
  const { price, reviews } = tour;
  const {user} = useContext(AuthContext)

  const navigate = useNavigate();


  const onSubmit = async () => {
    if(!user || user===null || user===undefined){
      toast.error('Please Login')
    }else{
    try {
      const res = await fetch(`${BASE_URL}/bookings/checkout-session/${id}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });
      
      const result = await res.json();
      if (!res.ok) toast.error(result.message);

      if (result.session.url) {
        toast.success("Redirecting to Checkout page")
        window.location.href = result.session.url;
      }
      // userServices.createBooking(fullName,phone,guestSize,bookAt,totalAmount,id)
      // .then((res)=>{
      //   alert(res.data.message)
      //   console.log(res.data)
      //   setData(res.data)

      // if(data.session.url){
      //   window.location.href = data.session.url
      // }

      // }).catch((err)=>{
      //   alert(err.message)
      // })
    } catch (error) {
      toast.error(error.message);
    }

    // navigate("/thank-you")
  }
};
  const { values, handleBlur, handleChange, touched, errors, handleSubmit } =
    useFormik({
      initialValues: {
        fullName: "",
        phone: "",
        bookAt: "",
        guestSize:1,
        companion:false,
      },
      validationSchema: bookingSchema,
      onSubmit,
    });
    let companionFee=0;
    if(values.companion==true) {
      companionFee = 20;
    }
    
    const serviceFee = 10;
    const totalAmount = Number(price) * Number(values.guestSize) + Number(serviceFee) + Number(companionFee);
    
  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/per Person</span>
        </h3>
        <span className="rating d-flex align-items-center  ">
          <span>
            <FaStar />
          </span>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleSubmit}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              // onChange={handleChange}
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.fullName && touched.fullName ? "input-error" : ""
              }
              // onChange={(e)=> setFullName(e.target.value)}
            />
            {errors.fullName && touched.fullName && <p className='error-msg'>{errors.fullName}</p>}
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              // onChange={handleChange}
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.phone && touched.phone ? "input-error" : ""}

              // onChange={(e)=> setPhone(e.target.value)}
            />
            {errors.phone && touched.phone && <p className='error-msg'>{errors.phone}</p>}

          </FormGroup>
          <FormGroup >
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              // onChange={handleChange}
              value={values.bookAt}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.bookAt && touched.bookAt ? "input-error" : ""}
              // onChange={(e)=> setBookAt(e.target.value)}
            />
            {errors.bookAt && touched.bookAt && <p className='error-msg'>{errors.bookAt}</p>}
            </FormGroup>
            <FormGroup >
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              // onChange={handleChange}
              value={values.guestSize}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.guestSize && touched.guestSize ? "input-error" : ""
              }

              // onChange={(e)=> setGuestSize(e.target.value)}
            />
            {errors.guestSize && touched.guestSize && <p className='error-msg'>{errors.guestSize}</p>}

          </FormGroup>
          <FormGroup >
          
            <input
              type="checkbox"
              id="companion"  
              onChange={handleChange}
              className="checkbox my-3"
              value={values.companion}
            />
            
            <label  htmlFor="companion">Do You Want Companion</label>
            
          </FormGroup>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <li className="border-0 px-0 li">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <RiCloseLine /> 1 person
            </h5>
            <span>${price}</span>
          </li>

        {values.companion == true? <li className="border-0 px-0 li">
        <h5>Companion Charge</h5>
        <span>${companionFee}</span>
      </li> : "" }

          <li className="border-0 px-0 li">
            <h5>Service Charge</h5>
            <span>${serviceFee}</span>
          </li>

          <li className="border-0 px-0 total li">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </li>

        
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleSubmit}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
