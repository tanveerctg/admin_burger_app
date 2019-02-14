export const signIn=(id)=>{
  return{
    type:'SIGN_IN',
    id
  }
};
export const signOut=()=>{
  return{
    type:'SIGN_OUT'
  }
};