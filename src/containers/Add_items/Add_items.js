import React, { Component } from 'react'
import classes from './Add_items.module.scss';
import {firebase} from '../../firebase/firebase';
import Loader from '../../components/UI/Loader/Loader';
import {NavLink,Link} from 'react-router-dom';
import Aux from '../../HOC/helper';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

 class Add_items extends Component {
  state={
      name:null,
      'type':null,
      'price':null,
      'description':null,
      'calories':null,
      img:null,
      url:null,
      loading:false,
      wholeLoading:false,
      error:false,
      status:null,
      imgName:''
  }
  nameChangeHandler=(e)=>{
    const regEx=/^[a-z\s?_?]{6,15}$/gi;
    if(e.target.value!==null){
      if(regEx.test(e.target.value)){
        this.setState({name:e.target.value});
        e.target.className=classes.valid;
      }else{
        this.setState({name:null});
        e.target.className=classes.invalid;
      }
    }  
    e.preventDefault();
  }
  typeChangeHandler=(e)=>{
    const regEx=/^[a-z\s?_?]{6,15}$/gi;
    if(e.target.value!==null){
      if(regEx.test(e.target.value)){
        this.setState({type:e.target.value});
        e.target.className=classes.valid;
      }else{
        this.setState({type:null});
        e.target.className=classes.invalid;
      }
    }
  }
  priceChangeHandler=(e)=>{
    const regEx=/^\d{3,4}$/gi;
    if(e.target.value!==null){
      if(regEx.test(e.target.value)){
        this.setState({price:e.target.value});
        e.target.className=classes.valid;
      }else{
        this.setState({pric:null});
        e.target.className=classes.invalid;
      }
    }
    
    e.preventDefault();
  }
  caloriesChangeHandler=(e)=>{
    const regEx=/^\d+$/gi;
    if(e.target.value!==null){
      if(regEx.test(e.target.value)){
        this.setState({calories:e.target.value});
        e.target.className=classes.valid;
      }else{
        this.setState({calories:null});
        e.target.className=classes.invalid;
      }
    }
    e.preventDefault();
  }
  descriptionChangeHandler=(e)=>{
    const regEx=/.+/gi;
    if(e.target.value!==null){
      if(regEx.test(e.target.value)){
        this.setState({description:e.target.value});
        e.target.className=classes.valid;
      }else{
        this.setState({description:null});
        e.target.className=classes.invalid;
      }
    }  
    e.preventDefault();
  }
  handleSubmit=(e)=>{
    const {name,type,description,calories,url,price,status,imgName}=this.state;
  
    if(name && type && price && description && calories && url && status && imgName){ 
      this.setState({wholeLoading:true});
      this.setState({error:false});
      let id = firebase.database().ref().child('All Burgers').push().key;
      let data={id,name,type,description,calories,url,price,status,imgName};

      firebase.database().ref('All Burgers').child(`${id}`).update(data).then(()=>{
        this.setState({wholeLoading:false})
        this.setState({url:null})
        return data;
      }).then((data)=>{
        this.props.dispatch({type:'ADD_ITEM',newItem:data});
        this.props.history.push('/all_Burgers')
      });
    }else{
      this.setState({error:true});
    }
    e.preventDefault();
  }
  fileHandler=(e)=>{ 
    const promise= new Promise((resolve) => {
      resolve(this.setState({img:e.target.files[0]}))
    });
    promise.then(()=>{
      if(!!this.state.img){
        this.setState({imgName:this.state.img.name});
        const uploadTask=firebase.storage().ref(`images/${this.state.img.name}`).put(this.state.img);
         uploadTask.on('state_changed',(snapshot)=>{
        
         this.setState({loading:true})
        },
        (e)=>{console.log(e)},
        ()=>{
          firebase.storage().ref(`images/${this.state.img.name}`).getDownloadURL().then(name=>{
            this.setState({url:name})
            this.setState({loading:false})
          })
        }
      )
      }
    })

  }
  remove=()=>{
    const name=this.state.img.name;
    this.setState({loading:true})
    firebase.storage().ref(`images/${name}`).delete().then(()=>{
      this.setState({loading:false})
      this.setState({url:null})
    });
  }
  handleChange=(e)=>{
    const regEx=/[available|stockOut]/gi;

    if(e.target.value!==null){
      if(regEx.test(e.target.value)){
        this.setState({status:e.target.value});
        e.target.className=classes.valid;

      }else{
        this.setState({status:null});
        e.target.className=classes.invalid;
      }
    }

    e.preventDefault();
 
  }
  render() {
    
    let {wholeLoading}=this.state;
    return (
      wholeLoading ? 

      <Loader/>

      :
      <form onSubmit={this.handleSubmit} className={classes.form}>
          <div style={{position:'relative',width:'90%'}}>
            {!!this.state.loading?
              <Loader />
              :
              <img src={!!this.state.url?this.state.url:`https://via.placeholder.com/300.png/09f/fff` } height='300px' width="100%" style={{marginBottom:'1rem'}}/>
            }
            {this.state.url?<button onClick={this.remove} className={classes.removeBtn}>Remove</button>:null}
          </div>
           { this.state.url?
                null:
             <input type="file" onChange={this.fileHandler} style={{marginBottom:'2rem'}}/>
           }
            <div style={{position:'relative',width:'100%'}}>    
                <input 
                  placeholder="Name"
                  type="text"
                  onChange={this.nameChangeHandler}
                  style={{width:'90%'}}
                />
                <label>Name</label>
                <FontAwesomeIcon
                  icon={['fas','check-circle']}
                  style={{display:'inlineBlock',position:'absolute',right:'0',margin:'3% 0 0 2%'}}
                  size="2x"
                  color="#6DB65B"
                />
                 <FontAwesomeIcon
                  icon={['fas','times-circle']}
                  style={{display:'inlineBlock',position:'absolute',right:'0',margin:'3% 0 0 2%'}}
                  size="2x"
                  color="red"
                />

            </div>
  
            <div style={{position:'relative',width:'100%'}}>    
                <input 
                  placeholder="Type"
                  type="text"
                  onChange={this.typeChangeHandler}
                  style={{width:'90%'}}
                />
                <label>Type</label>
                <FontAwesomeIcon
                  icon={['fas','check-circle']}
                  style={{display:'inlineBlock',position:'absolute',right:'0',margin:'3% 0 0 2%'}}
                  size="2x"
                  color="#6DB65B"
                />
                 <FontAwesomeIcon
                  icon={['fas','times-circle']}
                  style={{display:'inlineBlock',position:'absolute',right:'0',margin:'3% 0 0 2%'}}
                  size="2x"
                  color="red"
                />
            </div>

            <div style={{position:'relative',width:'100%'}}>    
              <input 
                placeholder="Price"
                type="text"
                onChange={this.priceChangeHandler} 
                style={{width:'90%'}} 
              />
              <label>price</label>
              <FontAwesomeIcon
                  icon={['fas','check-circle']}
                  style={{display:'inlineBlock',position:'absolute',right:'0',margin:'3% 0 0 2%'}}
                  size="2x"
                  color="#6DB65B"
                />
                 <FontAwesomeIcon
                  icon={['fas','times-circle']}
                  style={{display:'inlineBlock',position:'absolute',right:'0',margin:'3% 0 0 2%'}}
                  size="2x"
                  color="red"
                />
            </div>
            <div style={{position:'relative',width:'90%'}}> 
              <select onChange={this.handleChange} >
                {!this.state.status?
                  <option default value="">Status</option>
                  :null
                }
                <option value="available" >Available</option>
                <option value="stockOut" >Stock Out</option>
              </select>
              {!this.state.status?
                <label style={{transform: 'translateY(-100%)',opacity:'0',transition: 'all .3s(-390%)'}}>Status</label>
               :<label style={{opacity:'1',transform: 'translateY(-390%)'}}>Status</label>
              } 
              <FontAwesomeIcon
                  icon={['fas','check-circle']}
                  style={{display:'inlineBlock',position:'absolute',right:'-2.8rem',margin:'3% 0 0 2%'}}
                  size="2x"
                  color="#6DB65B"
                />
                 <FontAwesomeIcon
                  icon={['fas','times-circle']}
                  style={{display:'inlineBlock',position:'absolute',right:'-2.8rem',margin:'3% 0 0 2%'}}
                  size="2x"
                  color="red"
                />
            </div>
            <div style={{position:'relative',width:'100%'}}>    
              <input 
                placeholder="Calories"
                type="text"
                onChange={this.caloriesChangeHandler}  
                style={{width:'90%'}}
              />
              <label>Calories</label>
              <FontAwesomeIcon
                  icon={['fas','check-circle']}
                  style={{display:'inlineBlock',position:'absolute',right:'0',margin:'3% 0 0 2%'}}
                  size="2x"
                  color="#6DB65B"
                />
                 <FontAwesomeIcon
                  icon={['fas','times-circle']}
                  style={{display:'inlineBlock',position:'absolute',right:'0',margin:'3% 0 0 2%'}}
                  size="2x"
                  color="red"
                />
            </div>
           
            <div style={{position:'relative',width:'100%'}}>    
             <textarea 
                placeholder="Description"
                type="text"
                onChange={this.descriptionChangeHandler}  
                rows="4"  
                style={{width:'90%'}}  
              />
              <label>Description</label>
              <FontAwesomeIcon
                  icon={['fas','check-circle']}
                  style={{display:'inlineBlock',position:'absolute',right:'0',margin:'3% 0 0 2%'}}
                  size="2x"
                  color="#6DB65B"
                />
                 <FontAwesomeIcon
                  icon={['fas','times-circle']}
                  style={{display:'inlineBlock',position:'absolute',right:'0',margin:'3% 0 0 2%'}}
                  size="2x"
                  color="red"
                />
            </div>
     
            <input type="submit" value="Add Item" style={{width:'90%'}}/>
            {
              this.state.error && <p style={{background:'red',color:'white',fontSize:'1.3rem',padding:'4px',borderRadius:'3px',marginTop:'1rem'}}>Please fill in all fields</p>
            } 
      </form>
    )
  }
}
export default connect()(Add_items);