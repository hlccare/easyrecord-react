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
    const findTagIndex = (id:number) =>{
        let index = -1
        for(let i=0;i<tags.length;i++){
            index = i
            break;
        }
        return index;
    }
    const updateTag = (id:number, obj:{name:string}) =>{
        //获取要改的tag的下标
        const index = findTagIndex(id);
        //深拷贝tags得到tagsClone
        const tagsClone = JSON.parse(JSON.stringify(tags))
        //tagsClone
        tagsClone.splice(index,1,{id:id,name:obj.name})
        setTags(tagsClone);
    }

    const deleteTag = (id:number) =>{
        const index = findTagIndex(id);
        const tagsClone = JSON.parse(JSON.stringify(tags))
        tagsClone.splice(index, 1)
        setTags(tagsClone)
    }

    return {
        tags, setTags, findTag, findTagIndex, updateTag, deleteTag
    }
}

export { useTags }
