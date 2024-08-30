import { User, UserCredential } from 'firebase/auth';

export type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    signup: (email: string, password: string) => Promise<UserCredential>;
    googleSignIn: () => Promise<UserCredential>; // Sign in with Google
}