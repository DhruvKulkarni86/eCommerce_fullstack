import {auth, provider} from '../../firebase/config';

export const authLogout = () => {
    return auth.signOut()
}

export const authSignupWithEmail = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password) 
}

export const authGoogleSignIn = () => {
    return auth.signInWithPopup(provider)
}

export const authSignInWithEmail = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
}
