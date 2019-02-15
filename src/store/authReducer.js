
let initialState={
  id:null,
  registration:null
};
const authReducer=(state=initialState,action)=>{
  switch(action.type){
    case 'SIGN_IN':{
      return{
        ...state,
        id:action.id
      }
    }
    case 'SIGN_OUT':{
      return {
        ...state,
        id:null
      }
    }
    case 'REGISTRATION':{
      return {
        ...state,
        registration:action.registration
      }
    }

    default:return state;
}
}
export default authReducer;