import { expect, describe, it } from "vitest"
import { simHash, hammingDistance } from "../src/simHash"

describe("simHash", () => {
  it("should return same hash for identical strings", () => {
    const str1 = "hello world"
    const str2 = "hello world"
    expect(simHash(str1)).toEqual(simHash(str2))
  })

  it("should hash empty string to 0", () => {
    expect(simHash("")).toEqual(0n)
  })

  it("should hash all spaces to 0", () => {
    expect(simHash("   ")).toEqual(0n)
    expect(simHash(" ")).toEqual(0n)
    expect(simHash("     ")).toEqual(0n)
  })

  it("should treat comma as separator", () => {
    const str1 = "hello,world,test"
    const str2 = "hello world test"
    expect(simHash(str1)).toEqual(simHash(str2))
  })

  it("should treat multiple commas as single separator", () => {
    const str1 = "hello,,,,world,,test"
    const str2 = "hello world test"
    expect(simHash(str1)).toEqual(simHash(str2))
  })

  it("should treat mix of spaces and commas as separators", () => {
    const str1 = "hello, world ,test"
    const str2 = "hello world test"
    expect(simHash(str1)).toEqual(simHash(str2))
  })

  it("should return similar hashes for similar strings", () => {
    const str1 =
      "hello world goodbye world let us say one more time yes or no and you would find it"
    const str2 =
      "hello world goodbye world let us say one more time yes or no and you would find it 2"
    const hash1 = simHash(str1)
    const hash2 = simHash(str2)
    // Hamming distance should be small for similar strings
    const distance = hammingDistance(hash1, hash2)
    expect(distance).toBeLessThanOrEqual(6)
  })

  it("should return different hashes for very different strings", () => {
    const str1 = "hello world"
    const str2 = "completely different"
    expect(simHash(str1)).not.toEqual(simHash(str2))
  })

  it("should handle empty strings", () => {
    expect(() => simHash("")).not.toThrow()
  })

  it("should handle special characters", () => {
    const str1 = "hello!@#$%^&*()"
    const str2 = "hello!@#$%^&*()"
    expect(simHash(str1)).toEqual(simHash(str2))
  })
})

describe("hammingDistance", () => {
  it("should return 0 for identical hashes", () => {
    const hash = simHash("hello world")
    expect(hammingDistance(hash, hash)).toEqual(0)
  })

  it("should return correct distance for different hashes", () => {
    const hash1 = 0b1100n // 12 in binary
    const hash2 = 0b1010n // 10 in binary
    expect(hammingDistance(hash1, hash2)).toEqual(2)
  })

  it("should be symmetric", () => {
    const hash1 = simHash("hello world")
    const hash2 = simHash("hello there")
    expect(hammingDistance(hash1, hash2)).toEqual(hammingDistance(hash2, hash1))
  })

  it("should handle large differences", () => {
    const hash1 = 0n // All zeros
    const hash2 = -1n // All ones (64 bits)
    expect(hammingDistance(hash1, hash2)).toEqual(64)
  })
})
