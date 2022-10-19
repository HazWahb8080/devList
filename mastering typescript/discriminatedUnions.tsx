interface Dog2 {
  kind: "dog"; // or type
  name: string;
  breed: string;
}

interface Cat2 {
  kind: "cat"; // or type
  name: string;
  breed: string;
}

function makeNoise_2(animal: Cat2 | Dog2): string {
  // will use the discriminant
  if (animal.kind === "dog") {
    return "Wof Wof";
  } else {
    return "Mew";
  }
}

import React, { useRef, useState } from "react";
interface Item {
  name: string;
  age: number;
}

// function discriminatedUnions(): JSX.Element {
//   const [items, setItems] = useState<Item[]>([]);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const inputValue = inputRef.current?.value;
//   return <input ref={inputRef}/>
// }

// export default discriminatedUnions;

