import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const AuthProvider = ({children}) => {


const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true)


const provider = new GoogleAuthProvider();

/**Create user function */
const createUser = (email, password) =>{
    setLoading(true);
   return createUserWithEmailAndPassword(auth, email, password)
}

/**create signIn function */
const signInUser = (email, password)=>{
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)

}

/**create signOut function */
const signOutUser = ()=>{
    setLoading(true);
    return signOut(auth)
}


/**signIn with Google */

const signInWithGoogle =()=>{
    setLoading(true);
    return signInWithPopup(auth, provider)
}

/***to set current user in FIrebase upon new login/logout(statechange) */
useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setLoading(false);
        setUser(currentUser)
        console.log('user in the authState change', currentUser)

    })
return unsubscribe
},[])



const authInfo = {
    loading,
    user,
    createUser,
    signInUser,
    signInWithGoogle,
    signOutUser 
}

    return <AuthContext value={authInfo}>{children}</AuthContext>
};

export default AuthProvider;


/***
 * 
 *  What this does:

Wraps your entire app (or part of it) with AuthProvider.

Inside, you prepare authInfo (all your auth state + functions).

You pass authInfo into AuthContext.Provider.

Now, any child component can access this info without passing props manually.
 */