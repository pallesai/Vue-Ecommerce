import firebase from 'firebase';
import 'firebase/storage';

require('firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyBP-ESNyU4T4SBkxiaVTH-OkQCUqlIeZTU",
    authDomain: "vueapp-74449.firebaseapp.com",
    databaseURL: "https://vueapp-74449.firebaseio.com/",
    projectId: "vueapp-74449",
    storageBucket: "gs://vueapp-74449.appspot.com",
    messagingSenderId: "181023361599",
    appId: "1:83007353261:web:4eb3e335d91553de0ef124",
    measurementId: "G-DKFM1SR1TV"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

export default firebase;
export {db};
