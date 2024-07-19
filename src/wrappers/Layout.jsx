import React from 'react'
import HomeNav from './HomeNav'
// import HomeFooter from './HomeFooter'
import Routers from '../router/Routers'
import { UserProvider } from '../context/ContextApi'
// import {loader as userLoader} from '../wrappers/HomeNav';

const Layout = () => {
  return (
    <>
   
    <HomeNav />
    <Routers/>
   
    </>
  )
}

export default Layout