import { useUpdate } from "hooks/useUpdate";
import { createId } from "lib/createId";
import { useEffect, useState } from "react";

const useTags = () => { // 使用useState，然后暴露读写接口，就是封装一个自定义hook
    const [tags, setTags] = useState<{ id: number, name: string }[]>([])
    //第一次渲染 after mount,组件挂载时执行
    useEffect(() => {
        let localTags = JSON.parse(window.localStorage.getItem('tags') || '[]')
        if (localTags.length === 0) {
            localTags = [
                { id: createId(), name: '衣' },
                { id: createId(), name: '食' },
                { id: createId(), name: '住' },
                { id: createId(), name: '行' }
            ]
        }
        setTags(localTags)
    }, [])
    //tags变化
    useUpdate(() => {
        window.localStorage.setItem('tags', JSON.stringify(tags))
    }, [tags])
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

    const addTag = () => {
        const tagName = window.prompt('请输入标签名')
        if (tagName) {
            setTags([...tags, { id: createId(), name: tagName }])
        } else {
            window.alert('标签名不可为空')
        }
    }

    return {
        tags, setTags, findTag, findTagIndex, updateTag, deleteTag, addTag
    }
}

export { useTags }
