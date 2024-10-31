# near-duplicates

[![CI](https://github.com/jimexist/near-duplicates/actions/workflows/ci.yaml/badge.svg)](https://github.com/jimexist/near-duplicates/actions/workflows/ci.yaml)
![NPM Version](https://img.shields.io/npm/v/near-duplicates)

A TypeScript npm package to find near duplicate pairs in a string set.

## Usage

```bash
npm install near-duplicates
```

```typescript
import { findNearDuplicates } from "near-duplicates";

findNearDuplicates(["hello", "hallo", "halo"]);

// you can also specify a threshold for the maximum distance
// if not specified, it will be a default value of 12
findNearDuplicates(["hello", "hallo", "halo"], 2);
```

## Benchmarks

Here's a benchmark of the performance of `findNearDuplicates` using the default max distance of 12.

```text
 DEV  v2.1.4 near-duplicates

 ✓ test/index.bench.ts (5) 5211ms
   ✓ findNearDuplicates (5) 5210ms
     name                                       hz     min      max     mean      p75      p99     p995     p999     rme  samples
   · small strings                      214,439.85  0.0043   0.2387   0.0047   0.0046   0.0053   0.0071   0.0592  ±0.38%   107220   fastest
   · 10 random strings (20-500 chars)    29,533.57  0.0148   0.2318   0.0339   0.0369   0.0557   0.1355   0.1764  ±0.58%    14767
   · 100 random strings (20-500 chars)    1,469.32  0.5852   1.3275   0.6806   0.6818   1.1802   1.1990   1.3275  ±1.05%      735
   · 500 random strings (20-500 chars)     98.7281  9.1328  11.3120  10.1288  10.8487  11.3120  11.3120  11.3120  ±2.03%       50
   · 2k random strings (20-500 chars)       6.2139  155.68   173.60   160.93   162.18   173.60   173.60   173.60  ±2.25%       10   slowest

```
