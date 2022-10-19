

export function generateId(seed:string):string { //uuid > numebr / string
    return seed + 5 // will return a number
}

export type ReturnedType<T> =  T extends (...arg:any[]) => infer R ? R : any;
type Id = ReturnedType<typeof generateId>

export function getFromDB(id:Id) {
    // we get the id here and pass it to the generateId fn. 
    // because we here of dynamic nature the returned id may be number or string or may change
    // after. in order to solve this problem we need to use the infer key to detect the type
    // of the id returned.
}

export type UnpackPromises<T> = T extends Promise<infer K>[] ? K : any
const arr = [Promise.resolve(true)];
type arrayPromies = UnpackPromises<typeof arr>