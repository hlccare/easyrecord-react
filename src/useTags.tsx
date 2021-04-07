import { useState } from "react";
const useTags = () => { // 使用useState，然后暴露读写接口，就是封装一个自定义hook
    const [tags, setTags] = useState<{ id: number, name: string }[]>(
        [
            { id: 1, name: '衣' },
            { id: 2, name: '食' },
            { id: 3, name: '住' },
            { id: 4, name: '行' }
        ])
    return {
        tags, setTags
    }
}

export { useTags }
