import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 750px;
  margin: auto;
  display: flex;
  padding: 50px 0px;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  @media (max-width: 750px) {
    margin-bottom: 50px;
    align-items: center;
  }
`;

export const Logo = styled.div`
  display: block;
  color: #000;
`;

export const InfoArea = styled.div`
  width: 100%;
  margin: 10px 0px;

  @media (max-width: 750px) {
    display: flex;
    justify-content: space-around;
    text-align: center;
  }
`;

export const GridArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 750px) {
    justify-content: center;
    margin: 0px 20px;
  }
`;

export const Grid = styled.div`
  width: 430px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  @media (max-width: 750px) {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 20px;
  }
`;
export const ContainerButtons = styled.div`
  display: flex;
  column-gap: 20px;
  margin-right: 80px;
  @media (max-width: 750px) {
    margin-right: 0px;
  }
  @media (max-width: 550px) {
    flex-direction: column;
    row-gap: 20px;
  }
`;
