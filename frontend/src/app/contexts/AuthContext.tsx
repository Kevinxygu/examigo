"use client"

// Import code to create a context for authentication
import React, {createContext, useContext, useEffect, useState} from "react";
import { onAuthStateChanged, getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../config/configAuth";

// Types
import { User } from "firebase/auth";

// Create the context
const AuthContext = createContext({});

// Create a hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
}

// Create the provider component to wrap the app around. This will provide the context to the app in parts where you will wrap it
export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    
    // This function will be called when the component is mounted
    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
        });
    
        return unsubscribe;
    }, []);
    
    // This function will be called when the user logs in
    const login = async (email: string, password: string) => {
        const auth = getAuth(app);
        return signInWithEmailAndPassword(auth, email, password);
    }
    
    // This function will be called when the user logs out
    const logout = async () => {
        const auth = getAuth(app);
        return signOut(auth);
    }
    
    // This function will be called when the user signs up
    const signup = async (email: string, password: string) => {
        const auth = getAuth(app);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
    // This is the value that we will provide to the app
    const value = {
        user,
        login,
        logout,
        signup
    }
    
    return (
        <AuthContext.Provider value={value}>
        {!loading && children}
        </AuthContext.Provider>
    )
    }