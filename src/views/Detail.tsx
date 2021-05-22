import React, { ReactNode } from "react";
import { CategorySection } from "./Money/CategorySection";
import { useState } from 'react';
import styled from "styled-components";
import { useRecords } from 'hooks/useRecords';
import { useTags } from 'hooks/useTags';
import dayjs from 'dayjs';
import { RecordItem } from '../hooks/useRecords';
import Icon from "components/Icon";
import { useParams } from 'react-router';
import { Image } from "components/Image";
import { FlexLayout } from "components/FlexLayout";
import { Dialog } from "components/Dialog";

const CategoryWrapper = styled.div`
    background: white;
`

const Item = styled.div`
  display:flex;
  background: white;
  font-size: 18px;
  line-height: 20px;
  padding: 10px 16px;
  align-items: stretch;
  >.iconWrapper{
    margin-right: 8px;
    padding: 3px;
    .icon{
      width: 2.5em;
      height: 2.5em;
    }
  }
  >.contentWrapper{
    flex-grow:1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow:auto;
    .upper{
      line-height: 1.2em;
      font-size: 1.2em;
      font-weight: 600;
      display:flex;
      justify-content: space-between;
    }
    .lower{
      display:flex;
      flex-wrap: nowrap;
      >.note{
        margin-right: 4px;
        max-width: calc(100% - 4px - 1em);
        font-size: 0.8em;
        font-weight:400;
      }
      >.deleteIconWrapper{
        margin-left: auto;
        >.icon{
          font-size: 1em;
        }
      }
    }
  }
`
const Header = styled.h3`
  font-size: 18px;
  line-height: 20px;
  padding: 10px 16px;
  display:flex;
  justify-content: space-between;
  border-bottom: 1px solid #e2e1e1; 
`

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  margin-top: 32px;;
`
const Tip = styled.span`
  margin-top: 4px;
  color: grey;
`

const ContentWrapper = styled.div`
  flex-grow: 1;
  overflow: auto;
  height: 0;
  &::-webkit-scrollbar {display:none}
`

type Params = {
  categoryParam?: '-' | '+'
}
const Detail: React.FunctionComponent = (props) => {
  const { categoryParam } = useParams<Params>();
  const [category, setCategory] = useState<'-' | '+'>(categoryParam || '-')
  const { records, deleteRecord } = useRecords()
  const { getIconNameById, getTagNameById } = useTags()
  const hash: { [key: string]: { records: RecordItem[], sum: number } } = {}

  const selectedRecords = records.filter(r => r.category === category)

  const [visible, setVisible] = useState(false)

  const [idProcess, setIdProcess] = useState(-1)

  let type = 'parent';

  const onClickDelete = (id: number) => {
    setVisible(true)
    setIdProcess(id)
  }

  const onCloseForDialog = () => {
    setVisible(false)
  }
  const okHandler = () => {
    (idProcess !== -1) && deleteRecord(idProcess) && console.log('ok')
  }
  const cancelHandler = () => {
    console.log('cancel')
  }

  selectedRecords.forEach(r => {
    const key = dayjs(r.createdAt).format('YYYY-MM-DD')
    if (!(key in hash)) {
      hash[key] = { records: [], sum: 0 }
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

  const beautify = (string: string) => {
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
    <FlexLayout>

      <CategoryWrapper>
        <CategorySection value={category}
          onChange={category => setCategory(category)} />
      </CategoryWrapper>
      <ContentWrapper>

        {array.map(([date, { records, sum }]) =>
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
                    <div className='iconWrapper'>
                      <Icon name={getIconNameById(r.tagId)} />

                    </div>
                    <div className='contentWrapper'>
                      <div className="upper">
                        <div className="tag oneLine">
                          {/* {r.tagIds.map(tagId => <span key={tagId}>{getName(tagId)}</span>)
                          .reduce((result, span, index, array) => result.concat(index < array.length - 1 ? [span, ','] : [span]), [] as ReactNode[])} */}
                          <span>{getTagNameById(r.tagId)}</span>
                        </div>
                        <div className="amount">
                          ￥{r.amount}
                        </div>
                      </div>
                      <div className="lower">
                        {r.note && <div className="note oneLine">
                          {r.note}
                        </div>}
                        <div className='deleteIconWrapper'>
                          <Icon name='delete' onClick={() => onClickDelete(r.id)} />
                        </div>
                      </div>
                    </div>

                  </Item>
                )
              })}
            </div>
          </div>
        )}
        {array.length === 0 ?
          <ImageWrapper>
            <Image name='no-data' />
            <Tip>暂无数据</Tip>
          </ImageWrapper> : null
        }
      </ContentWrapper>
      <Dialog type='confirm' visible={visible} onClose={onCloseForDialog} okHandler={okHandler} cancelHandler={cancelHandler} header='提示' content='确认删除此条记录？' />

    </FlexLayout>

  );
}
export { Detail };