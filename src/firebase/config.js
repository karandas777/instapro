import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "postbox-2d2e5.firebaseapp.com",
  databaseURL: `${process.env.REACT_APP_FIREBASE_DB_URL}`,
  projectId: "postbox-2d2e5",
  storageBucket: "postbox-2d2e5.appspot.com",
  messagingSenderId: "419363021781",
  appId: "1:419363021781:web:df41e9a640581be0e0535c"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export default firebase.storage().ref();
// export { fireStorage };
