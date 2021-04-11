import { Chart } from "components/Chart"
import { EChartOption } from "echarts"
import { useRecords } from "hooks/useRecords"
import { useTags } from "hooks/useTags";

type OptionData={
        value:number,
        name:string
    }[]

const getOption = (data:OptionData) => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {d}%'
      },
      series: [
        {
          type: 'pie',
          radius: ['25%', '50%'],
          center: ['50%', '60%'],
          data:data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    } as EChartOption;
}

type Props = {
    category: '-' | '+'
}
const PieChart:React.FunctionComponent<Props> = (props) =>{
    const {category} = props
    const {getShareListByCategory} = useRecords();
    const {getTagNameById} = useTags();
    const shareList = getShareListByCategory(category)
    console.log('shareList')
    console.log(shareList)
    const optionData:OptionData = []
    if(shareList.length>0){
        shareList.forEach(r=>{
            optionData.push(
                {
                    value:r.amount,
                    name:getTagNameById(r.id)
                }
            )
        })
    }
    console.log('optionData')
    console.log(optionData)
    return (
        <Chart option={getOption(optionData)}/>
    )
}

export {PieChart}