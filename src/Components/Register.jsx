import React, { useContext, useState } from 'react'
import '../styles/login.css'
import { Container, Row, Col, Form,FormGroup ,Button} from "react-bootstrap";
import registerImg from "../assets/images/register.jpg";
import userIcon from "../assets/images/user.png";
import {Link, useNavigate} from "react-router-dom"
import { userServices } from '../Instance/userServices';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';
import HomeFooter from '../wrappers/HomeFooter'



const Register = () => {

    // const [userName , setUserName] = useState("");
    // const [email , setEmail] = useState("");
    // const [password , setPassword] = useState("");

    const navigate = useNavigate()
    
  const [credentials,setCredentials]=useState({
    userName:'',
    email:'',
    password:''
  });

  const handleChange =e=>{
    setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
  };

   const {dispatch} = useContext(AuthContext)

  const handleClick =async (e)=>{
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/users/register`,{
        method : "post",
        headers:{
          'content-type' : 'application/json'
        },
        body:JSON.stringify(credentials)

      })
      
      const result = await res.json()
      if(!res.ok){
        alert(result.message)
       
      }
        if(res.ok){
        dispatch({type:"REGISTER_SUCCESS"})
      navigate("/login")
      alert(result.message)
        }
    } catch (error) {
      alert(error.message)
    }
   
      // userServices.register(userName,email,password)
      // .then(res => {
      //   alert (res.data.message);
      //   setUserName('');
      //   setEmail('');
      //   setPassword('');
      //   navigate('/login')
      // })
      // .catch(err => {
      //   alert(err)
      // })

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
                      <input type="text" placeholder="Username" required id="userName" 
                    value={credentials.userName}
                      onChange={handleChange}/>
                       {/* onChange={(e)=> setUserName(e.target.value)}/> */}
                </FormGroup>
                <FormGroup>
                      <input type="email" placeholder="Email" required id="email" 
                      // value={email}
                      onChange={handleChange}/>
                      {/* onChange={(e)=> setEmail(e.target.value)}/> */}
                </FormGroup>
                <FormGroup>
                      <input type="password" placeholder="Password" required id="password" 
                      // value={password}
                      onChange={handleChange}/>
                      {/* onChange={(e)=> setPassword(e.target.value)}/> */}
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

export default Register