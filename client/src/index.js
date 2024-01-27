import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'firebase/firestore'
import firebase from 'firebase/app'
import firebaseConfig from './firebaseconfig'

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


