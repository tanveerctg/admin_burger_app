
const initialState=[]

const burgerReducer=(state=initialState,action)=>{
  switch(action.type){
    case 'ADD_ITEM':{
      console.log(state,action.newItem)
      return [...state,action.newItem]
    }
    case 'REMOVE_ALL':{
      return [];
    }
    case 'REMOVE_SELECTED_ITEM':{
      const removeIds=action.items;
      const currentsItems=[...state];
      let result= currentsItems.filter(item=>{
        if(removeIds.indexOf(item.id)>=0){
          return false;
        }else{
          return true;
        }
      })
      return result;
    }
    case 'INITIAL_STATE':{
      return [...action.items]
    }
    case 'EDIT_ITEM':{
     
      return state.map(itm=>{
        if(itm.id===action.updatedItem.id){
          return action.updatedItem;
        }else{
          console.log(itm)
          return itm;
        }
      })
    }
    // case 'GET_ALL_ORDERS':{
    //   return{
    //     ...initialState,
    //     orders:action.items
    //   }
    // }
    // case 'CANCEL_ORDER':{
    //   return{
    //     ...state,
    //     orders:state.orders.filter(item=>item.id!==action.id)
    //   }

    // }
    default:return state;

  }
}

export default burgerReducer;