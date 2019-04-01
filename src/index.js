import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter} from "react-router-dom";
import { createStore,applyMiddleware, compose,combineReducers } from 'redux';
import { Provider } from 'react-redux'
import burgerReducer from './store/burgerReducer';
import thunk from 'redux-thunk';
import authReducer from './store/authReducer';
import {firebase} from './firebase/firebase';
import dispatchInitialState from './store/Actions/InitialState';
import {signIn,signOut} from './store/Actions/auth';
import { faCode, faHighlighter,faMoneyBill ,faEnvelope, faThumbsUp,faCheckCircle,faTimes,faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoogle} from "@fortawesome/free-brands-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(
  faMoneyBill,
  faCode,
  faHighlighter,
  faEnvelope,
  faFacebook,
  faGoogle,
  faThumbsUp,
  faCheckCircle,
  faTimes,
  faTimesCircle
  // more icons go here
);

const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer={burgerReducer:burgerReducer,authReducer:authReducer}
const store=createStore(combineReducers(rootReducer),composeEnhancer(applyMiddleware(thunk)));
                 
const app= <Provider store={store}>
            <BrowserRouter>
                  <App />  
            </BrowserRouter>  
          </Provider>
let checker=true;
      firebase.auth().onAuthStateChanged(user=> {  
         if (user) {   
            store.dispatch(dispatchInitialState()); 
            store.dispatch(signIn(user.uid));
            if(checker){
              ReactDOM.render(app, document.getElementById('root'));
              checker=false;
            }
         }else{
            store.dispatch(signOut());
            if(checker){
                  ReactDOM.render(app, document.getElementById('root'));
                  checker=false;
            }
      }
      });

      firebase.database().ref().child("Registration").on('value',(snap)=>{
            store.dispatch({type:'REGISTRATION',registration:`${snap.val().status}`});
      })

      firebase.database().ref().child("orders").on('value',(snap)=>{

            let info=[];
            for(let user in snap.val()){
                  for(let order in snap.val()[user]){
                        info.push(snap.val()[user][order])
                  }  
            }
            console.log(info);
      })

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

serviceWorker.unregister();
export default store;