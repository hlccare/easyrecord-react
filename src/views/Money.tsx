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
import { Dialog } from 'components/Dialog';

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
  const [visible, setVisible] = useState(false);
  const submit = () => {
    console.log('submit')
    if (addRecord(selected)) {
      setVisible(true)
      setSelected(defaultFormData)
    }
  }
  const onCloseForDialog = () => {
    setVisible(false)
  }
  const okHandler = () => {
    console.log('ok')
  }
  const cancelHandler = () => {
    console.log('cancel')
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
      <Dialog type='alert' visible={visible} onClose={onCloseForDialog} okHandler={okHandler} cancelHandler={cancelHandler} header='提示' content='保存成功' />
    </FlexLayout >
  )
}

export default Money;