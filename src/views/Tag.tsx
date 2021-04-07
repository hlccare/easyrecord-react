import { useParams } from "react-router"
import { useTags } from "useTags"

type Params  = {
    id: string
}

const Tag: React.FunctionComponent = () => {
    const {findTag} = useTags()
    let {id} = useParams<Params>();
    const tag = findTag(parseInt(id))
    return (
        <div>{tag.name}</div>
    )
}
export { Tag }