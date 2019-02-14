import {firebase} from '../../firebase/firebase';
const remove=(id)=>({
  type:'CANCEL_ORDER',
  id
})
const cancelOrder=(UID,id)=>{
  return dispatch=>{
    firebase.database().ref(`orders/${UID}/${id}`).remove().then(()=>{
      dispatch(remove(id))
    })
  }
}
export default cancelOrder;