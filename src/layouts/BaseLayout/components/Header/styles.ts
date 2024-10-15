import { Link } from "react-router-dom";
import styled from "styled-components";
import { TLinkProps } from "./types";

export const StyledHeader = styled.header`
  padding: 0 38px;
  width: 100%;
  height: 80px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledImg = styled.img`
  width: 70px;
`;

export const StyledNavs = styled.div`
  display: flex;
  gap: 20px;
`;

export const StyledLink = styled(Link)<TLinkProps>`
  border-radius: 30px;
  padding: 8px 36px;
  font-size: 20px;
  text-decoration: none;
  color: #000;
  ${({ isContained }) =>
    isContained ? "background-color: #9dbd61" : "border: 1px solid #9dbd61"}
`;
