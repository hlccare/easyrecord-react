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
    const findTag = (id: number) => tags.filter(t => t.id === id)[0]
    const findTagIndex = (id: number) => {
        let index = -1
        for (let i = 0; i < tags.length; i++) {
            index = i
            break;
        }
        return index;
    }
    const updateTag = (id: number, { name }: { name: string }) => {
        setTags(tags.map(tag => tag.id === id ? { id, name: name } : tag))
    }

    const deleteTag = (id: number) => {
        setTags(tags.filter(tag => tag.id !== id))
    }

    return {
        tags, setTags, findTag, findTagIndex, updateTag, deleteTag
    }
}

export { useTags }
