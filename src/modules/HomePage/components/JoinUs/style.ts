import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledContainer = styled.div<{ path: string }>`
  display: flex;
  width: 100%;
  height: 100vh;
  gap: 20px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ path }) => `url('${path}')`};
`;

export const StyledContent = styled.div`
  height: 100%;
  background-color: #fff;
  width: 900px;
  border-top-right-radius: 1000px;
  border-bottom-right-radius: 1000px;
  text-align: center;
`;

export const StyledImg = styled.img``;

export const StyledTexts = styled.div`
  text-align: center;
  width: calc(100% - 900px);
  display: flex;
  gap: 140px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledH1 = styled.h1`
  color: #fff;
  font-size: 100px;
`;
export const StyledH2 = styled.h2`
  color: #fff;
  font-size: 70px;
`;

export const StyledLink = styled(Link)`
  border-radius: 30px;
  padding: 8px 36px;
  font-size: 20px;
  text-decoration: none;
  color: #000;
  background-color: #fff;
`;
