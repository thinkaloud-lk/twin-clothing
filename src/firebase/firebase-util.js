import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDaF49_XIXhI0qcIDem5fcpmae4K_us8h0",
    authDomain: "twin-clothing.firebaseapp.com",
    databaseURL: "https://twin-clothing.firebaseio.com",
    projectId: "twin-clothing",
    storageBucket: "twin-clothing.appspot.com",
    messagingSenderId: "580207583005",
    appId: "1:580207583005:web:c8c7e90b3465d73a298bf4",
    measurementId: "G-S3V0S7KHZS"
  };

  firebase.initializeApp(firebaseConfig);
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export const createUserProfileDocument = async ( user, additionalData ) => {
      if(!user) return;
      const userRef=firestore.doc(`users/${user.uid}`);
      const snapshot = await userRef.get();
    
      if(!snapshot.exists){
        const { displayName, email } = user;
        try {
           await userRef.set({
                displayName,
                email,
                createdAt: new Date(),
                ...additionalData
            });

        } catch(error) {
            console.log('Error creating user', error);
        }
      }
      return userRef;
  }

  export default firebase;