import styled from "styled-components";

const NumberPadSection = styled.section`
  display: flex;
  flex-direction:column;
  >.output{
    background:white;
    font-size: 36px;
    line-height: 72px;
    text-align:right;
    padding: 0 16px;
    box-shadow: inset 0 -5px 5px -5px rgba(0,0,0,0.25),
                inset 0 5px 5px -5px rgba(0,0,0,0.25)
  }
  >.pad{
    >button{
      float: left;
      width: 25%;
      height: 64px;
      border:none;
      &.ok{
        float: right;
        height: 128px;
      }
      &.zero{
        width: 50%;
      }
      &:nth-child(1){
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
      }
    }
  }
`
export { NumberPadSection };
