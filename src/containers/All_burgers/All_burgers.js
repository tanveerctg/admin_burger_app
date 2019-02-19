import React, { Component } from 'react'
import classes from './All_burgers.module.scss';
import {connect} from 'react-redux';
import Burger from './Burger/Burger';
import {firebase} from '../../firebase/firebase';
import Loader from '../../components/UI/Loader/Loader';


class All_burgers extends Component {

  state={
    selectAllCheckBox:false,
    loading:false,
    imgName:[],
    enableRmv:false
  }
  enableRemoveBtn=()=>{

    let checker;

    document.querySelectorAll(`input[value]`).forEach((each,index)=>{
      if(each.checked){
        checker=true;
      } 
    })
  
    if(checker){
      this.setState({enableRmv:true})

    }else{
      this.setState({enableRmv:false})
    }
  }
  allItems=()=>{
    return this.props.all_burgers.map((itm,index)=><Burger key={itm.id} {...itm} history={this.props.history} all_burger={this.props.all_burgers} index={index}  id={itm.id} enableRemoveBtn={this.enableRemoveBtn}
    disableRemoveBtn={this.disableRemoveBtn}
    imgName={itm.imgName}
    />)
  }
  selectAllCheckBox=()=>{
    let currentPosition=this.state.selectAllCheckBox;

    new Promise(resolve=>{
      resolve(this.setState({selectAllCheckBox:!currentPosition}))
    }).then(()=>{
      if(this.state.selectAllCheckBox){
        document.querySelectorAll(`input[value]`).forEach(itm=>{
          itm.checked=true;
          console.log(itm.id)
        })
      }else{
        document.querySelectorAll(`input[value]`).forEach(itm=>{
          itm.checked=false;
        })
        this.setState({enableRmv:false})
      }
    })
   


  }
  removeAll=()=>{

    const remove =async () =>{
      this.setState({loading:true});
      let allImages=[];
      this.props.all_burgers.forEach(itm=>{
        allImages.push(itm.imgName);
      })
      firebase.database().ref('All Burgers').remove().then(()=>{
        allImages.forEach((imgName)=>{
          firebase.storage().ref(`images/${imgName}`).delete();
        })
      })
    }
    remove().then(()=>{
      this.props.dispatch({type:'REMOVE_ALL'});
      this.setState({loading:false});
      this.setState({selectAllCheckBox:false})
    })


  }
  removeSelectedItm=()=>{

    const remove =async () =>{
     
      this.setState({loading:true});
      let arrOfId=[];
      let arrOfImgName=[];
  
      document.querySelectorAll(`input[value]`).forEach((each,index)=>{
        if(each.checked){
          arrOfId.push(each.id)
          arrOfImgName.push(each.getAttribute('imgname'));
        } 
      })
      arrOfId.forEach(id=>{
         firebase.database().ref(`All Burgers/${id}`).remove();
      })

      arrOfImgName.forEach((imgName)=>{
        firebase.storage().ref(`images/${imgName}`).delete();
      })
      return arrOfId;
    }
    remove().then((arrOfId)=>{
        this.props.dispatch({type:'REMOVE_SELECTED_ITEM',items:arrOfId});
        this.setState({loading:false});
        this.setState({enableRmv:false})
    })
  }
  
  render() {

    let {loading}=this.state;

    return(
        loading ?
          <Loader />
          :
        <div style={{padding:'7px'}}>
                  {this.state.selectAllCheckBox && this.props.all_burgers.length>0?<button onClick={this.removeAll} style={{background:'#ff8162',color:'white',border:'none',width:'100%',marginBottom:'1rem',padding:'10px',fontWeight:'700',fontSize:'1.1rem',cursor:'pointer'}} >Remove All</button>:null}
                  
                  {this.state.enableRmv && !this.state.selectAllCheckBox?<button style={{background:'#ff8162',color:'white',border:'none',width:'100%',marginBottom:'1rem',padding:'10px',fontWeight:'700',fontSize:'1.1rem',cursor:'pointer'}} onClick={this.removeSelectedItm}>Remove</button>:null}
          <table>
              <tbody>
                <tr style={{background:'#c7f2e3',height:'50px',color:'black'}}>
                  <th><input type="checkbox" value="check_all_box" onClick={this.selectAllCheckBox} id='selectAll'/>
                  </th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th>Calories</th>

                </tr>
                </tbody>
                {this.allItems()}
          </table>
        </div>
    )
  }
}


const mapStateToProps=state=>{
  return{
    all_burgers:state.burgerReducer
  }
}
export default connect(mapStateToProps)(All_burgers);

// const a='2';
// const All_burgers=(props)=>{

//   return(
//     <div style={{padding:'20px'}}>
//       <table>
//         <tbody>
//           <tr style={{background:'#837dff',height:'50px',color:'white'}}>
//             <th><input type="checkbox" value="check_all_box"/></th>
//             <th>Name</th>
//             <th>Image</th>
//             <th>Price</th>
//             <th>Status</th>
//             <th>Description</th>
//             <th>Calories</th>
//             {a!==''?<th><button>Remove</button></th>:null}
//           </tr>
//           </tbody>
//         {
//           props.all_burgers.map(itm=><Burger key={itm.id} {...itm} history={props.history} all_burger={props.all_burgers}/>)
  
//         }
//     </table>
//   </div>
//   )
// }
