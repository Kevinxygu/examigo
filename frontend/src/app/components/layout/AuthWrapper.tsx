'use client'

// This is used for client side rendering of the auth context provider. Useful for working with NextJS
// Some docs are here: https://nextjs.org/docs/app/building-your-application/rendering/client-components

// import the authProvider context
import { AuthProvider } from '../../contexts/AuthContext'

// define types for the children prop (TODO move this to types folder in TS)
import { ReactNode } from 'react';

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}