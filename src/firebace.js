import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDF7sDeC0YYOkSy8QzDUil80KPLRde2qNY",
    authDomain: "react-todo-14f94.firebaseapp.com",
    projectId: "react-todo-14f94",
    storageBucket: "react-todo-14f94.appspot.com",
    messagingSenderId: "451302319669",
    appId: "1:451302319669:web:95cbb3b9750a194ba6337c"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  export { db };