import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCQMIm1NmcOmhFh3pK_5Vpx3afALIR7mEA",
    authDomain: "vuefire-todo-vuetify.firebaseapp.com",
    projectId: "vuefire-todo-vuetify",
    storageBucket: "vuefire-todo-vuetify.appspot.com",
    messagingSenderId: "419351697090",
    appId: "1:419351697090:web:b283ebbcab9ad66a8b4d5b"
};

// Initialize Firebase
export const db = firebase.initializeApp(firebaseConfig).firestore();