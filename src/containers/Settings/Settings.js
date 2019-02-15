import React, { Component } from 'react'
import classes from './Settings.module.scss';
import {firebase} from '../../firebase/firebase';
import {connect} from 'react-redux';
class Settings extends Component {

  state={
    selectedOption:this.props.registration
  }

  handleOptionChange=(e)=>{

    const setRegistration =async () => {
      this.setState({selectedOption:e.target.value})
    }
    setRegistration().then(()=>{
      firebase.database().ref().child("Registration").update({status:`${this.state.selectedOption}`})
    })
   
  }

  render() {
  
   console.log(this.props.registration)
    return (
      <div className={classes.container}>
          <div className={classes.registrationName}>
            <h3>Registration</h3>
          </div>
          <ul class={classes.tour_group}>
              <li>
                <input
                  type="radio"
                  value="on"
                  checked={this.state.selectedOption === "on"}
                  onChange={this.handleOptionChange}
                  id="on"
                />
                <label for="on">ON</label>           
                <div class={classes.check}></div>
              </li>
                              
              <li>
                <input
                  type="radio"
                  value="off"
                  checked={this.state.selectedOption === "off"}
                  onChange={this.handleOptionChange}
                  id="off"   
                />
                <label for="off">OFF</label>
                <div class={classes.check}><div class={classes.inside}></div></div>
              </li>
          </ul>
        
      </div>
    )
  }
}

const mapStateToProps=state=>{
  return{
    registration:state.authReducer.registration
  }
}

export default connect(mapStateToProps)(Settings);
                          