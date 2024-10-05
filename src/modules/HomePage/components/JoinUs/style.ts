import styled from "styled-components";

export const StyledContainer = styled.div<{ path: string }>`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: space-between;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ path }) => `url('${path}')`};
`;

export const StyledContent = styled.div`
  height: 100%;
  background-color: #fff;
  width: 1000px;
  border-top-right-radius: 1000px;
  border-bottom-right-radius: 1000px;
`;

export const StyledImg = styled.img`
`