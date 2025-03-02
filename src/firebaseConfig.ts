// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC4SMYdWcsF7UNY8Ko3G0sILL0sniulquo',
  authDomain: 'balasteps-14d3c.firebaseapp.com',
  projectId: 'balasteps-14d3c',
  storageBucket: 'balasteps-14d3c.appspot.com',
  messagingSenderId: '496355372779',
  appId: '1:496355372779:web:9bca7b6022cae01542d8ae',
  measurementId: 'G-0RPYWLLLL6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);  // Explicitly define type as Auth

export { auth, app };
