import { useState, useEffect } from 'react';
import { useUpdate } from "./useUpdate"

export type RecordItem = {
    tagIds: number[],
    note: string,
    category: '+' | '-',
    amount: number,
    createdAt?: string //ISO 8601
}

const useRecords = () => {
    const [records, setRecords] = useState<RecordItem[]>([])
    useEffect(() => {
        setRecords(JSON.parse(window.localStorage.getItem('records') || '[]'))
    }, [])
    const addRecord = (record: RecordItem) => {
        if (record.amount === 0) {
            window.alert('请输入金额')
            return false;
        }
        if (record.tagIds.length === 0) {
            window.alert('请选择标签')
            return false;
        }
        setRecords([...records, record])
        return true;
    }
    useUpdate(() => {
        window.localStorage.setItem('records', JSON.stringify(records))
    }, records)

    return {
        records, addRecord
    }
}

export { useRecords }