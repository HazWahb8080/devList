export interface Dog {
  name: string;
  breed: string;
}

interface Cat {
  name: string;
  numLives: number;
}

function isCat(animal: Cat | Dog): animal is Cat {
  return (<Cat>animal).numLives !== undefined;
}

function makeNoise(animal: Cat | Dog): string {
  if (isCat(animal)) {
    return "Mew";
  } else {
    return "Woof Woord";
  }
}
function makeNoise2(animal: Cat | Dog): string {
  if ("numLives" in animal) {
    return "Mew";
  } else {
    return "Woof Woord";
  }
}
