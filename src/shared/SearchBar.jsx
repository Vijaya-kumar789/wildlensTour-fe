import { useRef } from "react";
import "./searchBar.css";
import { Col, Form, FormGroup } from "react-bootstrap";
import { FiMapPin } from "react-icons/fi";
import { RiMapPinTimeLine, RiSearchLine } from "react-icons/ri";
import { GrGroup } from "react-icons/gr";
import { BASE_URL } from "./../utils/config";

import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const locationRef = useRef("");
  const distanceRef = useRef(0);
  const maxGroupSizeRef = useRef(0);
  const navigate = useNavigate();

  const searchHanle = async () => {
    const location = locationRef.current.value;
    const distance = distanceRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    if (location === "" || distance === "" || maxGroupSize === "") {
      return alert("All fields are required!");
    }

    const res = await fetch(
      `${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`
    );

    if (!res.ok) alert("Something went wrong");

    const result = await res.json();
    
    navigate(
      `/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`, {state:result.data}
    );
  };

  return (
    <Col lg={12}>
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <FiMapPin />
            </span>
            <div>
              <h5>Location</h5>
              <input type="text" placeholder="Where to?" ref={locationRef} />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <RiMapPinTimeLine />
            </span>
            <div>
              <h5>Distance</h5>
              <input
                type="number"
                placeholder="Distance km?"
                ref={distanceRef}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-last">
            <span>
              <GrGroup />
            </span>
            <div>
              <h5>Max People</h5>
              <input type="number" placeholder="0" ref={maxGroupSizeRef} />
            </div>
          </FormGroup>
          <span className="search__icon" type="submit" onClick={searchHanle}>
            <RiSearchLine />
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
