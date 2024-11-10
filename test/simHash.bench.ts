import { bench, describe } from "vitest"
import { findNearDuplicatesSimHash, simHash } from "../src/simHash"
import vocabulary from "./vocabulary"

describe("simHash", () => {
  const benchRandomStrings = (count: number) => {
    const strings: string[] = []
    for (let i = 0; i < count; i++) {
      let str = ""
      const wordCount = Math.floor(Math.random() * (300 - 20 + 1)) + 20
      for (let j = 0; j < wordCount; j++) {
        str += `${vocabulary[Math.floor(Math.random() * vocabulary.length)]} `
      }
      strings.push(str.trim())
    }

    strings.map((s) => simHash(s))
  }

  bench("simhash 1 random string", () => {
    benchRandomStrings(1)
  })

  bench("simhash 10 random strings", () => {
    benchRandomStrings(10)
  })

  bench("simhash 100 random strings", () => {
    benchRandomStrings(100)
  })

  bench("simhash 300 random strings", () => {
    benchRandomStrings(300)
  })

  bench("simhash 1000 random strings", () => {
    benchRandomStrings(1000)
  })
})

describe("findNearDuplicatesSimHash", () => {
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
    findNearDuplicatesSimHash(words)
  })

  bench("10 random strings (20-300 words)", () => {
    findNearDuplicatesSimHash(generateRandomStrings(10))
  })

  bench("100 random strings (20-300 words)", () => {
    findNearDuplicatesSimHash(generateRandomStrings(100))
  })

  bench("500 random strings (20-300 words)", () => {
    findNearDuplicatesSimHash(generateRandomStrings(500))
  })

  bench("2k random strings (20-300 words)", () => {
    findNearDuplicatesSimHash(generateRandomStrings(2000))
  })
})
