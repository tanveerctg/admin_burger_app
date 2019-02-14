import {firebase} from '../../firebase/firebase';
import moment from 'moment';
export const getAllOrders=(id)=>{
  return dispatch =>{
    // var starCountRef = firebase.database().ref(`orders/${id}`);
    // starCountRef.once('value',(snapshot)=>{
    //   let containerOrders=[];
    //   for(let order in snapshot.val()){
    //     containerOrders.push({id:order,...snapshot.val()[order]})  
    //   }
    //   dispatch({type:'GET_ALL_ORDERS',items:containerOrders})
    // })


    fetch(`https://testing-bc79f.firebaseio.com/orders/${id}.json`)
    .then(res=>res.json())
    .then(data=>{
      let containerOrders=[];
      for(let key in data){
        const info={
          id:key,
          ...data[key]
        }
        containerOrders.push(info);
      }
      containerOrders.sort((a,b)=>(
        a.cancelOrderTime<b.cancelOrderTime?1:-1
      )
      )
      dispatch({type:'GET_ALL_ORDERS',items:containerOrders})
    })
  }
}
