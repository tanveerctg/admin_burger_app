import {firebase} from '../../firebase/firebase';

const initialState=(items)=>{
  return{
    type:'INITIAL_STATE',
    items
  }
}

const dispatchInitialState=()=>{
  return (dispatch,getState)=>{
     firebase.database().ref('All Burgers').once('value').then(snap=>{
       if(snap.val()!==null){
        let keys=Object.keys(snap.val());
        let allItem=keys.reduce((arr,itm)=>{
            return arr.concat(snap.val()[`${itm}`]);
        },[])
        return allItem;
       }  
    }).then(items=>{
      if(!!items){
        dispatch(initialState(items))
      }
   
    })
  }
}

export default dispatchInitialState;
