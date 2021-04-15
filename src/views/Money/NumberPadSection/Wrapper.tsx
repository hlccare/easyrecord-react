import styled from "styled-components";

const heightNormal: number = 64;
const heightSmall: number = 48;

const Wrapper = styled.section`
  font-size: 1.5em;
  display: flex;
  flex-direction:column;
  >.output{
    color: #129e6f;
    background:white;
    font-size: 36px;
    line-height: 60px;
    text-align:right;
    padding: 0 16px;
    box-shadow: inset 0 -5px 5px -5px rgba(0,0,0,0.25),
                inset 0 5px 5px -5px rgba(0,0,0,0.25)
  }
  >.pad{
    >button{
      background: white;
      float: left;
      width: 25%;
      height: ${heightNormal}px;
      border: 1px solid #d1cece;
      border-bottom:none;
      border-left: none;
      @media (max-height:700px){
        height: ${heightSmall}px;
      }
      &.backspace{
        fill: #f85f4b;
      }
      &.ok{
        float: right;
        height: ${heightNormal * 2}px;
        @media (max-height:700px){
          height: ${heightSmall * 2}px;
        }
      }
      &.zero{
        width: 50%;
      }
      &.ok{
      }
      &:nth-child(4),
      &:nth-child(8),
      &:nth-child(12){
        border-right: none;
      }
      /* &:nth-child(1){
        background: #f2f2f2;
      }
      &:nth-child(2),
      &:nth-child(5){
        background: #E0E0E0;
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9){
        background: #D3D3D3;
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10){
        background: #B8B8B8;
      }
      &:nth-child(12){
        background: #9A9A9A;
      }
      &:nth-child(14){
        background: #A9A9A9;
      } */
    }
  }
`

export { Wrapper }