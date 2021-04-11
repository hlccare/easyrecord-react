import styled from "styled-components";

type Props = {
    value: string,
    readonly mapList:{[key:string]:string}[],
    onChange:(selected:string) => void
}


const NaiveTabBar:React.FunctionComponent<Props> = (props)=>{
    const {value,mapList,onChange} = props;
    const count = mapList.length;
    const width = (1/count*100).toFixed(2)+'%';

    interface Props{
        width:string;
    }
    const Wrapper = styled.div<Props>`
        >ul{
            display:flex;
            >li{
                 width: ${props=>props.width};
                text-align:center;
            }
        }
    `

    return (
        <Wrapper width={width}>
            <ul>
                {mapList.map(
                    r => 
                    <li key={Object.keys(r)[0]} 
                    className={value === Object.keys(r)[0] ? 'selected' : ''}
                    onClick={()=>onChange(Object.keys(r)[0])}
                    >
                        {Object.values(r)[0]}
                    </li>
                )}
            </ul>
        </Wrapper>
    )
}

export {NaiveTabBar}