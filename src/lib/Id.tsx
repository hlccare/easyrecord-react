let id = 0
class TagId {
    value: number;
    constructor() {
        id += 1
        this.value = id
    }
}

let recordId = 0
class RecordId{
    value: number;
    constructor(){
        recordId += 1
        this.value = recordId
    }
}

export { TagId, RecordId }