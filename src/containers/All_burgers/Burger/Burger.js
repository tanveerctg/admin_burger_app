
import {NavLink,Link} from 'react-router-dom';
import React, { Component } from 'react';
import classes from './Burger.module.scss';

let first;
let last;


export default class Burger extends Component {
  state={
    removeid:[],
    checkedOrNot:false
  }
  link=()=>{
    this.props.history.push({pathname:`edit_burger/${this.props.id}`,state:`${this.props.all_burger}`})
  }


  eachChildHandler=(e)=>{

  
    const index=Number(e.target.value);

    let checker=true;
    if(e.shiftKey && e.target.checked){
      
      checker=false;
      last=index;   
      let starting;
      let ending;

      if(first>last){
        starting=last; 
        ending=first;
      }else{
        starting=first; 
        ending=last;
      }
      for(let i=starting;i<=ending;i++){
       document.querySelector(`input[value='${i}']`).checked=true;   
      }
      this.props.enableRemoveBtn();

    }
    if(checker){
      first=index;
      this.props.enableRemoveBtn();

    }
  }
  render() {

    const {id,checked,imgName}=this.props;
    return (
      <tbody>
        <tr  className={classes.row}>
        <td><input type="checkbox" value={this.props.index} onClick={this.eachChildHandler} id={id} imgname={imgName}/></td>
        <td onClick={this.link}>{this.props.name}</td>
        <td width='100px' height='100px'><img src={`${this.props.url}`} height='100%' width='100%' onClick={this.link}/></td>
        <td onClick={this.link}>{this.props.price}</td>
        <td onClick={this.link}>{this.props.status}</td>
        <td onClick={this.link} >{this.props.description.length>10?`${this.props.description.slice(0,15)}...`:this.props.description}</td>
        <td onClick={this.link}>{this.props.calories}</td>
        {checked || this.state.first ?<td></td>:null}
      </tr>
    </tbody>
    )
  }
}

// const Burger=({name,url,price,status,description,calories,id})=>{
//   link=()=>{
//     console.log('ok')
//   }
//   return(
//       <tbody>
//         <tr >
//           <td><input type="checkbox" value='as'/></td>
//           <td>{name}</td>
//           <td width='100px' height='100px'><img src={`${url}`} height='100%' width='100%'/></td>
//           <td>{price}</td>
//           <td>{status}</td>
//           <td >{description.length>10?`${description.slice(0,15)}...`:description}</td>
//           <td>{calories}</td>
//         </tr>
//       </tbody>
//   )
// }

// export default Burger;