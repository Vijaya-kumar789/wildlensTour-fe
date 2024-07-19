import TourCard from "../../shared/TourCard";
import { Col } from "react-bootstrap";


import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const FeaturedTourList = () => {

  const {tour : featuredTours ,loading , error} = useFetch(`${BASE_URL}/tours/search/getAvailableTour`);



  return (
    <>{
      loading && <h4>Loading.......</h4>
    }
    {
      error && <h4>{error}</h4>
    }
      {!loading && !error && featuredTours?.map(tour => (
        <Col lg={3} md={6} sm={6} className="mb-4" key={tour._id}>
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  );
};

export default FeaturedTourList;
