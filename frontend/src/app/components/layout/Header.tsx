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
        <Styled.StyledLink href="/helloworld">
        Hello World!
        </Styled.StyledLink>
        <p>{user ? user.email : 'Not logged in'}</p>
    </Styled.HeaderContainer>
  );
}

export default Header
