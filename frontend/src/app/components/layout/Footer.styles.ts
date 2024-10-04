import styled from "styled-components";
import Link from "next/link";

export const FooterContainer = styled.div`
width: 100%;
background-color: #263960;
`;

export const SocialIcon = styled(Link)`
text-decoration: none;
font-size: 38px;
margin-right: 25px;
color: #ABABAB;
display: inline-block;
transition: 0.3s ease;

&:hover {
    transform: scale(1.2) translateY(-5px);
    color: #5E7BB3;
}
`;