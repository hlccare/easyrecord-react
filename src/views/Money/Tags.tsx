import Icon from "components/Icon";
import Layout from "components/Layout";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTags } from "useTags";

const TagList = styled.ol`
  font-size: 16px;
  background: white;
  > li{
    border-bottom: 1px solid #d5d5d9;
    line-height:20px;
    margin-left: 16px;
    >a{
      padding: 12px 16px 12px 0;
      display:flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Space = styled.div`
  height: 16px;
`

const Button = styled.button`
  font-size:18px;
  border: none;
  padding: 8px 12px;
  color: white;
  background: #767676;
  border-radius: 4px;
`

function Tags() {
  const { tags, setTags } = useTags()
  return (
    <Layout>
      <TagList>
        {
          tags.map(tag =>
            <li key={tag.id}>
              <Link to={'/tags/' + tag.id}>
                <span className='oneLine'>{tag.name}</span>
                <Icon name='right' />
              </Link>
            </li>)
        }
      </TagList>
      <Center>
        <Space />
        <Space />
        <Button>新增标签</Button>
      </Center>
    </Layout>
  )
}
export default Tags;