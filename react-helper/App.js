import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './components/Home';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Beginner from './components/Beginner.js';
import Intermediate from './components/Intermediate.js';
import Advanced from './components/Advanced';
import FinalProject from './components/Project';

const firebaseConfig = {
  apiKey: 'AIzaSyDom-5K_X4Bd5wkJeBA1IMOq1-GHhXIzxI',
  authDomain: 'react-helper.firebaseapp.com',
  databaseURL: 'https://react-helper.firebaseio.com',
  projectId: 'react-helper',
  storageBucket: 'react-helper.appspot.com',
  messagingSenderId: '708335545522',
  appId: '1:708335545522:web:605746f66a3bee21a7adab',
  measurementId: 'G-NZ7CHP5N2L'
};

const firebase = app.initializeApp(firebaseConfig);
const dataBase = firebase.firestore();
const auth = firebase.auth();

const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LogIn,
    Signup: SignUp,
    userProfile: Profile,
    LevelB: Beginner,
    LevelI: Intermediate,
    LevelA: Advanced,
    Project: FinalProject
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
);

export default createAppContainer(AppNavigator);
export {
  firebase,
  dataBase,
  auth,
  doSignInWithEmailAndPassword,
  doCreateUserWithEmailAndPassword
};
