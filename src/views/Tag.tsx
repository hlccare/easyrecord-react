import { Button } from "components/Button"
import { Center } from "components/Center"
import Icon from "components/Icon"
import { Input } from "components/Input"
import Layout from "components/Layout"
import { Space } from "components/Space"
import React from "react"
import { useParams } from "react-router"
import styled from "styled-components"
import { useTags } from "useTags"

type Params  = {
    id: string
}

const Topbar = styled.header`
    display:flex;
    justify-content: space-between;
    align-items: center;
    line-height: 20px;
    padding: 14px;
    background: white;
`

const InputWrapper = styled.div`
    background: white;
    padding: 0 16px;
    margin-top: 8px;
`


const Tag: React.FunctionComponent = () => {
    const {findTag} = useTags()
    let {id} = useParams<Params>();
    const tag = findTag(parseInt(id))
    return (
        <Layout>
            <Topbar>
                <Icon name='left'/>
                <span>编辑标签</span>
                <Icon />
            </Topbar>
            <InputWrapper>
                <Input label='标签名' type='text' placeholder='标签名' value={tag.name}/>
            </InputWrapper>
            
            <Center>
                <Space />
                <Space />
                <Button>删除标签</Button>
            </Center>
        </Layout>
    )
}
export { Tag }