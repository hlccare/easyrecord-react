import styled from "styled-components";

const CategorySection = styled.section`
  font-size:24px;
  >ul{
    display:flex;
    background: #c4c4c4;
    >li{
      width: 50%;
      text-align: center;
      padding:16px 0;
      position: relative;
      &.selected::after{
        border: 1pxs solid red;
        content:'';
        display:block;
        position:absolute;
        height:3px;
        background:#333;
        width: 100%;
        left: 0;
        bottom: 0;
      }
    }
  }
`

export { CategorySection };
