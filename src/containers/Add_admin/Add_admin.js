import React, { Component } from 'react';
import classes from './Add_admin.module.scss';
import {firebase} from '../../firebase/firebase';
import {connect} from 'react-redux';
import Loader from '../../components/UI/Loader/Loader';


class Signup extends Component {
  state={
    email:'',
    password:'',
    err:false,
    errMsg:'',
    loading:false
  }


  emailChangeHandler=(e)=>{
    this.setState({email:e.target.value})
  }
  passwordChangeHandler=(e)=>{
    this.setState({password:e.target.value})
  }
  emailAndPasswordHandler=(email,password)=>{
    this.setState({loading:true});
    this.setState({errMsg:''});
    firebase.auth().createUserWithEmailAndPassword(email,password).then((data)=>{
      this.setState({loading:false});
      this.setState({errMsg:''});
    })
    .catch(err=>{
      this.setState({err:true});
      this.setState({loading:false})
      this.setState({errMsg:err.message});
    });
  }
  render() {
    let loading=this.state.loading;
    
    return (
      loading ?<div className={classes.loaderContainer}> <Loader/> </div>:
            <div className={classes.signinContainer}>
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
                <button onClick={()=>this.emailAndPasswordHandler(this.state.email,this.state.password)} className={classes.signInBtn}>Sign Up</button>
     
              </div> 
              <h3 className={classes.errMsg} >{this.state.err?this.state.errMsg:null}</h3>
        </div>
    )
  }
}

export default connect()(Signup);