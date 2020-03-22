import styled, {keyframes} from "styled-components";
import {bounce, bounceInDown, bounceInLeft, bounceInRight, fadeIn, swing} from "react-animations";


const bounceAnimation = keyframes`${bounce}`;
const swingAnimation = keyframes`${swing}`;
const bounceInDownAnimation = keyframes`${bounceInDown}`;
const bounceInLeftAnimation = keyframes`${bounceInLeft}`;
const bounceInRightAnimation = keyframes`${bounceInRight}`;
const fadeInAnimation = keyframes`${fadeIn}`;

export const BounceInDown = styled.div`
  animation: 2s ${bounceInDownAnimation};
  animation-fill-mode: both;
`;

export const BounceInLeft = styled.div`
  animation: 2s ${bounceInLeftAnimation};
  animation-fill-mode: both;
`;

export const BounceInRight = styled.div`
  animation: 2s ${bounceInRightAnimation};
  animation-fill-mode: both;
`;

export const FadeIn = styled.div`
  animation: 2s ${fadeInAnimation};
  animation-fill-mode: both;
`;

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
  overflow: hidden;
`;


export const HomeTitle = styled.h1`
   color: white;
   font-size: 10rem;
   animation: 2s ${swingAnimation} infinite;
   animation-fill-mode: both;
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
