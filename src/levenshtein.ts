/**
 * Calculates the Levenshtein distance between two strings using Ukkonen's algorithm.
 *
 * This is a direct adoption from https://github.com/sunesimonsen/ukkonen without memory copying
 *
 * @param a - First string to compare
 * @param b - Second string to compare
 * @param threshold - Optional maximum distance threshold (defaults to Infinity if not specified)
 * @returns The Levenshtein distance between the strings, or the threshold if exceeded
 */
export function ukkonen(a: string, b: string, threshold?: number): number {
	if (a === b) {
		return 0
	}

	const actualThreshold: number =
		typeof threshold === "number" ? threshold : Number.POSITIVE_INFINITY

	// Ensure b is the longer string
	if (a.length > b.length) {
		return ukkonen(b, a, threshold)
	}

	let aLen: number = a.length
	let bLen: number = b.length

	// Trim common suffix
	while (aLen > 0 && a.charCodeAt(aLen - 1) === b.charCodeAt(bLen - 1)) {
		aLen--
		bLen--
	}

	if (aLen === 0) {
		return bLen < actualThreshold ? bLen : actualThreshold
	}

	// Trim common prefix
	let tStart = 0
	while (tStart < aLen && a.charCodeAt(tStart) === b.charCodeAt(tStart)) {
		tStart++
	}

	aLen -= tStart
	bLen -= tStart

	if (aLen === 0) {
		return bLen < actualThreshold ? bLen : actualThreshold
	}

	const limitedThreshold: number = Math.min(bLen, actualThreshold)
	const dLen: number = bLen - aLen

	if (limitedThreshold < dLen) {
		return limitedThreshold
	}

	// Calculate ZERO_K: floor(min(threshold, aLen) / 2)) + 2
	const ZERO_K: number = (Math.min(aLen, limitedThreshold) >> 1) + 2
	const arrayLength: number = dLen + ZERO_K * 2 + 2

	// Initialize arrays with -1
	let currentRow: number[] = new Array(arrayLength).fill(-1)
	let nextRow: number[] = new Array(arrayLength).fill(-1)

	let j = 0
	const conditionRow: number = dLen + ZERO_K
	const endMax: number = conditionRow << 1

	do {
		j++
		;[currentRow, nextRow] = [nextRow, currentRow]

		let start: number
		let previousCell: number
		let currentCell = -1
		let nextCell: number

		if (j <= ZERO_K) {
			start = -j + 1
			nextCell = j - 2
		} else {
			start = j - (ZERO_K << 1) + 1
			nextCell = currentRow[ZERO_K + start]
		}

		let end: number
		if (j <= conditionRow) {
			end = j
			nextRow[ZERO_K + j] = -1
		} else {
			end = endMax - j
		}

		for (let k = start, rowIndex = start + ZERO_K; k < end; k++, rowIndex++) {
			previousCell = currentCell
			currentCell = nextCell
			nextCell = currentRow[rowIndex + 1]

			// Calculate max(t, previousCell, nextCell + 1)
			let t: number = Math.max(currentCell + 1, previousCell, nextCell + 1)

			while (
				t < aLen &&
				t + k < bLen &&
				a.charAt(tStart + t) === b.charAt(tStart + t + k)
			) {
				t++
			}

			nextRow[rowIndex] = t
		}
	} while (nextRow[conditionRow] < aLen && j <= limitedThreshold)

	return j - 1
}

/**
 * Default maximum distance threshold for finding near duplicates.
 *
 * Keep this number small to avoid performance issues, use benchmark to find the best number
 */
export const DefaultMaxDistance = 12

export interface StringPair {
	i: number
	j: number
	dist: number
}

/**
 * Get all pairs of strings with a distance less than the maxDistance.
 *
 * @param items - The strings to compare.
 * @param maxDistance - The maximum distance to consider, must be positive, defaults to `DefaultMaxDistance` if not specified. Using a small number can boost performance.
 * @returns An array of objects with the indices and distance of each pair, each pair's i is smaller than j.
 */
export function findNearDuplicatesLevenshtein(
	items: string[],
	maxDistance: number = DefaultMaxDistance,
): StringPair[] {
	if (maxDistance <= 0) {
		throw new Error("maxDistance must be positive")
	}
	const result: StringPair[] = []

	if (items.length <= 1) {
		return result
	}

	// Create array of objects with original index
	const data = items.map((str, index) => ({ index, str }))
	// sort by string length increasing
	data.sort((a, b) => a.str.length - b.str.length)

	for (let i = 0; i < data.length - 1; i++) {
		for (let j = i + 1; j < data.length; j++) {
			const a = data[i].str
			const b = data[j].str
			if (b.length - a.length >= maxDistance) {
				break
			}
			const dist = ukkonen(a, b, maxDistance)
			if (dist < maxDistance) {
				// Use original indices
				const origI = data[i].index
				const origJ = data[j].index
				result.push({
					i: Math.min(origI, origJ),
					j: Math.max(origI, origJ),
					dist,
				})
			}
		}
	}

	return result
}
