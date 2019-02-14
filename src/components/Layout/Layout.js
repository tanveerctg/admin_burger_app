import React from 'react';
import {connect} from 'react-redux';
import classes from './Layout.module.scss';
import {firebase} from '../../firebase/firebase';
import Navbar from '../Navbar/Navbar';
import { withRouter } from "react-router";
const Layout=(props)=>{
  
  return(
    <div className={classes.container}>
      <div className={classes.header}>
           <button onClick={()=>{firebase.auth().signOut().then(()=>{
             props.history.push('/');
           })}}>Sign Out</button>
      </div>
      <main className={classes.content_container}>
        <div className={classes.navbar}><Navbar /></div>
        {props.children}
      </main>
    </div>
  )

  }

let mapStateToProps=(state)=>{
  return{
    check_signup_link:state.authReducer.check_signup_link
  }
}

export default connect(mapStateToProps)(withRouter(Layout));