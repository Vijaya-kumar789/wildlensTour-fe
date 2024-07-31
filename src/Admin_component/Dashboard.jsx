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
import "../wrappers/homeNav.css";
import { userServices } from "../Instance/userServices";
import userContext from "../context/ContextApi";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";


const nav_links = [
  {
    path: "/admin/createTour",
    display: "Create Tour",
  },
  {
    path: "/admin/tourLists",
    display: "Edit Tour",
  },
  {
    path: "/admin/bookings",
    display: "Bookings",
  },
];

const DashBoard = () => {
      const headerRef = useRef(null);
      const menuRef = useRef(null);
      const navigate = useNavigate()
      const {user, dispatch} = useContext(AuthContext)

      const logout =(e) => {

        dispatch({type:'LOGOUT'})

        userServices.logout().then(res => {
          toast.success(res.data.message);

          setTimeout(() => {
            navigate("/home")
          },5000);
      })
      .catch(err => {
        toast.error(err.message)
      })

    }

      const stickyHeaderFunc = () => {
        window.addEventListener("scroll", () => {
          if (
            document.body.scrollTop > 80 ||
            document.documentElement.scrollTop > 80
          ) {
            headerRef.current.classNameList.add("sticky__header");
          } else {
            headerRef.current.classNameList.remove("sticky__header");
          }
        });
      };

      useEffect(() => {
        stickyHeaderFunc();

        return window.removeEventListener("scroll", stickyHeaderFunc);
      });

      const toggleMenu = () => menuRef.current.classNameList.toggle("show__menu");
//   const [active, setActive] = useState("Dashboard");
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
                          className={(navclassName) =>
                            navclassName.isActive ? "active__link" : ""
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
                        <Button className="btn primary__btn" onClick={logout}>Logout</Button>
                      </>
                    ) : (
                      <>
                        <Button className="btn secondary__btn">
                          <Link to="/login">Login</Link>
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
    // <>
      {/* <div className="card" style={{ width: "18rem" ,height:"200px"}}>
        <div className="card-header">Featured</div>
        <ul className="list-group list-group-flush d-flex align-items-center ul" >
          {nav_links.map((item, index) => (
            <li className="nav__item" key={index}>
              <Link to={item.path}>{item.display}</Link>
            </li>
          ))}
        </ul>
      </div> */}
                        {/* <div className="list-group">
                        {
                            nav_links.map((item, index) => (
                                <Link key={index} to={item.path} className={`list-group-item list-group-item-action ${active === item ? "active" : ""}`}
                                    onClick={() => setActive(item.display)}
                                >
                                    {item.display}
                                </Link>
                            ))
                    }
                    </div> */}
    // </>
 

export default DashBoard;
