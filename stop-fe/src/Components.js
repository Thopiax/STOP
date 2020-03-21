import styled from "styled-components";

export const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
`;

export const HomeContainer = styled.div`
  height: 100%;
  width: 100%;
  
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  background-color: #c0392b;
`;


export const HomeTitle = styled.h1`
   color: white;
   font-size: 10rem;
`;

export const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: space-between; 
  background-color: white;
  border-radius: 0.25rem;
  padding: 2rem;
`;

export const HomeFormContainer = styled.form`
  height: 80px;
`;
