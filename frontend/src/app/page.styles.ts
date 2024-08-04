import styled from "styled-components";
import Link from "next/link";

// Style a link
export const StyledLink = styled(Link)`
text-decoration: none;
color: white;
transition: 0.3s ease;
cursor: pointer;
margin: 15px;

&:hover {
  opacity: 30%;
}
`;