// import React, { useState } from "react";
// import '../styles/login.css'
// import { Container, Row, Col, Form,FormGroup ,Button} from "react-bootstrap";
// import loginImg from "../assets/images/login.jpg";
// import userIcon from "../assets/images/user.png";
// import {Link, useNavigate} from "react-router-dom"

// import HomeFooter from '../wrappers/HomeFooter'

// const AdminLogin = ({handleClick,email , setEmail,password , setPassword}) => {

// //     const [email,setEmail] = useState("")
// //     const [password,setPassword]  = useState("")
    
// //    const handleClick = () => {
// //     e.preventDefault();


//    }

//   return (
//     <>
//      <section>
//       <Container >
//         <Row >
//           <Col lg={8} className="m-auto">
//           <div className="login__container d-flex justify-content-between">
//             <div className="login__img">
//               <img src={loginImg} alt="" />
//             </div>
//             <div className="login__form">
//               <div className="user">
//                 <img src={userIcon} alt="" />
//               </div>
//               <h2>Admin Login</h2>
//               <Form onSubmit={handleClick}>
//                 <FormGroup>
//                       <input type="email" placeholder="Email" required id="email" 
//                       value={email} onChange={(e)=> setEmail(e.target.value)}/>
//                 </FormGroup>
//                 <FormGroup>
//                       <input type="password" placeholder="Password" required id="password" 
//                       value={password}
//                       onChange={(e)=> setPassword(e.target.value)}/>
//                 </FormGroup>
//                 <Button className = "btn  auth__btn " type="submit">Login</Button>
//               </Form>
//               <p>Don't have an account? <Link to= "/register">Create</Link></p>
//             </div>
//           </div>
//           </Col>
//        </Row>
//        </Container>
//       </section>
//       <HomeFooter/>
//     </>
//   );
// };

// export default AdminLogin;
