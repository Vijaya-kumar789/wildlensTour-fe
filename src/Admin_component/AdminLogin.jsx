import React, { useState } from 'react'
import '../styles/login.css'
import { Container, Row, Col, Form,FormGroup ,Button} from "react-bootstrap";
import registerImg from "../assets/images/register.jpg";
import userIcon from "../assets/images/user.png";
import {Link, useNavigate} from "react-router-dom"
import { userServices } from '../Instance/userServices';
import HomeFooter from '../wrappers/HomeFooter'



const AdminLogin = () => {

    const [userName , setUserName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const navigate = useNavigate()

  const handleClick =async (e)=>{
    e.preventDefault();
   
      userServices.register(userName,email,password)
      .then(res => {
        alert (res.data.message);
        setUserName('');
        setEmail('');
        setPassword('');
        navigate('/login')
      })
      .catch(err => {
        alert(err)
      })

  }

  return (
    <>
     <section>
      <Container >
        <Row >
          <Col lg={8} className="m-auto">
          <div className="login__container d-flex justify-content-between">
            <div className="login__img">
              <img src={registerImg} alt="" />
            </div>
            <div className="login__form">
              <div className="user">
                <img src={userIcon} alt="" />
              </div>
              <h2>Register</h2>
              <Form onSubmit={handleClick}>
              <FormGroup>
                      <input type="text" placeholder="Username" required id="username" 
                      value={userName}
                      // onChange={handleChange}/>
                       onChange={(e)=> setUserName(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                      <input type="email" placeholder="Email" required id="email" 
                      value={email}
                      // onChange={handleChange}/>
                      onChange={(e)=> setEmail(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                      <input type="password" placeholder="Password" required id="password" 
                      value={password}
                      // onChange={handleChange}/>
                      onChange={(e)=> setPassword(e.target.value)}/>
                </FormGroup>
                <Button className = "btn  auth__btn " type="submit">Register</Button>
              </Form>
              <p>Already have an account? <Link to= "/login">Login</Link></p>
            </div>
          </div>
          </Col>
       </Row>
       </Container>
      </section>
      <HomeFooter/>
    </>
  )
}

export default AdminLogin