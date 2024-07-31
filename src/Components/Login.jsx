import React, { useContext, useState } from 'react'
import '../styles/login.css'
import { Container, Row, Col, Form,FormGroup ,Button} from "react-bootstrap";
import loginImg from "../assets/images/login.jpg";
import userIcon from "../assets/images/user.png";
import {Link, useNavigate} from "react-router-dom"
import { userServices } from '../Instance/userServices';
import HomeFooter from '../wrappers/HomeFooter'
import userContext from '../context/ContextApi';
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext';
import { useFormik } from 'formik';
import { loginSchema } from '../formikSchema/schema';
import { toast } from 'react-toastify';

const Login = () => {

  const {dispatch} = useContext(AuthContext)
  const navigate = useNavigate();

  
  const onSubmit = async (values,actions)=>{
    
            dispatch({type:'LOGIN_START'})
            
            try {
            
              const res = await fetch (`${BASE_URL}/users/login`,{
                method:'post',
                headers:{
                  'content-type' : 'application/json',
                },
                credentials:'include',
                body: JSON.stringify(values),
              }) 

              const result = await res.json()
              if(!res.ok) toast.error(result.message)

                if(res.ok){
                dispatch({type:'LOGIN_SUCCESS', payload:result.data});
                actions.resetForm()
                
          
                navigate('/')
                toast.success(result.message)
                
                }
            } catch (error) {
              dispatch({ type : "LOGIN_FAILURE", payload: error.message})
            }

          }
  const { values,handleBlur,handleChange,touched,errors,handleSubmit} = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema:loginSchema,
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
              <img src={loginImg} alt="" />
            </div>
            <div className="login__form">
              <div className="user">
                <img src={userIcon} alt="" />
              </div>
              <h2>Login</h2>
        
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                      <input type="email" placeholder="Email" required id="email"
                      value={ values.email} 
                      onChange={ handleChange}
                      onBlur={ handleBlur}
                      className={errors.email && touched.email ? 'input-error':""}
                      // onChange={handleChange}
                      // value={email} onChange={(e)=> setEmail(e.target.value)}
                      />
                      {errors.email && touched.email && <p className='error'>{errors.email}</p>}
                </FormGroup>
                <FormGroup>
                      <input type="password" placeholder="Password" required id="password" 
                      value={ values.password} 
                      onChange={ handleChange}
                      onBlur={ handleBlur}
                      className={errors.password && touched.password ? 'input-error':""}
                      // onChange={handleChange}
                      // value={password} onChange={(e)=> setPassword(e.target.value)}
                      
                      />
                      {errors.password && touched.password && <p className='error'>{errors.password}</p>}
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