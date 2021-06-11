import { Button } from 'components/Button';
import { useRecords } from 'hooks/useRecords';
import styled from 'styled-components';
import { PieChart } from './PieChart';
import { NavLink } from 'react-router-dom';
type Props = {
    category: '-' | '+'
}

const ContentWrapper = styled.div`

`
const AmountWrapper = styled.div`
        text-align: center;
    >.mark{
        font-size: 1.25em;
    }
    >.amount{
        font-size: 1.5em;
        margin-top: 0.5em;
    }
    button{
        background: #9ccac0
    }
`

const CategoryStatistics: React.FunctionComponent<Props> = (props) => {
    const { category } = props
    const { getTotalByCategory } = useRecords();
    return (
        <ContentWrapper>
            <AmountWrapper>
                <div className="mark">{category === '-' ? '支出' : '收入'}总计</div>
                <div className="amount">￥{getTotalByCategory(category)}</div>
                <NavLink to={`/detail/${category}`}>
                    <Button>查看明细</Button>
                </NavLink>
            </AmountWrapper>
            <PieChart category={category} />
        </ContentWrapper >
    )
}
export { CategoryStatistics }

