import { XXH64 } from "xxh3-ts"
import type { StringPair } from "."

export interface SimHashOptions {
  shingleSize: number
  hashFunc: (data: Buffer, seed?: bigint) => bigint
  tokenSep: RegExp
  seed: bigint
}

const i64Mask = (1n << 64n) - 1n
const defaultShingleSize = 3
const hashSize = 64

function hashShingle(shingle: string[], options: SimHashOptions): bigint {
  const shingleStr = shingle.join(" ")
  const buf = Buffer.from(shingleStr, "utf-8")
  return options.hashFunc(buf, options.seed) & i64Mask
}

export function simHash(
  text: string,
  options: SimHashOptions = {
    shingleSize: defaultShingleSize,
    hashFunc: XXH64,
    tokenSep: /[,\s+]/,
    seed: 0n,
  },
): bigint {
  const t = (text ?? "").trim()
  const tokens = t.split(options.tokenSep).filter(Boolean)
  if (tokens.length === 0) {
    return 0n
  }
  if (tokens.length <= options.shingleSize) {
    return hashShingle(tokens, options)
  }
  const accumulator: number[] = new Array(hashSize).fill(0)
  for (let i = 0; i < tokens.length - options.shingleSize + 1; i++) {
    const shingle = tokens.slice(i, i + options.shingleSize)
    const featureHash = hashShingle(shingle, options)
    for (let j = 0; j < hashSize; j++) {
      const bit = (featureHash >> BigInt(j)) & 1n
      accumulator[j] += bit === 1n ? 1 : -1
    }
  }
  let result = 0n
  for (let i = 0; i < hashSize; i++) {
    if (accumulator[i] > 0) {
      result |= 1n << BigInt(i)
    }
  }
  return result
}

export function hammingDistance(hash1: bigint, hash2: bigint): number {
  if (typeof hash1 !== "bigint" || typeof hash2 !== "bigint") {
    throw new TypeError("Both arguments must be of type 'bigint'")
  }

  let xor = (hash1 ^ hash2) & i64Mask
  let count = 0

  // Using Brian Kernighan's algorithm to count bits
  while (xor !== 0n) {
    xor &= xor - 1n
    count++
  }

  return count
}

export const DefaultMaxHammingDistance = 3

/**
 * Find near duplicates using SimHash by comparing hashes with hamming distance.
 */
export function findNearDuplicatesSimHash(
  items: string[],
  maxDistance: number = DefaultMaxHammingDistance,
): StringPair[] {
  const hashes = items.map((item) => simHash(item))
  const result: StringPair[] = []
  for (let i = 0; i < hashes.length - 1; i++) {
    for (let j = i + 1; j < hashes.length; j++) {
      const dist = hammingDistance(hashes[i], hashes[j])
      if (dist <= maxDistance) {
        result.push({ i, j, dist })
      }
    }
  }
  return result
}
