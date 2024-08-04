'use client'

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as Styled from './Signup.styles';
import Header from '../components/layout/Header';

const Login  = () => {
    // states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup } = useAuth(); // This is the auth context passed down from the highest context

    // Handle login button click
    const handleSignUp = async() => {
        try {
            // log in
            await signup(email, password);
            alert("Successfully signed up for account with email: " + email);
        } catch (error) {
            alert("Unsuccessful login with error: " + error);
        }
    };

    return (
          <>
            <Header />
            <Styled.GlobalStyle />
            <Styled.LoginContainer>
              <h3>Login</h3>
        
              <label htmlFor='emailInput'>Email</label>
              <Styled.InputBoxLogin
                type='email'
                value={email}
                id='emailInput'
                onChange={(e) => setEmail(e.target.value)}
              />
        
              <br />
        
              <label htmlFor='passwordInput'>Password</label>
              <Styled.InputBoxLogin
                type='password'
                value={password}
                id='passwordInput'
                onChange={(e) => setPassword(e.target.value)}
              />
        
              <br />
        
              <Styled.LoginButton onClick={handleSignUp}>Create Account</Styled.LoginButton>
            </Styled.LoginContainer>
          </>
          )
}

export default Login;