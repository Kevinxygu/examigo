import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');

  * {
    font-family: "IBM Plex Mono", monospace;
    padding: 0;
    margin: 0;
  }
`;

export const LoginContainer = styled.div`
  padding: 15px;
  outline: 3px solid grey;
  text-align: left;
  margin: 15px;
`;

export const InputBoxLogin = styled.input`
  outline: 1px solid grey;
  margin: 10px;
`;

export const LoginButton = styled.button`
  /* Add styles for loginButton if any */
`;

export const LogoutButton = styled.button`
  /* Add styles for logoutButton if any */
`;