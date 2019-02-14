import React, { Component } from 'react'
import classes from './Edit_burger.module.scss';
import {firebase} from '../../firebase/firebase';
import Loader from '../../components/UI/Loader/Loader';
import {connect} from 'react-redux';
import { reject } from 'rsvp';

 class Edit_burger extends Component {
  state={
      name:null,
      type:null,
      price:null,
      description:null,
      calories:null,
      img:null,
      url:null,
      loading:false,
      wholeLoading:false,
      error:false,
      status:null,
      id:'',
      imgName:''
  }
  // componentDidMount=()=>{
  // if(!!this.props.burger){
  //   console.log(this.props.burger)
    
  // }else{
  //   setTimeout(()=>{console.log(this.props.all_burgers)},200)
    
  // }

  // }
  nameChangeHandler=(e)=>{

    this.setState({name:e.target.value});
    e.preventDefault();
  }
  typeChangeHandler=(e)=>{

    this.setState({type:e.target.value});
    e.preventDefault();
  }
  priceChangeHandler=(e)=>{
    
    this.setState({price:e.target.value});
    e.preventDefault();
  }
  caloriesChangeHandler=(e)=>{

    this.setState({calories:e.target.value});
    e.preventDefault();
  }
  descriptionChangeHandler=(e)=>{
  
    this.setState({description:e.target.value});
    e.preventDefault();
  }
  handleSubmit=(e)=>{
    const {name,type,description,calories,url,price,status,id,imgName}=this.state;

    if(name && type && price && description && calories && url && status && imgName){ 
      this.setState({wholeLoading:true});
      this.setState({error:false});
  
      let data={id,name,type,description,calories,url,price,status,imgName};

      firebase.database().ref('All Burgers').child(`${id}`).update(data).then(()=>{
        this.props.dispatch({type:'EDIT_ITEM',updatedItem:data})
        this.setState({url:null})
      }).then(()=>{
        this.setState({wholeLoading:false})
        this.props.history.push('/all_Burgers')
      })
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
      if(this.state.img.name !== this.state.imgName){
        firebase.storage().ref(`images/${this.state.imgName}`).delete();
        const uploadTask=firebase.storage().ref(`images/${this.state.img.name}`).put(this.state.img);
         uploadTask.on('state_changed',(snapshot)=>{
         this.setState({loading:true});
         
        },
        (e)=>{console.log(e)},
        ()=>{
          firebase.storage().ref(`images/${this.state.img.name}`).getDownloadURL().then(name=>{
            this.setState({url:name})
            this.setState({loading:false})
            this.setState({imgName:this.state.img.name})
          })
        }
      )
      }
    })

  }
  remove=()=>{
    const name=this.state.imgName;
    this.setState({loading:true})
    firebase.storage().ref(`images/${name}`).delete().then(()=>{
      this.setState({loading:false})
      this.setState({url:null})
    });
  }
  handleChange=(e)=>{
    this.setState({status:e.target.value});
    e.preventDefault();
  }
  componentDidMount(){
    if(this.props.burger){
      const {calories,description,name,price,status,type,url,id,imgName}=this.props.burger;
      this.setState({calories,description,name,price,status,type,url,id,imgName});
    }else{
      this.props.history.push('/all_Burgers')
    }
  }

  render() {
    console.log(this.state)
    let {wholeLoading}=this.state;
    return (
      wholeLoading ? 

      <Loader/>

      :
      <form onSubmit={this.handleSubmit} className={classes.form}>
          <div style={{position:'relative'}}>
            {!!this.state.loading?
              <Loader />
              :
              <img src={!!this.state.url?this.state.url:`https://via.placeholder.com/300.png/09f/fff` } height='300px' width="100%" style={{marginBottom:'1rem'}}/>
            }
            {!this.state.url?<button onClick={this.remove} className={classes.removeBtn}>Remove</button>:null}
          </div>
           { this.state.url?
            <input type="file" onChange={this.fileHandler} style={{marginBottom:'2rem'}}/>:
             null
           }
            <div>    
                <input 
                  placeholder="Name"
                  type="text"
                  onChange={this.nameChangeHandler}
                  value={this.state.name?this.state.name:''}
                />
                <label>Name</label>
            </div>
  
            <div>    
                <input 
                  placeholder="Type"
                  type="text"
                  onChange={this.typeChangeHandler}
                  value={this.state.type?this.state.type:''}
                />
                <label>Type</label>
            </div>

            <div>    
              <input 
                placeholder="Price"
                type="number"
                onChange={this.priceChangeHandler}  
                value={this.state.price?this.state.price:''}
              />
              <label>price</label>
            </div>
            <div > 
              <select onChange={this.handleChange} >
                {!this.state.status?
                  <option default value="">Status</option>
                  :null
                }
                <option value="available" >Available</option>
                <option value="stockOut" >Stock Out</option>
              </select>
              {!this.state.status?
                  null
               :<label style={{opacity:'1',transform: 'translateY(-390%)'}}>Status</label>
              } 
            </div>
            <div>    
              <input 
                placeholder="Calories"
                type="number"
                onChange={this.caloriesChangeHandler}  
                value={this.state.calories?this.state.calories:''}
  
              />
              <label>Calories</label>
            </div>
           
            <div>    
             <textarea 
                placeholder="Description"
                type="text"
                onChange={this.descriptionChangeHandler}  
                rows="4"  
                value={this.state.description?this.state.description:''}  
              />
              <label>Description</label>
            </div>
     
            <input type="submit" value="Order" />
            {
              this.state.error && <p style={{background:'red',color:'white',fontSize:'1.3rem',padding:'4px',borderRadius:'3px',marginTop:'1rem'}}>Please fill in all fields</p>
            } 
      </form>
    )
  }
}
const mapStateToProps=(state,props)=>{
  return{
    burger:state.burgerReducer.find(itm=>itm.id===props.match.params.id),
   
  }
}

export default connect(mapStateToProps)(Edit_burger);