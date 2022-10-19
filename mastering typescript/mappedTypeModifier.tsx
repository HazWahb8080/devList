// mapped key modifiers

export interface Ipet {
  name: string;
  age: number;
  parkFavorite?: string;
}

// modify the type Ipet into all optional or readOnly
type ReadOnlyOptionalIpet = {
  -readonly [K in keyof Ipet]?: Ipet[K];
  // readonly [K in keyof Ipet] : Ipet[K]
  // readonly [K in keyof Ipet]-? : Ipet[K]
  // -readonly [K in keyof Ipet]-? : Ipet[K]
  // -readonly [K in keyof Ipet]? : string
  // -readonly [K in keyof Ipet]? : number
  // -readonly [K in keyof Ipet]? : Ipet[K] | string
};

interface StringContainer {
  id?: string;
  title: string;
  chars: string[];
}
interface NumberContainer {
  id?: number;
  title: number;
  numbs: number[];
}

// Generic Parameter and conditional types
type Item<T> = {
  title: T;
  handleType: T extends string ? StringContainer : NumberContainer;
};
const product: Item<string> = {
  title: "backpack", 
  handleType: { title: "bag", chars: ["1", "2", "3"] },
};
type ArrayFilter<T> = T extends any[] ? T : never;
let products: ArrayFilter<string[] | number[] | string | number>;

// 1. distribute > string[] , number [] , never, never
// 2. never > remove never types

// conditional types can be uses to handle any function overload by returning only a single type after checking
interface handleContainers {
  getNumber<T extends number | string>(arg: T): T extends number ? NumberContainer : StringContainer;
}

let productItem: handleContainers;
const item = productItem.getNumber("good");


//  how to flatten a type 
type Flatten<T>  = T extends any[] ? T[number] : T extends object ? T[keyof T] : T;
let numbers = [1,2,3,4];
let myObject = {
    id:1,
    name:"hazem"
}
let bol = true;
let n = 3

let flattenedNumbers:Flatten<typeof numbers>;
let flattenedobject:Flatten<typeof myObject>;
let flattenedbol:Flatten<typeof bol>;
let flattenedn:Flatten<typeof n>;



type ReadOnlyIpet =  {
  readonly [I in keyof Ipet] : Ipet[I]
}

type ReadOnlyType <T> = {
  readonly [K in keyof T] : ReadOnlyType<T[K]>
}
let products2:ReadOnlyType<NumberContainer>
