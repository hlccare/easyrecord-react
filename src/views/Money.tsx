import styled from 'styled-components';
import { CategorySection } from "./Money/CategorySection";
import { NoteSection } from "./Money/NoteSection";
import { NumberPadSection } from "./Money/NumberPadSection";
import { TagsSection } from "./Money/TagsSection";
import { useState } from 'react';
import { useRecords } from "hooks/useRecords";
import { DateSection } from "./Money/DateSection";
import dayjs from "dayjs";
import { FlexLayout } from "components/FlexLayout";

type Category = '-' | '+'

const defaultFormData = {
  id: 0,
  tagId: -1,
  note: '',
  category: '-' as Category,
  amount: 0,
  createdAt: dayjs(new Date().toISOString()).format("YYYY-MM-DD")
}

const CategoryWrapper = styled.div`
    background: white;
`

function Money() {
  const [selected, setSelected] = useState(defaultFormData)
  const { addRecord } = useRecords();
  const onChange = (obj: Partial<typeof selected>) => {
    setSelected({
      ...selected,
      ...obj
    })
  }
  const submit = () => {
    console.log('submit')
    if (addRecord(selected)) {
      window.alert('保存成功')
      setSelected(defaultFormData)
    }
  }
  return (
    <FlexLayout>
      <CategoryWrapper>
        <CategorySection value={selected.category}
          onChange={category => onChange({ category })}>
        </CategorySection>
      </CategoryWrapper>
      <TagsSection category={selected.category} value={selected.tagId}
        onChange={tagId => onChange({ tagId })} />
      <DateSection value={selected.createdAt} onChange={createdAt => onChange({ createdAt })} />
      <NoteSection value={selected.note}
        onChange={note => onChange({ note })} />
      <NumberPadSection value={selected.amount}
        onChange={amount => onChange({ amount })}
        onOk={submit}>
      </NumberPadSection>
    </FlexLayout >
  )
}

export default Money;