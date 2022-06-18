import {
    createContext, useEffect, useState, useContext
} from 'react';
import { auth } from '../database/firebase'
import {
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail

} from "firebase/auth";

const UserContext = createContext({})

export const useUserContext = () => useContext(UserContext);
export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, res => {
            res ? setUser(user) : setUser(null);
            setError('');
            setLoading(false);
        });

        return unsubscribe;
    }, [])

    const registerUser = (email, name, password) => {


        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                return updateProfile(auth.CurrentUser, {
                    displayName: name,
                });
            })
            .then((res) => console.log(res))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))

    }
    const signInUser = (email, password) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => console.log(res))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }


    const logoutUser = () => {
        /////
        signOut(auth);
    }
    const forgotPassword = (email) => {
        /////
        return sendPasswordResetEmail(auth, email);
    }

    const contextValue = {
        user,
        loading,
        error,
        registerUser,
        signInUser,
        logoutUser,
        forgotPassword

    };

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>

}