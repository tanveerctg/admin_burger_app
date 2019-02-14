import React from 'react';
import classes from './Navbar.module.scss';
import Aux from '../../HOC/helper';
import { NavLink } from 'react-router-dom'
const Navbar=()=>{
  return(
    <Aux>
       <NavLink to="/dashboard" className={classes.navLink}  activeStyle={{
          fontWeight: "bold",
          color: "yellow",
          textDecoration: 'none'
        }}>DASHBOARD</NavLink>


        <NavLink to="/add_item" className={classes.navLink}  activeStyle={{
           fontWeight: "bold",
          color: "yellow",
          textDecoration: 'none'
          }}>Add Item</NavLink>


        <NavLink to="/add_admin" className={classes.navLink}  activeStyle={{
         fontWeight: "bold",
          color: "yellow",
          textDecoration: 'none'
        }}>Add Admin</NavLink>

         <NavLink to="/all_Burgers" className={classes.navLink}  activeStyle={{
        fontWeight: "bold",
          color: "yellow",
          textDecoration: 'none'
        }}>All Burgers</NavLink>
    </Aux>
  )
}
export default Navbar;