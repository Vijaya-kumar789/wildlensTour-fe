import { useContext, useEffect, useRef, useState } from "react";
import { Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { IoMenuSharp } from "react-icons/io5";
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import logoImg from "../assets/images/logo.png";
import "./homeNav.css";
import { userServices } from "../Instance/userServices";
import userContext from "../context/ContextApi";
import { AuthContext } from "../context/AuthContext";

const nav_links = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "#",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

// export const userLoader = async ()=>{
//   try {
//     const user = await userServices.getCurrentUser();

//   if(!user){
//     console.log("user not found")
//   }else{{user}}
//    ;
//   } catch (error) {
//     console.log(error.message)
//   }

// }

// export const userLoader = async ()=>{
//   const res = await fetch("http://localhost:3005/api/v1/users/profile")

//   const user = await res.json()
//   return {user}

// }
// const res = await fetch("http://localhost:3005/api/v1/users/profile",
//  { headers:{
//     'Content-Type' : "application/json",
//    },
//     withCredentials:true,}
// )

const HomeNav = () => {
  // { user,handleLogout }
  // const {userData} = useContext(userContext)
  // console.log(userData)
  // const [userData,setUserData] = useState({});

  // const getUserData = async() =>{
  //   try {

  //   const user = await userServices.getCurrentUser();

  //     setUserData(user.data);

  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

  // useEffect(() => {
  //   getUserData()
  // },[setUserData])
  // console.log(userData)
  // console.log(userData.userName)

  // const {user} = useLoaderData();
  // console.log(user.data.userName)

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate()
  const {user, dispatch} = useContext(AuthContext)

  const logout =(e) => {
    e.preventDefault();
    dispatch({type:'LOGOUT'})
    
    userServices.logout().then(res => {
      alert (res.data.message);

      
      setTimeout(() => {
        navigate("/home")
      },5000);
  })
  .catch(err => {
    alert(err.message)
  })

}
 
  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <>
      <header className="header" ref={headerRef}>
        <Container>
          <Row>
            <div className="nav__wrapper d-flex align-items-center justify-content-between ">
              <div className="logo">
                <img src={logoImg} alt="" />
              </div>

              <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                <ul className="menu d-flex align-items-center gap-5">
                  {nav_links.map((item, index) => (
                    <li className="nav__item" key={index}>
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "active__link" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="nav__right d-flex align-items-center gap-4">
                <div className="nav__btns d-flex align-items-center gap-4">
                  {user? (
                    <>
                      <h5 className="mb-0">{user.userName}</h5>
                      <Button className="btn btn-dark" onClick={logout}>Logout</Button>
                    </>
                  ) : (
                    <>
                      <Button className="btn secondary__btn">
                        <Link to="/login">Login</Link>
                      </Button>
                      <Button className="btn primary__btn">
                        <Link to="/register">Register</Link>
                      </Button>
                    </>
                  )}
                </div>
                <span className="mobile__menu" onClick={toggleMenu}>
                  <IoMenuSharp />
                </span>
              </div>
            </div>
          </Row>
        </Container>
      </header>
      <Outlet />
    </>
  );
};

export default HomeNav;
