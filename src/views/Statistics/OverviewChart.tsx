import { Chart } from "components/Chart"
import dayjs from "dayjs"
import echarts, { EChartOption, ECharts } from 'echarts'
import { useRecords } from "hooks/useRecords"
import _ from 'lodash'



const OverviewChart = () =>{
    const {records,getDayTotalListByCategory} = useRecords()
    const getKeyValueList = () => {
        const today = new Date()
        const array = []
        for(let i=0;i<=parseInt(dayjs(today).format('DD'))-1;i++){
            const dateString = dayjs(today).subtract(i,'day').format('MM/DD')
            const foundIncome = _.find(getDayTotalListByCategory('+'),{
                title: dateString  
            })
            const foundExpense = _.find(getDayTotalListByCategory('-'),{
                title: dateString  
            })
            array.push({
                key:dateString, 
                valuesIncome: foundIncome?foundIncome.total:0,
                valuesExpense: foundExpense?foundExpense.total:0,
            })
        }
        array.sort((a,b)=>{
        if(a.key>b.key){
            return 1
        }else if(a.key<b.key){
            return -1
        }else{
            return 0
        }
        })
        return array
   }
   const getOption = ()=>{
       const keys = getKeyValueList().map(r=>r.key)
        const valuesIncome = getKeyValueList().map(r=>r.valuesIncome)
        const valuesExpense = getKeyValueList().map(r=>r.valuesExpense)
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
                bottom:0,
                itemWidth:50,
                itemHeight:2
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
                    areaStyle: {color: '#9bcac0'},
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
                    areaStyle: {color: '#ffa1a0'},
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
    const option:EChartOption = {
    title: {
        text: '堆叠区域图'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};
    return (
        <Chart option={getOption()}/>
    )
}

export {OverviewChart}