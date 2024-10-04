'use client'

import Image from "next/image";
import * as Styled from "./Footer.styles";
import Link from "next/link";
import React from "react";
import Script from "next/script";

// Footer component, this will be rendered at the bottom of every page
const Footer = () => {
  return (
    <Styled.FooterContainer>
        <Script src="https://kit.fontawesome.com/b18e6932b3.js" crossOrigin="anonymous" async></Script>
        <Styled.SocialIcon target="_blank" href="https://www.instagram.com/p/C9ic9a3hcIQ/"><i className="fa-brands fa-instagram"></i></Styled.SocialIcon>
    </Styled.FooterContainer>
  );
}

export default Footer;