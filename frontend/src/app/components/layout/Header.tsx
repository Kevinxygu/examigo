'use client'

import Image from "next/image";
import * as Styled from "./Header.styles";
import Link from "next/link";
import React from "react";
import { useAuth } from "../../contexts/AuthContext"; // Auth context hook

const Header = () => {
  const { user } = useAuth();
  return (
    <Styled.HeaderContainer>
       <Styled.StyledLink href="/">
        Home
        </Styled.StyledLink>
        <Styled.StyledLink href="/helloworld">
        Hello World!
        </Styled.StyledLink>

        <Styled.StyledLink href="/auth/login">
        Login Page
        </Styled.StyledLink>

        <Styled.StyledLink href="/signup">
        Sign Up
        </Styled.StyledLink>

        {/* This will show the user email if they are logged in */}
        <p>{`User: ${user ? user.email : 'Not logged in'}`}</p>

    </Styled.HeaderContainer>
  );
}

export default Header
