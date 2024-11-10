import { bench, describe } from "vitest"
import { findNearDuplicatesLevenshtein } from "../src/levenshtein"
import vocabulary from "./vocabulary"

describe("findNearDuplicatesLevenshtein", () => {
  const generateRandomStrings = (count: number) => {
    const words: string[] = []
    for (let i = 0; i < count; i++) {
      const numWords = Math.floor(Math.random() * (300 - 20 + 1)) + 20
      const textWords = []
      for (let j = 0; j < numWords; j++) {
        textWords.push(
          vocabulary[Math.floor(Math.random() * vocabulary.length)],
        )
      }
      words.push(textWords.join(" "))
    }
    return words
  }

  bench("small strings", () => {
    const words = [
      "cat dog fish bird mouse elephant tiger lion zebra giraffe",
      "cat dog fish bird mouse elephant tiger lion zebra monkey",
      "dog cat bird fish mouse elephant tiger lion zebra giraffe",
      "cat dog fish bird rat elephant tiger lion zebra giraffe",
      "cat dog fish bird mouse elephant bear lion zebra giraffe",
      "cat dog fish bird mouse elephant tiger wolf zebra giraffe",
      "cat dog fish bird mouse elephant tiger lion horse giraffe",
      "cat dog fish bird mouse elephant tiger lion zebra penguin",
      "cat dog fish bird mouse elephant tiger lion zebra panda",
      "cat dog fish bird mouse elephant tiger lion zebra koala",
    ]
    findNearDuplicatesLevenshtein(words)
  })

  bench("10 random strings (20-300 words)", () => {
    findNearDuplicatesLevenshtein(generateRandomStrings(10))
  })

  bench("100 random strings (20-300 words)", () => {
    findNearDuplicatesLevenshtein(generateRandomStrings(100))
  })

  bench("500 random strings (20-300 words)", () => {
    findNearDuplicatesLevenshtein(generateRandomStrings(500))
  })

  bench("2k random strings (20-300 words)", () => {
    findNearDuplicatesLevenshtein(generateRandomStrings(2000))
  })
})
