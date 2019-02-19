import React from 'react';
import {connect} from 'react-redux';
import classes from './Layout.module.scss';
import {firebase} from '../../firebase/firebase';
import Navbar from '../Navbar/Navbar';
import { withRouter } from "react-router";
import { Scrollbars } from 'react-custom-scrollbars';
const Layout=(props)=>{
  
  return(
    <Scrollbars style={{ width: '100vw', height: '100vh' }} renderThumbVertical={({ style, ...props }) =>
    <div {...props} style={{ ...style, backgroundColor: 'black',width:'4',opacity: '0.5'}}/>
}>
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
    </Scrollbars>
  )

  }

let mapStateToProps=(state)=>{
  return{
    check_signup_link:state.authReducer.check_signup_link
  }
}

export default connect(mapStateToProps)(withRouter(Layout));