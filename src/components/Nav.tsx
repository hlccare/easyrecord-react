import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Icon from "./Icon";


const NavWrapper = styled.nav`
background: white;
line-height: 24px;
box-shadow: 0 0 3px rgba(0,0,0,0.25);
> ul{
  display:flex;
  >li{
    width: 33.33%;
    text-align:center;
    > a{
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      padding: 4px 0;
      .icon{
          width: 24px;
          height: 24px;
      }
      &.selected{
        color:white;
        background: #9ccac0;
        .icon{
          fill: white;
        }
      }
    }
  }
}
`

const Nav = () => {
  return (

    <NavWrapper>
      <ul>
        <li>
          <NavLink to="/detail" activeClassName="selected">
            <Icon name='label' />明细
          </NavLink>

        </li>
        <li>
          <NavLink to="/money" activeClassName="selected">
            <Icon name='money' />记账
          </NavLink>
        </li>
        <li>

          <NavLink to="/statistics" activeClassName="selected">

            <Icon name='statistic' />统计
          </NavLink>
        </li>
      </ul>
    </NavWrapper>
  )
}
export default Nav;