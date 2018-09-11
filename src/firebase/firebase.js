//import * as firebase from 'firebase';
import firebase from 'firebase/app'
import 'firebase/auth'

const prodConfig = {
  apiKey: "AIzaSyCvdYTgdU-6DhV10i7eW7xS68IU2f3ioFo",
    authDomain: "myapp-a124d.firebaseapp.com",
    databaseURL: "https://myapp-a124d.firebaseio.com",
    projectId: "myapp-a124d",
    storageBucket: "myapp-a124d.appspot.com",
    messagingSenderId: "191396994975"
}

const devConfig = {
  apiKey: "AIzaSyCvdYTgdU-6DhV10i7eW7xS68IU2f3ioFo",
    authDomain: "myapp-a124d.firebaseapp.com",
    databaseURL: "https://myapp-a124d.firebaseio.com",
    projectId: "myapp-a124d",
    storageBucket: "myapp-a124d.appspot.com",
    messagingSenderId: "191396994975"
}

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {auth};
