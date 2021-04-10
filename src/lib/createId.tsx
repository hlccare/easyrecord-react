let tagId = parseInt(window.localStorage.getItem('tagIdMax') || '0');
const createTagId = () => {
    tagId += 1
    window.localStorage.setItem('tagIdMax', JSON.stringify(tagId))
    return tagId
}

let recordId = parseInt(window.localStorage.getItem('recordIdMax') || '0');
const createRecordId = () => {
    recordId += 1
    window.localStorage.setItem('recordIdMax', JSON.stringify(recordId))
    return recordId
}

export { createTagId,createRecordId }