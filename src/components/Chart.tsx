import echarts, { EChartOption, ECharts } from 'echarts'
import { useRef, useEffect } from 'react';
type Props = {
    option: EChartOption;
    loading: boolean;
}

const Chart: React.FunctionComponent<Props> = (props) => {
    const { option, loading } = props
    const container = useRef<HTMLDivElement>(null)
    const chart = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        const width = document.documentElement.clientWidth
        if (container.current) {
            const chart: ECharts = echarts.init(container.current, 'dark')
            chart.setOption(props.option)
        }
    }, [props.option]) //mounted
    return (
        <div ref={container}></div>
    )
}

export { Chart }