import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAIv0G-mT4gbNYIlEXXDE-rkkALQpn_PuE',
  authDomain: 'crown-db-a4f4a.firebaseapp.com',
  databaseURL: 'https://crown-db-a4f4a.firebaseio.com',
  projectId: 'crown-db-a4f4a',
  storageBucket: 'crown-db-a4f4a.appspot.com',
  messagingSenderId: '423042719806',
  appId: '1:423042719806:web:dfbdff3cfcecbac1d9b16f',
  measurementId: 'G-KMG4WEPN9Y'
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
