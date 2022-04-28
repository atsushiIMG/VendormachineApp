import { Button, Grid,Box } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {initializeApp} from "firebase/app"
import Avatar from '@mui/material/Avatar';
import { useState,useContext } from "react";
import { LatLong } from "../App";
import { useNavigate } from "react-router-dom";

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
const provider = new GoogleAuthProvider();
const signIn = (SetLoginuser) => {signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log("signin...")
    SetLoginuser({
        uid: user.uid,
        isLoggedIn: true,
        isLoading: false
    })
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

const SignInForFirebase = () => {
    const {loginuser, SetLoginuser} = useContext(LatLong)
    console.log(loginuser)
    const navigate = useNavigate()
    return (
        <div>
        {!loginuser.isLoggedIn && (
          <Grid container alignItems='center' justifyContent='center' direction="column">
            <Grid item xs={12}>
              <p>登録・更新はログインが必要です</p>
            </Grid>
            <Grid item xs={12}>
              <Button 
              variant="outlined"
              color="inherit"
              startIcon={<Avatar src={'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'}  />}
              style={{textTransform: 'capitalize', backgroundColor: "white"}}
                onClick={() => signIn(SetLoginuser)}>Sign in with Google</Button>
            </Grid>
            <Grid item xs={12}>
                <Box pt={3}>
                  <Button 
                  onClick={() => navigate('/')}>ホームへ戻る</Button>
                </Box>
            </Grid>
          </Grid>
        )}
        {loginuser.isLoggedIn && (
            <Grid container alignItems='center' justifyContent='center' direction="column">
            <Grid item xs={12}>
              <p>ログインに成功しました</p>
            </Grid>
            <Grid item xs={12}>
              <Button 
              onClick={() => navigate('/')}>ホームへ戻る</Button>
            </Grid>
          </Grid>
        )}

      </div>
    )
}



export default SignInForFirebase