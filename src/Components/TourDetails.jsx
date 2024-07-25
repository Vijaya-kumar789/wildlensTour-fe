import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Form, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import HomeFooter from '../wrappers/HomeFooter'
import calculateAvgRating from "../utils/avgRating";
import { FaStar } from "react-icons/fa";
import {
  RiMapPinUserFill,
  RiMapPin2Line,
  RiMoneyDollarCircleFill,
  RiMapPinTimeLine,
} from "react-icons/ri";
import { GrGroup } from "react-icons/gr";
import "../styles/tour-details.css";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../wrappers/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { userServices } from "../Instance/userServices";


const TourDetails = ({user}) => {
  const { id } = useParams();
  const [reviewText,setReviewText] = useState("");
  // const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);

 const {tour : tours,loading,error} = useFetch(`${BASE_URL}/tours/${id}`)


  const {
    photo,
    name,
    description,
    price,
    address,
    reviews,
    city,
    distance,
    maxGroupSize,
  } = tours;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const option = { day: "numeric", month: "long", year: "numeric" };

  const submitHandle = (e) => {
    e.preventDefault();
    // const reviewText = reviewMsgRef.current.value;
    console.log(reviewText)
    if(!user || user===null){
      alert('Please Login')
    }else{
    try {

        userServices.addReview(reviewText , tourRating,id)
        .then(res =>{
          alert(res.data.message);
          setReviewText("")
          
        })
        .catch(err => {
          alert(err.message)
        })
      } catch (error) {
        alert(error.message)
    }
    
    }
  }

  useEffect(() => {
    window.scrollTo(0,0);
  },[tours])

  return (
    <>
      <section>
        <Container>
          {
            loading && <h4 className="text-center pt-4">Loading.....</h4>
          }
          {
            error && <h4 className="text-center pt-4">{error}</h4>
          }
          {
            !loading && !error && <Row>
            <Col lg={8} >
              <div className="tour__content">
                <img src={photo} alt="" />

                <div className="tour__info">
                  <h2>{name}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className="rating d-flex align-items-center gap-1 mt-2">
                      <FaStar  />
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? (
                        "Not Rated"
                      ) : (
                        <span>({reviews?.length})</span>
                      )}
                    </span>

                    <span className="mt-2">
                      <RiMapPinUserFill />
                      {address}
                    </span>
                  </div>
                  <div className="tour__extra-details">
                    <span>
                      <RiMapPin2Line />
                      {city}
                    </span>
                    <span>
                      <RiMoneyDollarCircleFill />${price}/per person
                    </span>
                    <span>
                      <RiMapPinTimeLine />
                      {distance}k/m
                    </span>
                    <span>
                      <GrGroup />
                      {maxGroupSize} people
                    </span>
                  </div>
                  <h5>Description</h5>
                  <p>{description}</p>
                </div>

                <div className="tour__reviews mt-4">
                  <h4>Reviews ({reviews?.length} reviews)</h4>
                  <Form onSubmit={submitHandle}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      <span onClick={() => setTourRating(1)}>
                        1 <FaStar />
                      </span>
                      <span onClick={() => setTourRating(2)}>
                        2 <FaStar />
                      </span>
                      <span onClick={() => setTourRating(3)}>
                        3 <FaStar />
                      </span>
                      <span onClick={() => setTourRating(4)}>
                        4 <FaStar />
                      </span>
                      <span onClick={() => setTourRating(5)}>
                        5 <FaStar />
                      </span>
                    </div>

                    <div className="review__input">
                      <input
                        type="text"
                        // ref={reviewMsgRef}
                        placeholder="share your thoughts"
                        required
                        value={reviewText}
                        onChange={(e)=> setReviewText(e.target.value)}
                      />
                      <button
                        className="btn primary__btn text-white"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>

                  <ListGroup className="user__reviews" >
                    {reviews?.map((review,index) => (
                      <div className="review__item" key={index}>
                        <img src={avatar} alt="" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.userName}</h5>
                              <p>
                                {new Date("04-06-2024").toLocaleDateString(
                                  "en-US",
                                  option
                                )}
                              </p>
                            </div>
                            <span className="d-flex align-items-center ">
                             {review.rating}<FaStar className="i" />
                            </span>
                          </div>
                          <h6>{review.reviewText}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>
            <Col lg={4}>
            <Booking tour = {tours} avgRating={avgRating}/>
            </Col>
          </Row>
          }
        </Container>
      </section>
      <Newsletter/>
      <HomeFooter/>
    </>
  );
};

export default TourDetails;