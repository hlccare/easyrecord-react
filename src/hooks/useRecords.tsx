import { useState, useEffect } from 'react';
import { useUpdate } from "./useUpdate"
import { createRecordId } from 'lib/createId'
import dayjs from 'dayjs';

export type RecordItem = {
    id: number,
    tagId: number,
    note: string,
    category: '+' | '-',
    amount: number,
    createdAt: string //ISO 8601
}

const useRecords = () => {
    const [records, setRecords] = useState<RecordItem[]>([])
    useEffect(() => {
        setRecords(JSON.parse(window.localStorage.getItem('records') || '[]'))
    }, [])
    useUpdate(() => {
        window.localStorage.setItem('records', JSON.stringify(records))
    }, records)

    const getRecordListByCategory = (category: '-' | '+') => {
        return records.filter(r => r.category === category)
    }
    const getRecordListByTagId = (id?: number) => {
        return records.filter(r => r.tagId === id)
    }

    const getDayTotalListByCategory = (category: '-' | '+') => {
        const dayTotalList = getRecordListByCategory(category)
        dayTotalList.sort((a, b) => (dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()))
        type Result = {
            title: string, //日期，格式'MM/DD'
            total?: number, //总金额
            items: RecordItem[] //对应的记录
        }[]
        if (dayTotalList.length === 0) {
            return []
        }
        const result: Result = [
            {
                title: dayjs(dayTotalList[0].createdAt).format('MM/DD'),
                items: [dayTotalList[0]]
            }
        ]
        for (let i = 0; i < dayTotalList.length; i++) {
            const current = dayTotalList[i]
            const last = result[result.length - 1]
            if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
                last.items.push(current) //与末尾记录为同一天则存入
            } else {
                result.push(
                    { title: dayjs(current.createdAt).format('MM/DD'), items: [current] }
                )
            }
        }
        result.map(
            group =>
                group.total = group.items.reduce((sum, item) => {
                    return sum + item.amount
                }, 0)
        )
        return result
    }
    const getShareListByCategory = (category: '-' | '+') => {
        const recordList = getRecordListByCategory(category);

        const hash: { [key: string]: number } = {}
        if (recordList.length === 0) {
            return []
        }
        for (let i = 0; i < recordList.length; i++) {
            const id = recordList[i].tagId.toString()
            console.log(recordList[i].amount)
            if (!hash[id]) {
                hash[id] = recordList[i].amount
            } else {
                hash[id] += recordList[i].amount;
            }
        }
        const keyList = Object.keys(hash)
        keyList.sort((a, b) => hash[a] - hash[b])
        const valueList = Object.values(hash)
        const total = valueList.reduce((sum, value) => { return sum += value }, 0)
        type Result = {
            id: number,
            amount: number,
            share: string
        }[]
        const result: Result = []
        keyList.map(key =>
            result.push({
                id: parseInt(key),
                amount: hash[key],
                share: (hash[key] / total).toFixed(2)
            })
        )
        return result
    }

    const getTotalByCategory = (category: '-' | '+') => {
        const records = getRecordListByCategory(category)
        const total = records.reduce((sum, record) => {
            return sum + record.amount
        }, 0)
        return total
    }

    const addRecord = (record: RecordItem) => {
        if (record.amount === 0) {
            window.alert('请输入金额')
            return false;
        }
        if (record.tagId === -1) {
            window.alert('请选择标签')
            return false;
        }
        setRecords([...records, { ...record, id: createRecordId() }])
        return true;
    }


    const deleteRecord = (id: number) => {
        setRecords(records.filter(r => r.id !== id))
        return true
    }

    return {
        records, addRecord, deleteRecord, getDayTotalListByCategory, getShareListByCategory, getTotalByCategory
    }
}

export { useRecords }