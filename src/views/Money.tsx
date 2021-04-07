import Layout from "components/Layout";
import styled from 'styled-components';
import { CategorySection } from "./Money/CategorySection";
import { NoteSection } from "./Money/NoteSection";
import { NumberPadSection } from "./Money/NumberPadSection";
import { TagsSection } from "./Money/TagsSection";


const MyLayout = styled(Layout)`
  display:flex;
  flex-direction:column;
`


function Money() {
  return (
    <MyLayout>
      <TagsSection />
      <NoteSection />
      <CategorySection>

      </CategorySection>
      <NumberPadSection>

      </NumberPadSection>
    </MyLayout>
  )
}

export default Money;