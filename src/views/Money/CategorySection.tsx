import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.section`
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
type Props = {
  value: '-' | '+',
  onChange: (category: '-' | '+') => void
}

const CategorySection: React.FunctionComponent<Props> = (props) => {
  const categoryMap = { '-': '支出', '+': '收入' }
  type Keys = keyof typeof categoryMap
  const [categoryList] = useState<Keys[]>(['-', '+'])
  const category = props.value
  return (
    <Wrapper>
      <ul>
        {
          categoryList.map(c =>
            <li
              key={c}
              className={category === c ? 'selected' : ''}
              onClick={() => props.onChange(c)}
            >
              {categoryMap[c]}
            </li>
          )
        }
      </ul>
    </Wrapper>
  )
}
export { CategorySection };
