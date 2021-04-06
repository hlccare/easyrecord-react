import styled from "styled-components";
import { useRef, useState } from 'react';

const Wrapper = styled.section`
  background: #f5f5f5;
  padding: 0 16px;
  font-size: 14px;
  >label{
    display:flex;
    align-items:center;
    >span{
      margin-right:16px;
      white-space: nowrap;
    }
    >input{
      display:block;
      width: 100%;
      height:72px;
      background: none;
      border: none;
    }
  }
`
const NoteSection: React.FunctionComponent = () => {
  const [note, setNote] = useState('')
  //非受控
  const refInput = useRef<HTMLInputElement>(null)
  const onBlur = () => {
    if (refInput.current !== null) {
      setNote(refInput.current.value)
    }
  }
  return (
    <Wrapper>
      <label>
        <span>备注</span>
        <input type="text" placeholder='请输入备注'
          ref={refInput}
          defaultValue={note}
          onBlur={onBlur} />
      </label>
    </Wrapper>
  )
  //受控
  // return (
  //   <Wrapper>
  //     <label>
  //       <span>备注</span>
  //       <input type="text" placeholder='请输入备注'
  //         value={note}
  //         onChange={(e) => setNote(e.target.value)} />
  //     </label>
  //   </Wrapper>
  // )
}
export { NoteSection };
