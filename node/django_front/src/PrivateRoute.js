// https://stackoverflow.com/questions/47476186/when-user-is-not-logged-in-redirect-to-login-reactjs
// https://stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou

// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React, { useContext, useEffect } from 'react'
import AuthService from './components/SignInForFirebase'
import { Navigate, Route, Outlet } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {initializeApp} from "firebase/app"
import { LatLong } from './App'
import Loading from './components/Loading'

const firebaseConfig = {
        apiKey: "AIzaSyD0IRBNoFdBnk_O8cQCie8hKsEVKd4cmLE",
        authDomain: "vendormachineappforauth.firebaseapp.com",
        projectId: "vendormachineappforauth",
        storageBucket: "vendormachineappforauth.appspot.com",
        messagingSenderId: "361286918531",
        appId: "1:361286918531:web:53783a8b010ba99e0b96b6",
        measurementId: "G-CWDBX6XRH1"
    };
initializeApp(firebaseConfig);
const auth = getAuth();

const PrivateRoute = () => {

    const checkLogInUser = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
                SetLoginuser({
                    uid: user.uid,
                    isLoggedIn: true,
                    isLoading: false
                })
                // ...
            } else {
                // User is signed out
                // ...
                SetLoginuser({
                    uid: "",
                    isLoggedIn: false,
                    isLoading: false
                })
            }
        });
    }
    const {loginuser, SetLoginuser} = useContext(LatLong)

    useEffect(() => {
        checkLogInUser()
    },[])

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return loginuser.isLoggedIn ? <Outlet /> : (loginuser.isLoading ? <Loading/> : <Navigate to="/signin" />);
}

export default PrivateRoute