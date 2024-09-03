import { User, UserCredential } from 'firebase/auth';

// Type: This is used for authentication and should be used in AuthContext.tsx
export type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    signup: (email: string, password: string) => Promise<UserCredential>;
    googleSignIn: () => Promise<UserCredential>; // Sign in with Google
}