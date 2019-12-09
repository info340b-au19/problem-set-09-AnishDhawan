import React from 'react';
import 'firebase/database';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'; //using FA 4.7 atm

import App from './App'; //so our app styling is applied second

//import and configure firebase here
var config = {
    apiKey: "AIzaSyD-bWPkJSI1ZTYeERqC95LW7CaNv9LLle8",
    authDomain: "chirper-xifeiw.firebaseapp.com",
    databaseURL: "https://chirper-xifeiw.firebaseio.com",
    projectId: "chirper-xifeiw",
    storageBucket: "chirper-xifeiw.appspot.com",
    messagingSenderId: "53835206346"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
