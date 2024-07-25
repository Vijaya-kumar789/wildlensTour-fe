import React, { useEffect, useState } from "react";
import './tourList.css'
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import useFetch from "../hooks/useFetch";
import { Card, CardBody } from "react-bootstrap";
import { FiMapPin } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import calculateAvgRating from "../utils/avgRating";
import { adminServices } from "../Instance/adminServices";
import { GrGroup } from "react-icons/gr";

import {
    RiMapPinUserFill,
    RiMapPin2Line,
    RiMoneyDollarCircleFill,
    RiMapPinTimeLine,
  } from "react-icons/ri";


const TourLists = () => {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  // const { _id, name, city, photo, price, isAvailable, reviews } = tours;

  const handleDelete = async (id)=>
    
    { 
        try {
            adminServices.deleteTour(id)
            .then((res)=>{
             alert(res.data.message)
             
            }).catch((err)=>{
                alert(err.message)
            })
        } catch (error) {
            alert(error.message)
        }
        
 
}

  useEffect(() => {
    const fetchTour = async () => {
      setLoading(true);

      try {
        adminServices
          .getTours()
          .then((res) => {
            setTours(res.data.tours);
            setLoading(false);
          })
          .catch((err) => {
            alert(err.message);
          });
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchTour();
  },[]);
//   const id = tours._id

  
  //   const {tour : tours,loading,error} = useFetch(`${BASE_URL}/tours`)

  const { totalRating, avgRating } = calculateAvgRating(tours.reviews);

  return (
    <>
      <div className="container">
        {loading && <h4 className="text-center pt-5">Loading.....</h4>}
        {error && <h4 className="text-center">{error}</h4>}
        {!loading && !error && (
          <div className="row">
            {tours?.map((tour) => (
              <div className="col lg-6 md-6 mt-5" key={tour._id}>
                <div className="tour_card">
                  <Card className = "t-card">
                    <div className="tour_img">
                      <img src={tour.photo} alt="tour__img" />
                      {tour.isAvailable && <span>Featured</span>}
                    </div>

                    <CardBody className="card-Body">
                    <div className="tour__info">
                  <h2>{tour.name}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className="rating d-flex align-items-center gap-1 mt-2">
                      <FaStar  />
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? (
                        "Not Rated"
                      ) : (
                        <span>({tour.reviews?.length})</span>
                      )}
                    </span>

                    <span className="mt-2">
                      <RiMapPinUserFill />
                      {tour.address}
                    </span>
                  </div>
                  <div className="tour__extra-details">
                    <span>
                      <RiMapPin2Line />
                      {tour.city}
                    </span>
                    <span>
                      <RiMoneyDollarCircleFill />${tour.price}/per person
                    </span>
                    <span>
                      <RiMapPinTimeLine />
                      {tour.distance}k/m
                    </span>
                    <span>
                      <GrGroup />
                      {tour.maxGroupSize} people
                    </span>
                  </div>
                  <h5>Description</h5>
                  <p>{tour.description}</p>
                   <div className="d-flex justify-content-evenly my-4">
                   <Link to ={`/admin/editTour/${tour._id}`} className="btn edit-btn">Edit</Link>
                    <button className="btn del-btn" onClick={()=> handleDelete(tour._id)}>Delete</button>

                   </div>
                </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TourLists;
