import { bench, describe } from "vitest";
import { findNearDuplicates } from "../src";

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
    ];
    findNearDuplicates(words);
  });

  bench("2qk random strings (20-500 chars)", () => {
    const words: string[] = [];
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    // Generate 2000 random strings
    for (let i = 0; i < 2000; i++) {
      const length = Math.floor(Math.random() * (500 - 20 + 1)) + 20; // Random length between 20-500
      let str = "";
      for (let j = 0; j < length; j++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      words.push(str);
    }

    findNearDuplicates(words);
  });
});
