'use client'

import Image from "next/image";
import * as Styled from "./page.styles";
import Link from "next/link";
import React from "react";
import { useAuth } from "./contexts/AuthContext"; // Auth context hook

export default function Home() {
  const { user } = useAuth();
  return (
    <>
    <Styled.StyledLink href="/helloworld">
      Hello World!
    </Styled.StyledLink>
    <p>{user ? user.email : 'Not logged in'}</p>
    </>
  );
}
