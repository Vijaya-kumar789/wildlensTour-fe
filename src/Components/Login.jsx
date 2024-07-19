import React, { useContext, useState } from 'react'
import '../styles/login.css'
import { Container, Row, Col, Form,FormGroup ,Button} from "react-bootstrap";
import loginImg from "../assets/images/login.jpg";
import userIcon from "../assets/images/user.png";
import {Link, useNavigate} from "react-router-dom"
import { userServices } from '../Instance/userServices';
import HomeFooter from '../wrappers/HomeFooter'
import userContext from '../context/ContextApi';


const Login = ({handleClick,email , setEmail,password , setPassword}) => {

  // const {handleClick,email , setEmail,password , setPassword} =useContext(userContext);
    // const [email , setEmail] = useState("");
    // const [password , setPassword] = useState("");

    // const navigate = useNavigate()

  // const [credentials,setCredentials]=useState({
  //   email:undefined,
  //   password:undefined
  // });

  // const handleChange =e=>{
  //   setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
  // };

  // const handleClick = (e)=>{
  //   e.preventDefault();
    
  //   userServices.login(email,password)
  //   .then(res => {
  //     alert (res.data.message);
      
  //     setEmail('');
  //     setPassword('');
  //     navigate('/')
  //   })
  //   .catch(err => {
  //     alert(err)
  //   })

  // }

  return (
    <>
     <section>
      <Container >
        <Row >
          <Col lg={8} className="m-auto">
          <div className="login__container d-flex justify-content-between">
            <div className="login__img">
              <img src={loginImg} alt="" />
            </div>
            <div className="login__form">
              <div className="user">
                <img src={userIcon} alt="" />
              </div>
              <h2>Login</h2>
              <Form onSubmit={handleClick}>
                <FormGroup>
                      <input type="email" placeholder="Email" required id="email" 
                      value={email} onChange={(e)=> setEmail(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                      <input type="password" placeholder="Password" required id="password" 
                      value={password}
                      onChange={(e)=> setPassword(e.target.value)}/>
                </FormGroup>
                <Button className = "btn  auth__btn " type="submit">Login</Button>
              </Form>
              <p>Don't have an account? <Link to= "/register">Create</Link></p>
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

export default Login