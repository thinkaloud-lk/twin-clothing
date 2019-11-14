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

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

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

  export const convertCollectionSnaphotToMap = (collection) => {
      const collectionData = collection.docs.map(doc => {
          const {title, items} = doc.data()
          return {
                  items,
                  id: doc.id,
                  title,
                  routeName: encodeURI(title.toLowerCase())
              }
      })
      return collectionData.reduce((acc, col) => {
          acc[col.title.toLowerCase()]=col;
          return acc;
      },{})
  }

  export const addColectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey)
    const batch=firestore.batch();
    
        objectsToAdd.forEach(item => {
            const docRef=collectionRef.doc();
            batch.set(docRef, item)
        })
       return await batch.commit()
  }

  export const getCurrentUser = () => {
      return new Promise((resolve, reject) => {
            const unsubscribe = auth.onAuthStateChanged(userAuth => {
                unsubscribe();
                resolve(userAuth);
            }, reject)
      })
  }

  export default firebase;