import React from "react";
import "./newsletter.css";
import maleTourist from "../assets/images/male-tourist.png";
import { Container, Row, Col } from "react-bootstrap";

const Newsletter = () => {
  return (
    <section className="newsletter">
    <Container>
      <Row>
        <Col lg={6}>
          <div className="newsletter__content">
            <h2>Subscribe now to get useful traveling information.</h2>
            <div className="newsletter__input">
              <input type="email" placeholder="Enter your email" />
              <button className="btn newsletter__btn">Subscribe</button>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
              ipsum fugiat tempore nihil quas voluptates est non, animi saepe
              ducimus expedita veniam tenetur, iusto dolorum, necessitatibus
              molestias omnis. Beatae, velit!
            </p>
          </div>
        </Col>
        <Col lg={6}>
        <div className="newsletter__img">
            <img src={maleTourist} alt="" />
        </div>
        </Col>
      </Row>
    </Container>
    </section>
  );
};

export default Newsletter;
