import { bench, describe } from "vitest"
import { findNearDuplicatesLevenshtein } from "../src/levenshtein"

describe("findNearDuplicatesLevenshtein", () => {
  const vocabulary = [
    "the",
    "be",
    "to",
    "of",
    "and",
    "in",
    "that",
    "have",
    "it",
    "for",
    "not",
    "on",
    "with",
    "he",
    "as",
    "you",
    "do",
    "at",
    "this",
    "but",
    "his",
    "by",
    "from",
    "they",
    "we",
    "say",
    "her",
    "she",
    "or",
    "an",
    "will",
    "my",
    "one",
    "all",
    "would",
    "there",
    "their",
    "what",
    "so",
    "up",
    "out",
    "if",
    "about",
    "who",
    "get",
    "which",
    "go",
    "me",
    "when",
  ]

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
    const words: string[] = []

    for (let i = 0; i < 10; i++) {
      const numWords = Math.floor(Math.random() * (300 - 20 + 1)) + 20
      const textWords = []
      for (let j = 0; j < numWords; j++) {
        textWords.push(
          vocabulary[Math.floor(Math.random() * vocabulary.length)],
        )
      }
      words.push(textWords.join(" "))
    }
    findNearDuplicatesLevenshtein(words)
  })

  bench("100 random strings (20-300 words)", () => {
    const words: string[] = []

    for (let i = 0; i < 100; i++) {
      const numWords = Math.floor(Math.random() * (300 - 20 + 1)) + 20
      const textWords = []
      for (let j = 0; j < numWords; j++) {
        textWords.push(
          vocabulary[Math.floor(Math.random() * vocabulary.length)],
        )
      }
      words.push(textWords.join(" "))
    }
    findNearDuplicatesLevenshtein(words)
  })

  bench("500 random strings (20-300 words)", () => {
    const words: string[] = []

    for (let i = 0; i < 500; i++) {
      const numWords = Math.floor(Math.random() * (300 - 20 + 1)) + 20
      const textWords = []
      for (let j = 0; j < numWords; j++) {
        textWords.push(
          vocabulary[Math.floor(Math.random() * vocabulary.length)],
        )
      }
      words.push(textWords.join(" "))
    }
    findNearDuplicatesLevenshtein(words)
  })

  bench("2000 random strings (20-300 words)", () => {
    const words: string[] = []

    for (let i = 0; i < 2000; i++) {
      const numWords = Math.floor(Math.random() * (300 - 20 + 1)) + 20
      const textWords = []
      for (let j = 0; j < numWords; j++) {
        textWords.push(
          vocabulary[Math.floor(Math.random() * vocabulary.length)],
        )
      }
      words.push(textWords.join(" "))
    }
    findNearDuplicatesLevenshtein(words)
  })
})
