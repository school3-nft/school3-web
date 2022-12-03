import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  NumberDictionary,
} from "unique-names-generator";

const generateClasses = () => {
  let classes = [];
  let classLetters = ["a", "b", "c", "d", "e", "f"];
  for (let i = 1; i < 5; i++) {
    for (let clssLetter of classLetters) {
      classes.push(`${i}${clssLetter}`);
    }
  }

  return classes;
};

const numberDictionary = [""];

const customConfig: Config = {
  dictionaries: [["student"], generateClasses()],
  separator: "_",
};

export default function randUsername() {
  return uniqueNamesGenerator(customConfig);
}
