import styled from "styled-components";
import { useTags } from "hooks/useTags";
import { expenseTagsList,incomeTagsList } from "instants/tagsList";
import Icon from "components/Icon";


const Wrapper = styled.section`
  background: #FFFFFF;
  /* padding: 12px 16px; */
  flex-grow: 1;
  position: relative;
  >ol{
      display:flex;
      flex-wrap: wrap;
      overflow-y:auto;
      position: absolute;
      height: 100%;
      padding: 4px;
      > li {
      border-radius: 10%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 25%;
      height: 25%;
      @media screen and (max-width: 900px) {
        height: 50%;
      }

      &.selected {
        background: grey;
      }

      >.icon {
        // height: 32px;
        // width:32px;
        height: 60%;
        width: 60%;
      }
    }
    }
    `
type Props = {
    value: number;
    category:string;
    onChange: (selected: number) => void;
}
const TagsSection: React.FunctionComponent<Props> = (props) => {
    // const { tags, addTag } = useTags()
    const tagList = props.category === '-' ? expenseTagsList : incomeTagsList;
    const selectedTagId = props.value

    const selectTag = (tagId: number) => {
        // const index = selectedTagId.indexOf(tagId)
        // if (index >= 0) {
        //     props.onChange(
        //         selectedTagIds.filter(t => t !== tagId)
        //     )
        // } else {
        //     props.onChange([...selectedTagIds, tagId])
        // }
        if(tagId === selectedTagId)return;
        else{
            props.onChange(tagId);
        }
    }
    const getClass = (tagId: number) => selectedTagId === tagId ? 'selected' : '';
    return (
        <Wrapper>
            <ol>
                {tagList.map(tag =>
                    <li key={tag.id}
                        onClick={() => { selectTag(tag.id) }}
                        className={getClass(tag.id)}
                    >
                        <Icon name={tag.iconName}/>
                        {tag.name}
                    </li>
                )}
            </ol>
        </Wrapper>
    )
}

export { TagsSection };