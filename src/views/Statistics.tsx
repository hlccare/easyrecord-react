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
import { Chart } from "components/Chart";
import _ from 'lodash'
import { OverviewChart } from "./Statistics/OverviewChart";
import { PieChart } from "./Statistics/PieChart";

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

function Statistics() {
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

  

  return (
    <Layout>
      <CategoryWrapper>
        <CategorySection value={category}
          onChange={category => setCategory(category)} />
      </CategoryWrapper>
      <OverviewChart />
      <PieChart category={category}/>
    </Layout>
  );
}
export default Statistics;