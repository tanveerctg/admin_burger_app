import  firebase from 'firebase';
var config = {
  apiKey: "AIzaSyC4dtOMvdVw_D59ZSSlJ7qN14ADVn9T0Vg",
  authDomain: "admin-testing-burger-project.firebaseapp.com",
  databaseURL: "https://admin-testing-burger-project.firebaseio.com",
  projectId: "admin-testing-burger-project",
  storageBucket: "admin-testing-burger-project.appspot.com",
  messagingSenderId: "365165122762"
};
firebase.initializeApp(config);

const googleProvider = new firebase.auth.GoogleAuthProvider();

const fbProvider=new firebase.auth.FacebookAuthProvider();
const database=firebase.database();

export {firebase,googleProvider,database,fbProvider};