import { createId } from "lib/createId";
import { useState } from "react";

const defaultTags = [
    { id: createId(), name: '衣' },
    { id: createId(), name: '食' },
    { id: createId(), name: '住' },
    { id: createId(), name: '行' }
]

const useTags = () => { // 使用useState，然后暴露读写接口，就是封装一个自定义hook
    const [tags, setTags] = useState<{ id: number, name: string }[]>(defaultTags)
    const findTag = (id:number)=> tags.filter(t=>t.id === id)[0]
    return {
        tags, setTags, findTag
    }
}

export { useTags }
