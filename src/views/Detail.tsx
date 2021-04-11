import Layout from "components/Layout";
import React, { ReactNode } from "react";
import { CategorySection } from "./Money/CategorySection";
import { useState } from 'react';
import styled from "styled-components";
import { useRecords } from 'hooks/useRecords';
import { useTags } from 'hooks/useTags';
import dayjs from 'dayjs';
import { RecordItem } from '../hooks/useRecords';
import {expenseTagsList,incomeTagsList} from 'instants/tagsList'
import Icon from "components/Icon";

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
  .icon{
    margin-left: auto;
    /* $icon-size:1.5em; */
    width: 1em;
    height: 1em;
  }
`
const Header = styled.h3`
  font-size: 18px;
  line-height: 20px;
  padding: 10px 16px;
  display:flex;
  justify-content: space-between;
`

function Detail() {
  const [category, setCategory] = useState<'-' | '+'>('-')
  const { records, deleteRecord } = useRecords()
  // const { getName } = useTags()
  // const hash: { [key: string]: RecordItem[] } = {}
  const hash: { [key: string]: {records:RecordItem[],sum:number }} = {}

  const selectedRecords = records.filter(r => r.category === category)

  selectedRecords.forEach(r => {
    const key = dayjs(r.createdAt).format('YYYY-MM-DD')
    if (!(key in hash)) {
      hash[key] = {records:[],sum:0}
    }
    hash[key].records.push(r)
    hash[key].sum += r.amount
  })

  const array = Object.entries(hash).sort((a, b) => {
    if (a[0] === b[0]) {
      return 0;
    } else if (a[0] > b[0]) {
      return -1;
    } else {
      return 1;
    }
  })

  const beautify  = (string: string) => {
    const day = dayjs(string);
    const now = dayjs();
    if (dayjs(string).isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("MM月D日");
    } else {
      return day.format("YYYY年MM月DD日");
    }
  }

  return (
    <Layout>
      <CategoryWrapper>
        <CategorySection value={category}
          onChange={category => setCategory(category)} />
      </CategoryWrapper>
      {array.map(([date, {records,sum}]) =>
        <div key={date}>
          <Header>
          <span>
            {beautify(date)}
          </span>
          <span>
            ￥{sum}
          </span>
          </Header>
          
          <div>
            {records.map(r => {
              return (
                <Item key={r.id}>
                  <div className="tag oneLine">
                    {/* {r.tagIds.map(tagId => <span key={tagId}>{getName(tagId)}</span>)
                      .reduce((result, span, index, array) => result.concat(index < array.length - 1 ? [span, ','] : [span]), [] as ReactNode[])} */}
                    <span>{(r.category==='-'?expenseTagsList:incomeTagsList).find(tag=>tag.id===r.tagId)?.name}</span>
                  </div>
                  {r.note && <div className="note">
                    {r.note}
                  </div>}
                    <Icon name='delete' onClick={()=>deleteRecord(r.id)}/>
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
export { Detail };