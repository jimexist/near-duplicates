import { findNearDuplicatesLevenshtein } from "./levenshtein"
import { findNearDuplicatesSimHash } from "./simHash"

export { findNearDuplicatesLevenshtein, findNearDuplicatesSimHash }

export const findNearDuplicates = findNearDuplicatesLevenshtein

export interface StringPair {
  i: number
  j: number
  dist: number
}
