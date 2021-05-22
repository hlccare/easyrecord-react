import { useState } from 'react';
import styled from "styled-components";
import { useRecords } from 'hooks/useRecords';
import dayjs from 'dayjs';
import { RecordItem } from '../hooks/useRecords';
import { OverviewChart } from "./Statistics/OverviewChart";
import { NaiveTabBar } from "components/NaiveTabBar";
import { CategoryStatistics } from "./Statistics/CategoryStatistics";
import { FlexLayout } from "components/FlexLayout";


const TabBarWrapper = styled.div`
      font-size: 1.3em;
      padding: 4px 16px;
        background: white;
    >ul{
      height: 100%;
      >li{
        padding: 10px 24px;
        &.selected{
          background: #9ccac0;
          color: white;
          border-radius: 10px;
        }

      }
    }

  `
const ContentWrapper = styled.div`
  flex-grow:1;
  display: flex;
  flex-direction: column;
  justify-content: center;

`

function Statistics() {
  const [category, setCategory] = useState<'-' | '+'>('-')
  const [extendCategory, setExtendCategory] = useState<string>('all')
  const { records } = useRecords()
  const hash: { [key: string]: { records: RecordItem[], sum: number } } = {}

  const selectedRecords = records.filter(r => r.category === category)

  selectedRecords.forEach(r => {
    const key = dayjs(r.createdAt).format('YYYY-MM-DD')
    if (!(key in hash)) {
      hash[key] = { records: [], sum: 0 }
    }
    hash[key].records.push(r)
    hash[key].sum += r.amount
  })


  const onChange = (value: string) => {
    setExtendCategory(value);
    if (value === '-') {
      setCategory('-')
    } else if (value === '+') {
      setCategory('+')
    }
  }

  return (
    <FlexLayout>
      <TabBarWrapper>
        <NaiveTabBar value={extendCategory}
          mapList={[{ 'all': '概览' }, { '-': '支出' }, { '+': '收入' }]}
          onChange={onChange} />
      </TabBarWrapper>
      <ContentWrapper>

        {extendCategory === 'all' ? <OverviewChart /> : <CategoryStatistics category={category} />}
      </ContentWrapper>

    </FlexLayout>
  );
}
export default Statistics;