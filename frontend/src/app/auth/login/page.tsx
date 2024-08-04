'use client'

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import * as Styled from './Login.styles';

const Login  = () => {
    // states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, logout } = useAuth(); // This is the auth context passed down from the highest context

    // Handle login button click
    const handleLogin = async() => {
        try {
            // log in
            await login(email, password);
            alert("Logged in successfully");
        } catch (error) {
            alert("Unsuccessful login with error: " + error);
        }
    };

    // Handle logout
    const handleLogout = async() => {
        try {
            // log out
            await logout();
            alert("Logged out successfully");
        } catch (error) {
            alert("There was an error" + error)
        }
    };

    return (
          <>
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
        
              <Styled.LoginButton onClick={handleLogin}>Login</Styled.LoginButton>
              <Styled.LogoutButton onClick={handleLogout}>Logout</Styled.LogoutButton>
            </Styled.LoginContainer>
          </>
          )
}

export default Login;