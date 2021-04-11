import echarts, {EChartOption, ECharts} from 'echarts';

import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';

type Props = {
  option?: EChartOption,
  className?: string
}

const Main = styled.div`
  height: 360px;
`;

const Chart: React.FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (props.option === undefined) {return console.error('options 为空');}
    const chart: ECharts = echarts.init(ref.current as HTMLDivElement);
    chart.setOption(props.option);
  }, [props.option]);
  return (
    <Main ref={ref} className={props.className}>

    </Main>
  );
};
export {Chart};