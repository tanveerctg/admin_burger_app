import React, { Component } from 'react';
import classes from './Signin.module.scss';
import {firebase} from '../../firebase/firebase';
import {connect} from 'react-redux';
import Loader from '../../components/UI/Loader/Loader';
import {NavLink,Link} from 'react-router-dom';
import dispatchInitialState from '../../store/Actions/InitialState';

class Signin extends Component {
  state={
    email:'',
    password:'',
    err:false,
    errMsg:'',
    loading:false
  }
  
  emailChangeHandler=(e)=>{
    this.setState({email:e.target.value});
    
  }
  passwordChangeHandler=(e)=>{
    this.setState({password:e.target.value})
  }
  emailAndPasswordHandler=(email,password)=>{
    this.setState({err:false}) 
    this.setState({loading:true})
    firebase.auth().signInWithEmailAndPassword(email, password).
    then(user=>{
      this.setState({err:false})
      this.props.history.push('/dashboard')

    })
    .then(()=>{
      this.setState({loading:false})
    })
    .
    catch(error=>{
      // Handle Errors here.
      this.setState({err:true});
      this.setState({loading:false})
      this.setState({errMsg:error.message});

    });
  }
  render() {
    console.log(typeof this.props.registration)
    let loading=this.state.loading;
    return(
      loading ?<div className={classes.loaderContainer}> <Loader/> </div>:
        <div className={classes.signinContainer}>
              {
                this.props.registration=='on' &&<Link to="/signup"><button className=
                {classes.register}>Register</button></Link>
              }
              <div className={classes.signin}>
                <div className={classes.inputContainer}>  
                  <input 
                    placeholder="Email"
                    type="email"
                    onChange={this.emailChangeHandler}
                  />
                   <label>Email</label>     
                </div>
                <div className={classes.inputContainer}>     
                  <input 
                    placeholder="Password"
                    type="password"
                    onChange={this.passwordChangeHandler}  
                  /> 
                  <label>Password</label> 
                </div>
                <button onClick={()=>this.emailAndPasswordHandler(this.state.email,this.state.password)} className={classes.signInBtn}>Sign In</button>
     
              </div> 
              <h3 className={classes.errMsg} >{this.state.err?this.state.errMsg:null}</h3>
        </div>
     )
    }        
  }

  const mapStateToProps=state=>{
    return{
      registration:state.authReducer.registration
    }
  }

export default connect(mapStateToProps)(Signin);
