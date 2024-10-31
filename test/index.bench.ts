import { bench, describe } from "vitest"
import { findNearDuplicates } from "../src"

describe("getSmallDistancePairs", () => {
	bench("small strings", () => {
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
		findNearDuplicates(words)
	})

	bench("10 random strings (20-500 chars)", () => {
		const words: string[] = []
		const chars =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

		for (let i = 0; i < 10; i++) {
			const length = Math.floor(Math.random() * (500 - 20 + 1)) + 20
			let str = ""
			for (let j = 0; j < length; j++) {
				str += chars.charAt(Math.floor(Math.random() * chars.length))
			}
			words.push(str)
		}

		findNearDuplicates(words)
	})

	bench("100 random strings (20-500 chars)", () => {
		const words: string[] = []
		const chars =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

		for (let i = 0; i < 100; i++) {
			const length = Math.floor(Math.random() * (500 - 20 + 1)) + 20
			let str = ""
			for (let j = 0; j < length; j++) {
				str += chars.charAt(Math.floor(Math.random() * chars.length))
			}
			words.push(str)
		}

		findNearDuplicates(words)
	})

	bench("500 random strings (20-500 chars)", () => {
		const words: string[] = []
		const chars =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

		for (let i = 0; i < 500; i++) {
			const length = Math.floor(Math.random() * (500 - 20 + 1)) + 20
			let str = ""
			for (let j = 0; j < length; j++) {
				str += chars.charAt(Math.floor(Math.random() * chars.length))
			}
			words.push(str)
		}

		findNearDuplicates(words)
	})

	bench("2k random strings (20-500 chars)", () => {
		const words: string[] = []
		const chars =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

		for (let i = 0; i < 2000; i++) {
			const length = Math.floor(Math.random() * (500 - 20 + 1)) + 20
			let str = ""
			for (let j = 0; j < length; j++) {
				str += chars.charAt(Math.floor(Math.random() * chars.length))
			}
			words.push(str)
		}

		findNearDuplicates(words)
	})
})
