import { Chart } from "components/Chart"
import dayjs from "dayjs"
import { EChartOption } from 'echarts'
import { useRecords } from "hooks/useRecords"
import _ from 'lodash'



const OverviewChart = () => {
    const { getDayTotalListByCategory } = useRecords()
    const getKeyValueList = () => {
        const today = new Date()
        const array = []
        for (let i = 0; i <= parseInt(dayjs(today).format('DD')) - 1; i++) {
            const dateString = dayjs(today).subtract(i, 'day').format('MM/DD')
            const foundIncome = _.find(getDayTotalListByCategory('+'), {
                title: dateString
            })
            const foundExpense = _.find(getDayTotalListByCategory('-'), {
                title: dateString
            })
            array.push({
                key: dateString,
                valuesIncome: foundIncome ? foundIncome.total : 0,
                valuesExpense: foundExpense ? foundExpense.total : 0,
            })
        }
        array.sort((a, b) => {
            if (a.key > b.key) {
                return 1
            } else if (a.key < b.key) {
                return -1
            } else {
                return 0
            }
        })
        return array
    }
    const getOption = () => {
        const keys = getKeyValueList().map(r => r.key)
        const valuesIncome = getKeyValueList().map(r => r.valuesIncome)
        const valuesExpense = getKeyValueList().map(r => r.valuesExpense)
        console.log('values')
        console.log(valuesExpense)
        console.log(valuesIncome)
        const option: EChartOption = {
            tooltip: {
                trigger: 'axis',
                // lineStyle: 'line'
            },
            legend: {
                data: ['支出', '收入'],
                bottom: 0,
                itemWidth: 50,
                itemHeight: 2
            },
            grid: {
                top: '3%',
                left: '3%',
                right: '4%',
                bottom: '12%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: keys
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '支出',
                    type: 'line',
                    stack: '总量',
                    smooth: true,
                    lineStyle: {
                        width: 3,
                        color: '#9bcac0'
                    },
                    areaStyle: { color: '#9bcac0' },
                    itemStyle: {
                        color: '#9bcac0',
                        borderWidth: 2
                    },
                    symbol: 'circle',
                    symbolSize: 8,
                    data: valuesExpense
                },
                {
                    name: '收入',
                    type: 'line',
                    stack: '总量',
                    smooth: true,
                    lineStyle: {
                        width: 3,
                        color: '#ffa1a0'
                    },
                    areaStyle: { color: '#ffa1a0' },
                    itemStyle: {
                        color: '#ffa1a0',
                        borderWidth: 2
                    },
                    symbol: 'circle',
                    symbolSize: 8,
                    data: valuesIncome
                }
            ]
        };
        return option
    }

    return (
        <Chart option={getOption()} />
    )
}

export { OverviewChart }