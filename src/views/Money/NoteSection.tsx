import styled from "styled-components";
import { ChangeEventHandler } from 'react';
import { Input } from "components/Input";

const Wrapper = styled.section`
  background: #f5f5f5;
  padding: 14px 16px;
  font-size: 14px;
`
type Props = {
  value: string;
  onChange: (value: string) => void
}
const NoteSection: React.FunctionComponent<Props> = (props) => {
  const note = props.value
  const onchange:ChangeEventHandler<HTMLInputElement> = (e) => {
    props.onChange(e.target.value)
  }
  return (
    <Wrapper>
      <Input label='备注' type='text'
        placeholder='请输入备注'
        value={note}
        onChange={onchange}
      />
    </Wrapper>
  )
}
export { NoteSection };
