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
import { registerSchema } from '../formikSchema/schema';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';



const Register = () => {

    // const [userName , setUserName] = useState("");
    // const [email , setEmail] = useState("");
    // const [password , setPassword] = useState("");

    const navigate = useNavigate()
    
  // const [credentials,setCredentials]=useState({
  //   userName:'',
  //   email:'',
  //   password:''
  // });

  // const handleChange =e=>{
  //   setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
  // };

   const {dispatch} = useContext(AuthContext)

   const onSubmit = async (values,actions)=>{
    
    try {
        const res = await fetch(`${BASE_URL}/users/register`,{
         method : "post",
                  headers:{
                    'content-type' : 'application/json'
                  },
                  body:JSON.stringify(values)

                })
                
                const result = await res.json()
                if(!res.ok){
                  toast.error(result.message)
                
                }
                  if(res.ok){
                  dispatch({type:"REGISTER_SUCCESS"})
                  actions.resetForm()
                navigate("/login")
                toast.success(result.message)
                  }
              } catch (error) {
                toast.error(error.message)
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

  const { values,handleBlur,handleChange,touched,errors,handleSubmit} = useFormik({
    initialValues:{
      userName:'',
      email:'',
      password:''
    },
    validationSchema:registerSchema,
    onSubmit
  })

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
              <Form onSubmit={handleSubmit}>
              <FormGroup>
                      <input type="text" placeholder="Username" required id="userName" 
                    // value={credentials.userName}
                    //   onChange={handleChange}
                    value={ values.userName} 
                    onChange={ handleChange}
                    onBlur={ handleBlur}
                    className={errors.userName && touched.userName ? 'input-error':""}
                      
                      />
                      {errors.userName && touched.userName && <p className='error'>{errors.userName}</p>}
                       {/* onChange={(e)=> setUserName(e.target.value)}/> */}
                </FormGroup>
                <FormGroup>
                      <input type="email" placeholder="Email" required id="email" 
                      // value={email}
                      // onChange={handleChange}
                      value={ values.email} 
                      onChange={ handleChange}
                      onBlur={ handleBlur}
                      className={errors.email && touched.email ? 'input-error':""}
                      />
                      {errors.email && touched.email && <p className='error'>{errors.email}</p>}
                      {/* onChange={(e)=> setEmail(e.target.value)}/> */}
                </FormGroup>
                <FormGroup>
                      <input type="password" placeholder="Password" required id="password" 
                      // value={password}
                      // onChange={handleChange}
                      value={ values.password} 
                      onChange={ handleChange}
                      onBlur={ handleBlur}
                      className={errors.password  && touched.password ? 'input-error':""}
                      />
                      {errors.password && touched.password && <p className='error'>{errors.password}</p>}
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