import Layout from "components/Layout";
import React, { ReactNode } from "react";
import { CategorySection } from "./Money/CategorySection";
import { useState } from 'react';
import styled from "styled-components";
import { useRecords } from 'hooks/useRecords';
import { useTags } from 'hooks/useTags';
import dayjs from 'dayjs';
import { RecordItem } from '../hooks/useRecords';

const CategoryWrapper = styled.div`
    background: white;
`

const Item = styled.div`
  display:flex;
  justify-content: space-between;
  background: white;
  font-size: 18px;
  line-height: 20px;
  padding: 10px 16px;
  >.note{
    margin-right: auto;
    margin-left: 16px;
    color: #999 
  }
`
const Header = styled.h3`
  font-size: 18px;
  line-height: 20px;
  padding: 10px 16px;
`

function Statistics() {
  const [category, setCategory] = useState<'-' | '+'>('-')
  const { records } = useRecords()
  const { getName } = useTags()
  const hash: { [key: string]: RecordItem[] } = {}
  const selectedRecords = records.filter(r => r.category === category)

  selectedRecords.forEach(r => {
    const key = dayjs(r.createdAt).format('YYYY-MM-DD')
    if (!(key in hash)) {
      hash[key] = []
    }
    hash[key].push(r)
  })

  const array = Object.entries(hash).sort((a, b) => {
    if (a[0] === b[0]) {
      return 0;
    } else if (a[0] > b[0]) {
      return 1;
    } else {
      return -1;
    }
  })

  return (
    <Layout>
      <CategoryWrapper>
        <CategorySection value={category}
          onChange={category => setCategory(category)} />
      </CategoryWrapper>
      {array.map(([date, records]) =>
        <div>
          <Header>{date}</Header>
          <div>
            {records.map(r => {
              return (
                <Item>
                  <div className="tag oneLine">
                    {r.tagIds.map(tagId => <span key={tagId}>{getName(tagId)}</span>)
                      .reduce((result, span, index, array) => result.concat(index < array.length - 1 ? [span, ','] : [span]), [] as ReactNode[])}
                  </div>
                  {r.note && <div className="note">
                    {r.note}
                  </div>}
                  <div className="amount">
                    ￥{r.amount}
                  </div>
                </Item>
              )
            })}
          </div>
        </div>
      )}

    </Layout>
  );
}
export default Statistics;