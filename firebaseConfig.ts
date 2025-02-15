import { initializeApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBJFyjkhw44awFtqUlk4w3BLaLwBlHrauY',
  authDomain: 'favortrader-8d9ad.firebaseapp.com',
  projectId: 'favortrader-8d9ad',
  storageBucket: 'favortrader-8d9ad.firebasestorage.app',
  messagingSenderId: '846722705258',
  appId: '1:846722705258:web:266f3d6c42f9dfd84ea713',
  measurementId: 'G-XFPENE2FL1',
};

const app = initializeApp(firebaseConfig);

// ✅ Fix auth persistence issue
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
