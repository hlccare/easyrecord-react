import styled from "styled-components";

type Props = {
    value: string,
    readonly mapList: { [key: string]: string }[],
    onChange: (selected: string) => void
}

interface WrapperProps {
    width: string;
}
const Wrapper = styled.ul<WrapperProps>`
    display:flex;
    >li{
            width: ${props => props.width};
        text-align:center;
    }
`
const NaiveTabBar: React.FunctionComponent<Props> = (props) => {
    const { value, mapList, onChange } = props;
    const count = mapList.length;
    const width = (1 / count * 100).toFixed(2) + '%';



    return (
        <Wrapper width={width}>
            {mapList.map(
                r =>
                    <li key={Object.keys(r)[0]}
                        className={value === Object.keys(r)[0] ? 'selected' : ''}
                        onClick={() => onChange(Object.keys(r)[0])}
                    >
                        {Object.values(r)[0]}
                    </li>
            )}
        </Wrapper>
    )
}

export { NaiveTabBar }