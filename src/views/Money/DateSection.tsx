import styled from "styled-components";
import { ChangeEventHandler } from 'react';
import { Input } from "components/Input";
import dayjs from "dayjs";

const Wrapper = styled.section`
  background: #f5f5f5;
  padding: 4px 16px;
  font-size: 14px;
`
type Props = {
  value: string;
  onChange: (value: string) => void
}
const DateSection: React.FunctionComponent<Props> = (props) => {
  const note = props.value
  const onchange: ChangeEventHandler<HTMLInputElement> = (e) => {
    props.onChange(e.target.value)
  }
  const today = dayjs(new Date()).format('YYYY-MM-DD')
  return (
    <Wrapper>
      <Input label='日期' type='date'
        placeholder='请选择日期'
        max = {today}
        value={note}
        onChange={onchange}
      />
    </Wrapper>
  )
}
export { DateSection };
