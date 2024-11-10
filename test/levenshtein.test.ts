// this is only here to verify that the ukkonen implementation is correct so it's a dev dependency
import { distance } from "fastest-levenshtein"
import { describe, test, expect, it } from "vitest"
import { findNearDuplicatesLevenshtein, ukkonen } from "../src/levenshtein"

describe("ukkonen", () => {
	test("simple cases", () => {
		expect(ukkonen("", "hellohellohellohellohello", 2)).toBe(2)
		expect(ukkonen("a", "hellohellohellohellohello", 2)).toBe(2)
		expect(ukkonen("a", "hellohellohellohellohello", 10100)).toBe(25)
		expect(ukkonen("hellohellohellohellohello", "", 2)).toBe(2)
		expect(ukkonen("hellohellohellohellohello", "a", 2)).toBe(2)
		expect(ukkonen("hellohellohellohellohello", "a", 10100)).toBe(25)
	})

	test("same string", () => {
		expect(ukkonen("hello", "hello", 1)).toBe(0)
		expect(ukkonen("hello", "hello", 4)).toBe(0)
		expect(ukkonen("hello", "hello", 5)).toBe(0)
		expect(ukkonen("hello", "hello", 6)).toBe(0)
		expect(ukkonen("hello", "hello", 10000)).toBe(0)
	})

	test("matches fastest-levenshtein implementation", () => {
		const testStrings = [
			"hello world",
			"hello there",
			"world hello",
			"completely different",
			"",
			"a",
			"ab",
			"ab",
			"abc",
			"abcd",
		]

		for (let i = 0; i < testStrings.length; i++) {
			for (let j = i + 1; j < testStrings.length; j++) {
				const stringA = testStrings[i]
				const stringB = testStrings[j]
				const ourDistance = ukkonen(stringA, stringB, 20) // 20 is arbitrary and large to ensure we don't cap early
				const theirDistance = distance(stringA, stringB)
				expect(ourDistance, `"[${i}]:${stringA}" - "[${j}]:${stringB}"`).toBe(
					theirDistance,
				)
			}
		}
	})
})

describe("findNearDuplicatesLevenshtein", () => {
	it("should return empty array for empty input", () => {
		const result = findNearDuplicatesLevenshtein([])
		expect(result).toEqual([])
	})

	it("should return empty array for single item", () => {
		const result = findNearDuplicatesLevenshtein(["test"])
		expect(result).toEqual([])
	})

	it("should calculate distances between all pairs", () => {
		const result = findNearDuplicatesLevenshtein(["cat", "bat", "hat"])
		expect(result).toHaveLength(3)
		expect(result).toContainEqual({ i: 0, j: 1, dist: 1 }) // cat-bat
		expect(result).toContainEqual({ i: 0, j: 2, dist: 1 }) // cat-hat
		expect(result).toContainEqual({ i: 1, j: 2, dist: 1 }) // bat-hat
	})

	it("should cap distances at maxDistance", () => {
		const result = findNearDuplicatesLevenshtein(["hello", "world"], 3)
		// distance would be 4, so no result is returned since it exceeds maxDistance
		expect(result).toEqual([])
	})

	it("should use length difference optimization", () => {
		const result = findNearDuplicatesLevenshtein(["a", "aaaaa"], 3)
		// length diff is 4, so no result is returned since it exceeds maxDistance
		expect(result).toEqual([])
	})

	it("should handle custom maxDistance", () => {
		const result = findNearDuplicatesLevenshtein(["cat", "cats"], 2)
		expect(result).toHaveLength(1)
		expect(result).toContainEqual({ i: 0, j: 1, dist: 1 })
	})

	it("should handle custom maxDistance with no matches", () => {
		const result = findNearDuplicatesLevenshtein(["cat", "cats"], 1)
		expect(result).toHaveLength(0)
	})

	it("should handle multiple strings correctly", () => {
		const words = [
			"cat",
			"bat",
			"hat",
			"rat",
			"mat",
			"sat",
			"fat",
			"pat",
			"that",
			"chat",
		]
		const result = findNearDuplicatesLevenshtein(words)
		// Check a few specific pairs
		expect(result).toContainEqual({ i: 0, j: 1, dist: 1 }) // cat-bat
		expect(result).toContainEqual({ i: 0, j: 9, dist: 1 }) // cat-chat
		expect(result).toContainEqual({ i: 7, j: 8, dist: 2 }) // pat-that
	})
})
